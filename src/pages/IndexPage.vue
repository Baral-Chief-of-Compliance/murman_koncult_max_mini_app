<template>
  <q-page class="flex flex-center text-center" :style="{minHeight: scrollAreaHeight}">
    <div class="q-mx-sm">
      <div class="text-indigo text-h4 q-mb-md">Добро пожаловать!</div>
      <div class="subtitel-main-page">В наш сервис для поиска вакансий в Мурманской области</div>

      <div class="column q-mt-md flex-center">
        <q-btn @click="router.push({name: DISTRICTS})" class="punkt q-mb-sm" no-caps color="orange" unelevated rounded label="Районы" />
        <q-btn @click="router.push({name: VACANCIES})" class="punkt" no-caps color="orange" unelevated rounded label="Вакансии" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { inject, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

import { useRouter } from 'vue-router';

import { DISTRICTS, VACANCIES } from 'src/router/pathName';


const router = useRouter()

const footerHeight = inject('footerHeight')
const headerHeight = inject('headerHeight')
const breadCrumbHeight = inject('breadCrumbHeight')

const {height: windowHeight} = useWindowSize()

const scrollAreaHeight = computed(() => {
    return (windowHeight.value - (footerHeight.value + headerHeight.value + breadCrumbHeight.value + 30)) + 'px'
})

</script>

<style scoped>
  .subtitel-main-page{
      font-size: 16px;
      line-height: 1.5;
      color: var(--q-dark);
  }

  .punkt{
    min-width: 30vw;
  }
</style>
