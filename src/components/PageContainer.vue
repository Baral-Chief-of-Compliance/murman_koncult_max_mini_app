<template>
    <q-page 
        :class="pageClass" 
        :style="{minHeight: scrollAreaHeight}">
        <slot name="content">

        </slot>
    </q-page>
</template>

<script setup>
import { inject, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

const footerHeight = inject('footerHeight')
const headerHeight = inject('headerHeight')
const breadCrumbHeight = inject('breadCrumbHeight')

const {height: windowHeight} = useWindowSize()

const scrollAreaHeight = computed(() => {
    return (windowHeight.value - (footerHeight.value + headerHeight.value + breadCrumbHeight.value + 30)) + 'px'
})

const pageClass = computed(() => ({
    'flex flex-center text-center': props.flex,
}))
const props = defineProps({
    flex: {
        type: Boolean,
        default: true
    }
})

</script>