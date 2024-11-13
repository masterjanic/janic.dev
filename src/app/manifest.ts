import { type MetadataRoute } from "next";

import config from "~/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.baseUrl.hostname,
    short_name: config.baseUrl.hostname,
    start_url: "/",
    theme_color: "#3780f6",
    background_color: "#020817",
    display: "standalone",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
