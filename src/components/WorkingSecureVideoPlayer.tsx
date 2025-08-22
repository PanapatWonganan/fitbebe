"use client";

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface WorkingSecureVideoPlayerProps {
  streamUrl: string;
  title: string;
  userName?: string;
  userEmail?: string;
  onProgress?: (currentTime: number, duration: number) => void;
}

export default function WorkingSecureVideoPlayer({ 
  streamUrl, 
  title, 
  userName = 'Guest',
  userEmail = 'guest@example.com',
  onProgress 
}: WorkingSecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  console.log('🔐 WorkingSecureVideoPlayer: Rendering with URL:', streamUrl);
  console.log('🔐 WorkingSecureVideoPlayer: State:', { isPlaying, isMuted, currentTime, duration });

  useEffect(() => {
    console.log('🔐 WorkingSecureVideoPlayer: useEffect triggered');
    
    if (videoRef.current) {
      const video = videoRef.current;
      
      // ป้องกัน video reset โดยตรวจสอบ source ก่อน
      if (video.src !== streamUrl) {
        console.log('🔐 WorkingSecureVideoPlayer: Setting new video source');
        video.src = streamUrl;
        video.preload = 'metadata';
      } else {
        console.log('🔐 WorkingSecureVideoPlayer: Video source unchanged, skipping reset');
        return; // ข้ามการ setup ใหม่
      }
      
      console.log('🔐 WorkingSecureVideoPlayer: Video element found, setting up security');

    // Security settings
    video.controlsList = 'nodownload noremoteplayback';
    video.disablePictureInPicture = true;
    video.setAttribute('disablePictureInPicture', 'true');
    
      video.addEventListener('loadeddata', () => {
        console.log('🔐 WorkingSecureVideoPlayer: ✅ Secure video loaded!', {
          duration: video.duration,
          readyState: video.readyState,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight
        });
        if (isFinite(video.duration)) {
          setDuration(video.duration);
        }
      });
      
      video.addEventListener('timeupdate', () => {
        const current = video.currentTime;
        const dur = video.duration;
        
        if (isFinite(current)) setCurrentTime(current);
        if (onProgress && isFinite(current) && isFinite(dur)) {
          onProgress(current, dur);
        }
      });

      video.addEventListener('play', () => setIsPlaying(true));
      video.addEventListener('pause', () => setIsPlaying(false));
      
      video.addEventListener('error', (e) => {
        console.error('🔐 WorkingSecureVideoPlayer: Error:', e);
      });
    } else {
      console.error('🔐 WorkingSecureVideoPlayer: ❌ Video element is null');
    }
  }, [streamUrl]); // ลบ onProgress ออกเพื่อป้องกัน re-render

  // Security: Prevent right-click and keyboard shortcuts (but don't block video controls)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Only prevent context menu on video area, not controls
      const target = e.target as HTMLElement;
      if (target.tagName === 'VIDEO' || target.closest('.video-container')) {
        e.preventDefault();
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only disable dev tools shortcuts, not video controls
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U  
        (e.ctrlKey && e.keyCode === 83) // Ctrl+S
        // Removed PrintScreen (44) as it can interfere with normal usage
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Apply security only to the container, not globally
    const container = containerRef.current;
    if (container) {
      container.addEventListener('contextmenu', handleContextMenu);
      // Only add keydown to container, not document
      container.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', handleContextMenu);
        container.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) {
      console.error('🔐 WorkingSecureVideoPlayer: No video element for play/pause');
      return;
    }

    console.log('🔐 WorkingSecureVideoPlayer: Toggle play clicked', { isPlaying, videoSrc: video.src, videoReadyState: video.readyState });

    try {
      if (isPlaying) {
        console.log('🔐 WorkingSecureVideoPlayer: Pausing video');
        video.pause();
      } else {
        console.log('🔐 WorkingSecureVideoPlayer: Attempting to play video');
        
        // Ensure video is loaded before trying to play
        if (video.readyState < 3) { // HAVE_FUTURE_DATA
          console.log('🔐 WorkingSecureVideoPlayer: Video not ready, loading first...');
          await new Promise((resolve, reject) => {
            const handleCanPlay = () => {
              video.removeEventListener('canplay', handleCanPlay);
              video.removeEventListener('error', handleError);
              resolve(true);
            };
            const handleError = (e: Event) => {
              video.removeEventListener('canplay', handleCanPlay);
              video.removeEventListener('error', handleError);
              reject(e);
            };
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);
            video.load();
          });
        }

        // Try to play unmuted first
        console.log('🔐 WorkingSecureVideoPlayer: Playing unmuted');
        video.muted = false;
        await video.play();
        console.log('🔐 WorkingSecureVideoPlayer: ✅ Video playing successfully unmuted');
      }
    } catch (error) {
      console.error('🔐 WorkingSecureVideoPlayer: Error playing unmuted:', error);
      // Try playing muted if unmuted fails (browser autoplay policy)
      try {
        console.log('🔐 WorkingSecureVideoPlayer: Trying muted playback...');
        video.muted = true;
        await video.play();
        console.log('🔐 WorkingSecureVideoPlayer: ✅ Video playing muted due to autoplay policy');
        setIsMuted(true);
      } catch (mutedError) {
        console.error('🔐 WorkingSecureVideoPlayer: ❌ Failed to play even when muted:', mutedError);
        // Last resort: show user that manual interaction might be needed
        alert('กรุณาคลิกที่วิดีโออีกครั้งเพื่อเริ่มเล่น (Browser autoplay policy)');
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className="relative aspect-video bg-black group video-container"
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none'
        }}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full"
          onClick={togglePlay}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            pointerEvents: 'auto',
            objectFit: 'contain'
          }}
        />
        
        {/* Big Play Button Overlay */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            style={{ zIndex: 50 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔴 WorkingSecureVideoPlayer: Play button clicked!', e);
              togglePlay();
            }}
            onMouseEnter={() => console.log('🔴 WorkingSecureVideoPlayer: Mouse entered play button')}
          >
            <div 
              className="bg-pink-600 bg-opacity-80 rounded-full p-8 hover:bg-opacity-90 transition-all hover:scale-110 shadow-lg"
              style={{ zIndex: 51 }}
            >
              <Play className="w-20 h-20 text-white fill-white" />
            </div>
          </div>
        )}
        
        {/* Click to Play Instructions */}
        {!isPlaying && (
          <div 
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-60 px-4 py-2 rounded-lg pointer-events-none"
            style={{ zIndex: 45 }}
          >
            <p className="text-sm">🔴 คลิกเพื่อเริ่มเล่นวิดีโอ</p>
          </div>
        )}
        
        {/* Security Watermark */}
        <div className="absolute top-4 right-4 text-white text-sm opacity-70 pointer-events-none select-none bg-black bg-opacity-50 px-2 py-1 rounded">
          <div className="text-xs">
            {userName}
            <br />
            {new Date().toLocaleString('th-TH')}
          </div>
        </div>

        {/* Protection Notice */}
        <div className="absolute bottom-16 left-4 text-white text-xs opacity-50 pointer-events-none select-none">
          🔒 เนื้อหาได้รับการป้องกัน
        </div>

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-600 rounded-full mb-4">
            <div 
              className="h-full bg-pink-500 rounded-full"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="hover:text-pink-400">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button onClick={toggleMute} className="hover:text-pink-400">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="text-xs text-gray-300">
              🔒 {title}
            </div>
          </div>
        </div>

        {/* Anti-Screenshot Overlay - Reduced opacity to not interfere with clicks */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 49.95%, rgba(255,255,255,0.005) 50%, transparent 50.05%)',
            backgroundSize: '40px 40px',
            zIndex: 1
          }}
        />
      </div>
      
    </div>
  );
}