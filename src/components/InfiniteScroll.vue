<template>
        <div :style="styleParentDiv">
        <q-infinite-scroll 
            @load="$emit('onLoad')"
            :offset="300"
        >
            <slot>

            </slot>
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
            </div>
        </template>
        </q-infinite-scroll>
    </div>
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

const styleParentDiv = computed(() => ({
    maxHeight: scrollAreaHeight.value,
    overflow: 'auto'
}))
</script>