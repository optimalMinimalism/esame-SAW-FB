import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "logo.png"
      ],

      manifest: {
        name: "Chiesa Luterana Confessionale d'Italia",
        short_name: "CLCI",
        description: "Sito ufficiale della Chiesa Luterana Confessionale d'Italia",

        start_url: "/",
        scope: "/",

        display: "standalone",

        background_color: "#000000",
        theme_color: "#000000",

        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },

      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html"
      }
    })
  ]
});
