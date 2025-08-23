"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  PlayCircle
} from 'lucide-react';
import WorkingSecureVideoPlayer from '@/components/WorkingSecureVideoPlayer';
import { fetchLessonDetail, fetchStreamUrl, LessonDetail, StreamUrlResponse } from '@/lib/api';

// Helper functions for extracting video IDs
function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function getVimeoVideoId(url: string): string | null {
  const regex = /(?:vimeo\.com\/)(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

interface LessonData {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  order_index: number;
  is_free: boolean;
  video_url?: string;
  course: {
    id: string;
    title: string;
  };
  video?: {
    id: string;
    status: 'pending' | 'processing' | 'ready' | 'failed';
    duration: string;
    size: string;
    ready: boolean;
    processing_error?: string;
    stream_available?: boolean;
  };
  can_watch: boolean;
}

interface StreamData {
  stream_url: string;
  expires_at: string;
  video: {
    id: string;
    title: string;
    duration: string;
  };
  lesson: {
    id: string;
    title: string;
  };
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [streamData, setStreamData] = useState<StreamUrlResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [streamLoading, setStreamLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchProgress, setWatchProgress] = useState({ currentTime: 0, duration: 0 });

  // Fetch lesson data
  useEffect(() => {
    const loadLesson = async () => {
      console.log('📚 Loading lesson details for ID:', lessonId);
      const result = await fetchLessonDetail(lessonId);
      console.log('📚 Lesson detail API response:', result);
      
      if (result.error) {
        console.error('❌ Error loading lesson:', result.error);
        setError(result.error);
      } else if (result.data) {
        console.log('✅ Lesson data loaded:', {
          id: result.data.id,
          title: result.data.title,
          canWatch: result.data.can_watch,
          hasVideo: !!result.data.video,
          videoStatus: result.data.video?.status,
          videoReady: result.data.video?.ready,
          hasVideoUrl: !!result.data.video_url,
          videoUrl: result.data.video_url
        });
        setLesson(result.data);
      }
      
      setLoading(false);
    };

    if (lessonId) {
      loadLesson();
    }
  }, [lessonId]);

  // Fetch stream URL when lesson is ready
  const getStreamUrl = async () => {
    console.log('🎬 getStreamUrl called with lesson:', {
      lessonId,
      videoReady: lesson?.video?.ready,
      canWatch: lesson?.can_watch,
      videoStatus: lesson?.video?.status,
      hasVideo: !!lesson?.video,
      hasVideoUrl: !!lesson?.video_url
    });

    if (!lesson?.video?.ready || !lesson.can_watch) {
      console.error('❌ Cannot get stream URL - requirements not met:', { 
        videoReady: lesson?.video?.ready, 
        canWatch: lesson?.can_watch,
        videoStatus: lesson?.video?.status
      });
      alert(`Cannot play video: ${!lesson?.video?.ready ? 'Video not ready' : 'No permission to watch'}`);
      return;
    }

    setStreamLoading(true);
    console.log('📡 Fetching stream URL for lesson:', lessonId);
    
    try {
      const result = await fetchStreamUrl(lessonId);
      console.log('📦 Stream URL API response:', result);
      
      if (result.error) {
        console.error('❌ Stream URL error:', result.error);
        setError(result.error);
        alert(`Error loading video: ${result.error}`);
      } else if (result.data) {
        console.log('✅ Stream URL data received:', {
          streamUrl: result.data.stream_url,
          expiresAt: result.data.expires_at,
          videoId: result.data.video?.id,
          urlLength: result.data.stream_url?.length
        });
        setStreamData(result.data);
      } else {
        console.error('❌ No data or error in response');
        alert('Failed to load video: No data received');
      }
    } catch (error) {
      console.error('❌ Exception while fetching stream URL:', error);
      alert(`Failed to load video: ${error}`);
    }
    
    setStreamLoading(false);
  };

  const handleProgress = (currentTime: number, duration: number) => {
    setWatchProgress({ currentTime, duration });
    
    // Report progress to backend every 30 seconds
    if (Math.floor(currentTime) % 30 === 0) {
      // TODO: Send progress to backend API
      console.log('Progress:', { currentTime, duration, percentage: (currentTime / duration) * 100 });
    }
  };

  const handleSeek = (seekCount: number) => {
    // Report excessive seeking
    console.warn('Excessive seeking detected:', seekCount);
  };

  const handleSpeedChange = (speedChanges: number) => {
    // Report excessive speed changes
    console.warn('Excessive speed changes detected:', speedChanges);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-pink-600" />
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">เกิดข้อผิดพลาด</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            กลับหน้าก่อน
          </button>
        </div>
      </div>
    );
  }

  const canWatchVideo = lesson.can_watch && lesson.video?.ready;
  const isVideoProcessing = lesson.video?.status === 'processing';
  const isVideoPending = lesson.video?.status === 'pending';  
  const hasVideoError = lesson.video?.status === 'failed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-pink-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            กลับ
          </button>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{lesson.course.title}</span>
              <span className="mx-2">•</span>
              <span>บทที่ {lesson.order_index}</span>
              {lesson.is_free && (
                <>
                  <span className="mx-2">•</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    ดูฟรี
                  </span>
                </>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{lesson.duration_minutes} นาที</span>
              {lesson.video && (
                <>
                  <span className="mx-2">•</span>
                  <span>{lesson.video.duration}</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Video Status Messages */}
              {!lesson.video && !lesson.video_url && (
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>ยังไม่มีวิดีโอสำหรับบทเรียนนี้</p>
                  </div>
                </div>
              )}

              {!lesson.video_url && lesson.video && (isVideoProcessing || isVideoPending) && (
                <div className="aspect-video bg-blue-50 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-blue-800 font-medium">
                      {isVideoPending ? 'กำลังรอการประมวลผลวิดีโอ...' : 'กำลังประมวลผลวิดีโอ...'}
                    </p>
                    <p className="text-blue-600 text-sm">กรุณารอสักครู่</p>
                  </div>
                </div>
              )}

              {!lesson.video_url && lesson.video && hasVideoError && (
                <div className="aspect-video bg-red-50 flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
                    <p className="text-red-800 font-medium">เกิดข้อผิดพลาดในการประมวลผลวิดีโอ</p>
                    {lesson.video.processing_error && (
                      <p className="text-red-600 text-sm mt-2">{lesson.video.processing_error}</p>
                    )}
                  </div>
                </div>
              )}

              {!lesson.video_url && !lesson.can_watch && lesson.video?.ready && (
                <div className="aspect-video bg-yellow-50 flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                    <p className="text-yellow-800 font-medium">ต้องซื้อคอร์สเพื่อดูบทเรียนนี้</p>
                    <button className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700">
                      ซื้อคอร์ส
                    </button>
                  </div>
                </div>
              )}

              {/* Notice when both YouTube and uploaded video exist */}
              {lesson.video_url && lesson.video?.ready && lesson.can_watch && (
                <div className="bg-blue-50 border border-blue-200 p-2 mb-2 rounded text-sm text-blue-700">
                  <p>💡 บทเรียนนี้มีทั้งวิดีโอ YouTube และวิดีโอที่อัปโหลด กำลังแสดงวิดีโอ YouTube</p>
                </div>
              )}

              {/* Priority 1: YouTube/External Video Player */}
              {lesson.video_url && lesson.can_watch && (
                <div className="aspect-video bg-black">
                  {lesson.video_url.includes('youtube.com') || lesson.video_url.includes('youtu.be') ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(lesson.video_url)}?rel=0&modestbranding=1`}
                      title={lesson.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : lesson.video_url.includes('vimeo.com') ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${getVimeoVideoId(lesson.video_url)}?title=0&byline=0&portrait=0`}
                      title={lesson.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="autoplay; fullscreen; picture-in-picture"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100">
                      <div className="text-center p-8">
                        <PlayCircle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">วิดีโอภายนอก</h3>
                        <p className="text-gray-600 mb-4">คลิกเพื่อดูวิดีโอในหน้าต่างใหม่</p>
                        <a
                          href={lesson.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
                        >
                          <span>ดูวิดีโอ</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Priority 2: Secure Video Player for uploaded files (only show if no YouTube URL) */}
              {!lesson.video_url && canWatchVideo && !streamData && (
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('🔴 Play button clicked!', {
                        canWatchVideo,
                        streamData,
                        streamLoading,
                        lessonVideoUrl: lesson.video_url,
                        videoReady: lesson?.video?.ready
                      });
                      getStreamUrl();
                    }}
                    disabled={streamLoading}
                    className="bg-pink-600 text-white px-8 py-4 rounded-lg hover:bg-pink-700 disabled:opacity-50 flex items-center cursor-pointer"
                    style={{ pointerEvents: streamLoading ? 'none' : 'auto' }}
                  >
                    {streamLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        กำลังโหลด...
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-5 h-5 mr-2" />
                        เริ่มดูวิดีโอ
                      </>
                    )}
                  </button>
                </div>
              )}


              {/* Secure Video Player - Show when stream URL is loaded (only if no YouTube URL) */}
              {!lesson.video_url && streamData && (
                <>
                  {console.log('🎥 Rendering WorkingSecureVideoPlayer with streamData:', {
                    streamUrl: streamData.stream_url,
                    urlLength: streamData.stream_url?.length,
                    urlPreview: streamData.stream_url?.substring(0, 100),
                    expiresAt: streamData.expires_at,
                    videoId: streamData.video?.id
                  })}
                  <WorkingSecureVideoPlayer
                    streamUrl={streamData.stream_url || ''}
                    title={lesson.title}
                    userName="นักเรียน BoostMe" // TODO: Get from auth context
                    userEmail="student@boostme.com" // TODO: Get from auth context
                    onProgress={handleProgress}
                  />
                </>
              )}
            </motion.div>
          </div>

          {/* Lesson Details Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">รายละเอียดบทเรียน</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">คำอธิบาย</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {lesson.description || 'ไม่มีคำอธิบาย'}
                  </p>
                </div>

                {lesson.video && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">สถานะวิดีโอ</h4>
                    <div className="flex items-center text-sm">
                      {lesson.video.status === 'ready' && (
                        <><CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-green-700">พร้อมใช้งาน</span></>
                      )}
                      {lesson.video.status === 'processing' && (
                        <><Loader2 className="w-4 h-4 text-blue-500 mr-2 animate-spin" />
                        <span className="text-blue-700">กำลังประมวลผล</span></>
                      )}
                      {lesson.video.status === 'failed' && (
                        <><AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-red-700">เกิดข้อผิดพลาด</span></>
                      )}
                    </div>
                  </div>
                )}

                {watchProgress.duration > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">ความคืบหน้า</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-pink-600 h-2 rounded-full"
                        style={{ 
                          width: `${(watchProgress.currentTime / watchProgress.duration) * 100}%` 
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {Math.round((watchProgress.currentTime / watchProgress.duration) * 100)}% เสร็จสิ้น
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}