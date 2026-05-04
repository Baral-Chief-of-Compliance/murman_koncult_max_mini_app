<template>
    <q-scroll-area
        visible
        :style="styleScrolArea"
        :thumb-style="styleThumb"
        :bar-style="styleBar"
    >
        <slot>

        </slot>
    </q-scroll-area>
</template>

<script setup>
import { computed } from 'vue';

const styleScrolArea = computed(() => ({
    height: props.height
}))

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

const props = defineProps({
    height: {
        type: String,
        default: '200px'
    }
})

</script>