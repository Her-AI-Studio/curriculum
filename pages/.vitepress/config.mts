import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // Required for GitHub Pages project site: https://her-ai-studio.github.io/curriculum/
  base: '/curriculum/',
  title: 'Her AI Studio Courses',
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
      { text: 'Courses', link: '/beginner-course' },
    ],
    sidebar: [
      {
        text: 'Courses',
        items: [
          { text: 'Beginner Course', link: '/beginner-course',
            items: [{text: 'Week 1', link: '/week-1'},{text: 'Week 2', link: '/week-2'}],
           },
          { text: 'Intermediate Course', link: '/intermediate-course',
            items: [{text: 'Week 3', link: '/week-3'},{text: 'Week 4', link: '/week-4'}],

          },
          { text: 'Advanced Course', link: '/advanced-course',
            items: [{text: 'Week 5', link: '/week-5'},{text: 'Week 6', link: '/week-6'}],
          },
          { text: 'Capstone', link: '/capstone-instructions'          },
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
