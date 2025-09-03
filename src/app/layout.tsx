import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Navbar from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amful Software - সফটওয়্যার সলিউশন",
  description:
    "আমরা প্রদান করি উচ্চমানের ওয়েব এবং মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট সার্ভিস",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
