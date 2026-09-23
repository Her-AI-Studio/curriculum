import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Quiz from './components/Quiz.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
  },
} satisfies Theme
