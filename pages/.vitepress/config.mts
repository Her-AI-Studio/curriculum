import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
          { text: 'Beginner Course', link: '/beginner-course' },
          { text: 'Intermediate Course', link: '/intermediate-course' },
          { text: 'Advanced Course', link: '/advanced-course' },
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
