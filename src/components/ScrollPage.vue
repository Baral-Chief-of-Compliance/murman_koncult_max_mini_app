<template>
    <scroll-area
        :height="scrollAreaHeight"
    >
        <slot>

        </slot>
    </scroll-area>
</template>

<script setup>
import { inject, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

import ScrollArea from './ScrollArea.vue';

const footerHeight = inject('footerHeight')
const headerHeight = inject('headerHeight')
const breadCrumbHeight = inject('breadCrumbHeight')

const {height: windowHeight} = useWindowSize()

const scrollAreaHeight = computed(() => {
    return (windowHeight.value - (footerHeight.value + headerHeight.value + breadCrumbHeight.value + 30)) + 'px'
})


</script>