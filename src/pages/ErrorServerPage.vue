<template>
  <div class="fullscreen bg-grey-1 text-indigo text-center q-pa-md flex flex-center">
    <div>
      <div :style="iconStyle">
        \_(ツ)_/
      </div>

      <div :class="textClass" style="opacity:.4">
        Ой, какжется что-то пошло не так...
      </div>

      <q-btn
        rounded
        class="q-mt-xl"
        color="orange"
        text-color="white"
        unelevated
        to="/"
        label="На главную"
        no-caps
      />
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const {width: widthWindow } = useWindowSize()

const iconStyle = computed(() => ({
  'font-size': widthWindow.value > 1000 ? '30vh' : '10vw'
}))

const textClass = computed(() => ({
  'text-h2': widthWindow.value > 1000,
  'text-h5': widthWindow.value <= 1000
}))

</script>