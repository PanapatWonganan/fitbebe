import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const kanit = Kanit({ 
  subsets: ["thai", "latin"], 
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "BoostMe - แพลตฟอร์มสุขภาพผู้หญิงออนไลน์",
  description: "ดูแลสุขภาพผู้หญิงครบวงจร ตั้งแต่ก่อนตั้งครรภ์ หลังคลอด สมดุลฮอร์โมน เพื่อสาวๆ ทุกคน",
  keywords: "สุขภาพผู้หญิง, หลังคลอด, ฮอร์โมน, โยคะ, สุขภาพจิต, คุณแม่, ออกกำลังกาย",
  authors: [{ name: "BoostMe Team" }],
  creator: "BoostMe",
  publisher: "BoostMe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://boostme.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BoostMe - แพลตฟอร์มสุขภาพผู้หญิงออนไลน์",
    description: "ดูแลสุขภาพผู้หญิงครบวงจร ตั้งแต่ก่อนตั้งครรภ์ หลังคลอด สมดุลฮอร์โมน เพื่อสาวๆ ทุกคน",
    url: "https://boostme.com",
    siteName: "BoostMe",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BoostMe - แพลตฟอร์มสุขภาพผู้หญิงออนไลน์",
    description: "ดูแลสุขภาพผู้หญิงครบวงจร ตั้งแต่ก่อนตั้งครรภ์ หลังคลอด สมดุลฮอร์โมน เพื่อสาวๆ ทุกคน",
    creator: "@boostme",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning className="light">
      <head>
        <meta name="theme-color" content="#ec4899" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('boostme-theme') || 'light';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = savedTheme || systemTheme;
                document.documentElement.className = theme;
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${kanit.className} antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
