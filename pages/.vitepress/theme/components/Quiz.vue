<script setup lang="ts">
import { computed, reactive } from 'vue'

export interface QuizQuestion {
  id: string
  prompt: string
  choices: string[]
  correctIndex: number
  explanation?: string
}

const props = defineProps<{
  id: string
  title?: string
  questions: QuizQuestion[]
}>()

const answers = reactive<Record<string, { choiceIndex: number; correct: boolean }>>({})

function submitAnswer(questionId: string, choiceIndex: number) {
  if (answers[questionId]) return
  const question = props.questions.find((q) => q.id === questionId)
  if (!question) return
  answers[questionId] = { choiceIndex, correct: choiceIndex === question.correctIndex }
}

const answeredCount = computed(() => Object.keys(answers).length)
const correctCount = computed(() => Object.values(answers).filter((a) => a.correct).length)
const complete = computed(() => answeredCount.value === props.questions.length)

const feedback = computed(() => {
  if (answeredCount.value === 0) return null
  const total = props.questions.length
  const label = props.title ?? 'This quiz'
  if (answeredCount.value < total) {
    return `${label}: ${answeredCount.value}/${total} answered so far.`
  }
  if (correctCount.value === total) {
    return `${label}: ${correctCount.value}/${total} correct. Nice work — you're ready to move on.`
  }
  if (correctCount.value >= total / 2) {
    return `${label}: ${correctCount.value}/${total} correct. Solid, but worth a quick review before moving on.`
  }
  return `${label}: ${correctCount.value}/${total} correct. Review this section before continuing — several ideas here need another look.`
})
</script>

<template>
  <div class="quiz">
    <p v-if="title" class="quiz__title">{{ title }}</p>

    <div v-for="question in questions" :key="question.id" class="quiz__question">
      <p class="quiz__prompt">{{ question.prompt }}</p>
      <div class="quiz__choices">
        <button
          v-for="(choice, index) in question.choices"
          :key="index"
          type="button"
          class="quiz__choice"
          :class="{
            'quiz__choice--selected': answers[question.id]?.choiceIndex === index,
            'quiz__choice--correct': answers[question.id] && index === question.correctIndex,
            'quiz__choice--incorrect': answers[question.id]?.choiceIndex === index && !answers[question.id]?.correct,
          }"
          :disabled="!!answers[question.id]"
          @click="submitAnswer(question.id, index)"
        >
          {{ choice }}
        </button>
      </div>
      <p v-if="answers[question.id] && question.explanation" class="quiz__explanation">
        {{ question.explanation }}
      </p>
    </div>

    <p v-if="feedback" class="quiz__feedback" :class="{ 'quiz__feedback--complete': complete }">
      {{ feedback }}
    </p>
  </div>
</template>
