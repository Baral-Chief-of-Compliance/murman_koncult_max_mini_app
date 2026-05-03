<template>
    <div class="text-center">
      <q-inner-loading
        class="bg-grey-1"
        color="indigo"
        size="4em"
        :showing="props.loading"
        :label="getLoadingPhrases"
        label-class="text-blue"
        label-style="font-size: 1em"
      />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const phrasesIndex = ref(0)

const intervalId = ref(null)

const loadingPhrases = [
    'Сканируем базу вакансий по всей России...',
    'Сортируем свежие вакансии по дате добавления',
    'Проверяем требования и зарплаты в Мурманской области',
    'Пожалуйста, подождите'
]

const getLoadingPhrases = computed(() => {
    const phrase = loadingPhrases[phrasesIndex.value]
    return phrase
})

const props = defineProps({
    loading: {
        type: Boolean,
        default: true
    }
})

const getPrahesIndex = () => {
    const randomInt = Math.floor(Math.random() * (loadingPhrases.length))
    phrasesIndex.value = randomInt
}

onMounted(() => {
    getPrahesIndex()
    intervalId.value = setInterval(() => {
       getPrahesIndex() 
    }, 1200)
})

onUnmounted(() => {
    clearInterval(intervalId.value)
})

</script>