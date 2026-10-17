import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ModeProvider } from "@/context/ModeContext";
import { SoundProvider } from "@/components/UI/SoundManager";
import { Navbar } from "@/components/Navigation/Navbar";
import { CustomCursor } from "@/components/Navigation/CustomCursor";
import { SmoothScrollProvider } from "@/components/UI/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Santhosh Kumar | AI/ML Engineer Portfolio",
  description:
    "Explore the AI/ML engineering portfolio of Santhosh Kumar, featuring machine learning, deep learning, computer vision, predictive analytics, and full-stack AI-powered projects.",
  keywords: [
    "Santhosh Kumar",
    "AI/ML Engineer",
    "Python Developer",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Predictive Analytics",
    "NAYAN-X",
    "FastAPI",
    "TensorFlow",
    "PyTorch",
    "Docker",
    "Chennai",
    "Rajalakshmi Institute of Technology",
  ],
  authors: [{ name: "Santhosh Kumar" }],
  creator: "Santhosh Kumar",
  openGraph: {
    title: "Santhosh Kumar | AI/ML Engineer Portfolio",
    description:
      "Explore the AI/ML engineering portfolio of Santhosh Kumar, featuring machine learning, deep learning, computer vision, predictive analytics, and full-stack AI-powered projects.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#03050B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#03050B] text-[#F5F7FF] antialiased selection:bg-[#00D9FF] selection:text-[#03050B]">
        <SmoothScrollProvider>
          <ModeProvider>
            <SoundProvider>
              <CustomCursor />
              <Navbar />
              <main className="relative">{children}</main>
            </SoundProvider>
          </ModeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
