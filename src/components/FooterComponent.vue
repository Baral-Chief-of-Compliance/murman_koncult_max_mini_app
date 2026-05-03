<template>
    <q-footer elevated class="bg-white text-indigo">
      <q-toolbar class="text-center">
        <q-toolbar-title :style="footerNameStyle">{{ footerName }}</q-toolbar-title>
      </q-toolbar>
    </q-footer>
</template>

<script setup>
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const {width: widthWindow } = useWindowSize()

const footerNameStyle = computed(() => ({
  fontSize: widthWindow.value < 1000? '3vw' : '20px'
}))

const footerName = computed(() => {
  const date = new Date()
  return `© ${date.getFullYear()}. Разработано в ГОКУ ЦЗН Мурманской области`
})
</script>