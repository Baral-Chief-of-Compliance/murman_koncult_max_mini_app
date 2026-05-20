<template>
    <div class="flex flex-center text-center">
        <div class="text-indigo text-h5">
            {{ text }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    emptyData: {
        type: Boolean,
        default: false
    }
})

const text = computed(() => {
    return props.emptyData ? 'Вы пока не добавили ни одной вакансии в избранное...' : 'Извините, данный раздел ещё не готов...'
})

</script>