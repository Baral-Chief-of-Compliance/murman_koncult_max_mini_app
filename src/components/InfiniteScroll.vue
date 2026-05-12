<template>
  <q-scroll-area
    visible
    :style="styleScrollArea"
    :thumb-style="styleThumb"
    :bar-style="styleBar"
    @scroll="onScroll"
  >
    <q-infinite-scroll
      @load="onLoad"
      :offset="300"
      :disable="disableInfiniteScroll"
      ref="infiniteScrollRef"
    >
      <slot></slot>
      
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-scroll-area>
</template>

<script setup>
import { computed, ref, inject} from 'vue';
import { useWindowSize } from '@vueuse/core';

const emit = defineEmits(['onLoad', 'onScroll'])

const { height: windowHeight } = useWindowSize()
const infiniteScrollRef = ref(null)

// Инжекты (если нужны)
const footerHeight = inject('footerHeight')
const headerHeight = inject('headerHeight')
const breadCrumbHeight = inject('breadCrumbHeight')



const styleBar = computed(() => ({
  borderRadius: '5px',
  backgroundColor: '#7CBDE2',
  width: '10px',
  opacity: 0.2
}))

const styleThumb = computed(() => ({
  borderRadius: '5px',
  backgroundColor: '#164FA4',
  width: '10px',
  opacity: 0.75
}))

// Вычисление высоты, если передано 'auto'
const scrollAreaHeight = computed(() => {  
  return (windowHeight.value - (footerHeight.value + headerHeight.value + breadCrumbHeight.value + 30)) + 'px'
})

const styleScrollArea = computed(() => ({
  height: scrollAreaHeight.value
}))


const onLoad = (index, done) => {
  emit('onLoad', index, done)
}

const onScroll = (event) => {
  emit('onScroll', event)
}

// Метод для сброса состояния бесконечной прокрутки
const resetInfiniteScroll = () => {
  if (infiniteScrollRef.value) {
    infiniteScrollRef.value.reset()
  }
}

// Метод для принудительной проверки загрузки
const triggerLoad = () => {
  if (infiniteScrollRef.value) {
    infiniteScrollRef.value.trigger()
  }
}

defineExpose({
  resetInfiniteScroll,
  triggerLoad
})
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>