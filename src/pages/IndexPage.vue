<template>
  <page-container>
    <template #content>
      <div class="q-mx-sm">
        <div class="text-indigo text-h4 q-mb-md">Добро пожаловать!</div>
        <div class="subtitel-main-page">В наш сервис для поиска вакансий в Мурманской области</div>

        <div class="column q-mt-md flex-center">
          <q-btn @click="router.push({name: DISTRICTS})" class="punkt q-mb-sm" no-caps color="orange" unelevated rounded label="Районы" />
          <q-btn @click="router.push({name: VACANCIES})" class="punkt" no-caps color="orange" unelevated rounded label="Вакансии" />
        </div>
      </div>
    </template>
  </page-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { DISTRICTS, VACANCIES } from 'src/router/pathName';
import PageContainer from 'src/components/PageContainer.vue';


const router = useRouter()


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
