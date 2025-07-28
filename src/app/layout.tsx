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
  title: "FitBebe - แพลตฟอร์มสุขภาพผู้หญิงออนไลน์",
  description: "ดูแลสุขภาพผู้หญิงครบวงจร ตั้งแต่ก่อนตั้งครรภ์ หลังคลอด สมดุลฮอร์โมน เพื่อสาวๆ ทุกคน",
  keywords: "สุขภาพผู้หญิง, ตั้งครรภ์, หลังคลอด, ฮอร์โมน, โยคะ, สุขภาพจิต, คุณแม่",
  authors: [{ name: "FitBebe Team" }],
  creator: "FitBebe",
  publisher: "FitBebe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://fitbebe.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FitBebe - แพลตฟอร์มสุขภาพผู้หญิงออนไลน์",
    description: "ดูแลสุขภาพผู้หญิงครบวงจร ตั้งแต่ก่อนตั้งครรภ์ หลังคลอด สมดุลฮอร์โมน เพื่อสาวๆ ทุกคน",
    url: "https://fitbebe.com",
    siteName: "FitBebe",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitBebe - แพลตฟอร์มสุขภาพผู้หญิงออนไลน์",
    description: "ดูแลสุขภาพผู้หญิงครบวงจร ตั้งแต่ก่อนตั้งครรภ์ หลังคลอด สมดุลฮอร์โมน เพื่อสาวๆ ทุกคน",
    creator: "@fitbebe",
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
    <html lang="th" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className={`${kanit.className} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col">
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
