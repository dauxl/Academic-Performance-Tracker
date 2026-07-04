import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPA Tracker — Thapar",
  description: "Academic performance tracker for the Thapar CSE 2026 scheme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
