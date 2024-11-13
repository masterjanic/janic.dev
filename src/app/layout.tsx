import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata, type Viewport } from "next";

import Footer from "~/components/footer";
import config from "~/config";
import { generateOpenGraph } from "~/lib/seo";

export const viewport: Viewport = {
  themeColor: "#3780f6",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  colorScheme: "dark",
};

export function generateMetadata(): Metadata {
  const title = "Janic Bellmann: Developer from Germany";
  const description =
    "Janic Bellmann is a developer from Germany. He is passionate about web development and loves to create websites and web applications.";

  return {
    title: {
      default: title,
      template: `%s - ${config.baseUrl.hostname}`,
    },
    description,
    ...generateOpenGraph({
      title,
      description,
    }),
    metadataBase: config.baseUrl,
    /* Static metadata (changes by individual pages are not of importance) */
    icons: {
      icon: [
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    },
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-title": config.baseUrl.hostname,
      "msapplication-TileColor": "#e11d48",
    },
    appleWebApp: {
      title: config.baseUrl.hostname,
      capable: true,
    },
    applicationName: config.baseUrl.hostname,
    keywords: ["janic bellmann"],
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    referrer: "strict-origin-when-cross-origin",
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} dark min-h-screen scroll-smooth antialiased`}
    >
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
