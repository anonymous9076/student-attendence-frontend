'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white min-h-dvh`}>
        <Toaster richColors position="top-right" theme="dark" />
        <Provider store={store}>
          <QueryProvider>
            <AuthProvider>
              <Navbar />
              <main>{children}</main>
            </AuthProvider>
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
