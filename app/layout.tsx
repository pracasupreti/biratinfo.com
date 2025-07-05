import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/next';
import ScheduledPostChecker from "@/components/ScheduledPostChecker";
import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const alata = Alata({
//   weight: '400',
//   variable: "--font-alata",
//   subsets: ["latin"],
// });

// const jost = Jost({
//   variable: "--font-jost",
//   subsets: ["latin"],
// });

// const orienta = Orienta({
//   weight: "400",
//   variable: "--font-orienta",
//   subsets: ["latin"],
// });

// const ibm_plex_serif = IBM_Plex_Serif({
//   weight: ["700", "500"],
//   variable: "--font-ibm_plex_serif",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIRATINFO | Digital Archive of Information",
  description: "Digital Archive of Information",
  metadataBase: new URL('https://87f6-2400-1a00-4b8e-ea74-1357-53d-4860-2836.ngrok-free.app'),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Script
            src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
            strategy="afterInteractive"
          />
          <Script id="onesignal-init" strategy="afterInteractive">
            {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "2e27e2ea-e039-4502-9f16-0439a9b250bb",
                notifyButton: {
                  enable: true
                }
              });
            });
          `}
          </Script>

        </head>
        <body
          className={` ${roboto.variable} ${inter.variable} antialiased`}
        >
          <>
            <ScheduledPostChecker />
            {children}
            <Analytics />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </>
        </body>
      </html>
    </ClerkProvider>
  );
}
