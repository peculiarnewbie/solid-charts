import mdx from '@astrojs/mdx'
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        if (item.url === 'https://solidcharts.dev/') {
          item.priority = 1
        } else {
          item.priority = 0.9
        }
        item.changefreq = ChangeFreqEnum.DAILY
        item.lastmod = new Date().toISOString()
        return item
      },
    }),
    solid(),
  ],
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    syntaxHighlight: false,
  },
  site: 'https://solidcharts.dev',
  trailingSlash: 'always',
  experimental: {
    preserveScriptOrder: true,
  },
  vite: {
    plugins: [tailwind()],
  },
})
