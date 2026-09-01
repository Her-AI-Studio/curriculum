import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Required for GitHub Pages project site: https://her-ai-studio.github.io/curriculum/
  base: '/curriculum/',
  title: 'Her AI Studio Builds',
  description: 'Women learning AI together. Course materials for the Her AI Studio program.',
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ],
  themeConfig: {
    logo: { src: '/logo.png', alt: 'Her AI Studio' },
    siteTitle: 'Her AI Studio',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Sessions', link: '/week-1' },
    ],
    sidebar: [
      {
        text: 'Sessions',
        items: [
          { text: 'Week 1: Discover', link: '/week-1',
            items: [
              { text: 'Session 1: Understanding AI', link: '/understanding-ai' },
              { text: 'Session 2: Working with Data', link: '/working-with-data' },
            ],
           },
          { text: 'Week 2: Create', link: '/week-2',
            items: [
              { text: 'Session 3: Building with Arduino', link: '/building-with-arduino' },
              { text: 'Session 4: Eyes and Ears', link: '/eyes-and-ears' },
            ],
          },
          { text: 'Capstone', link: '/cyberdeck-instructions',
            items: [{text: 'Final Project', link: '/cyberdeck-instructions'}],
          }
        ],
      },
    ],
    footer: {
      message: 'A community program for the next generation of women in AI.',
      copyright: 'Copyright © 2026 Her AI Studio',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/her-ai-studio' },
    ],
    outline: {
      label: 'On this page',
    },
  },
})
