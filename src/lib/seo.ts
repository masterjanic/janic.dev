import config from "~/config";
import { type Metadata } from "next";

function generateOpenGraph({
                             title,
                             description,
                             url = "/",
                           }: {
  title?: string;
  description?: string;
  url?: string;
}) {
  const data: Metadata = {
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "de",
      url,
      siteName: config.baseUrl.hostname,
      emails: config.mail,
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
  };

  return data;
}

export { generateOpenGraph };