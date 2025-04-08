import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// providers
import { AppClientProvider } from "@/provider/provider-client";
import { AppServerProvider } from "@/provider/provider-sever";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "/convex.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootCn = `${inter.variable} antialiased`;
  const rootContainerCn = cn(
    rootCn,
    "h-screen w-full overflow-hidden  relative flex flex-col font-sans",
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={rootContainerCn}>
        <AppServerProvider>
          <AppClientProvider>{children}</AppClientProvider>
        </AppServerProvider>
      </body>
    </html>
  );
}
