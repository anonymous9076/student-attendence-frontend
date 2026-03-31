import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UniPortal — Student Management System",
  description: "A comprehensive university management platform for administrators, professors, and students. Track attendance, manage courses, and streamline academic workflows.",
  keywords: "university, student management, attendance, courses, academic portal",
  openGraph: {
    title: "UniPortal — Student Management System",
    description: "Next-gen university management platform",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white min-h-dvh`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

