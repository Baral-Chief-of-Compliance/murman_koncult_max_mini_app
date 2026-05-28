<template>
    <q-card  class="text-left no-shadow vacansy-card q-mb-md">
        <q-card-section>
            <div class="vacansy-card-name">{{ props.name }}</div>
            <div class="q-mt-sm vacansy-card-salary">{{ formatDate }}</div>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { computed } from 'vue';

    const props = defineProps({
        name: {
            type: String,
            default: 'Наименование'
        },

        file: {
            type: String,
            default: null
        },

        date: {
            type: String,
            default: '2023-07-05'
        }
    })


const formatDate = computed(() => {
    const date = new Date(props.date)
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
})

</script>

<style scoped>
    .vacansy-card{
        border-radius: 10px !important;
        border: 1px solid var(--q-light);
    }

    .vacansy-card-name{
        color: var(--q-dark);
        line-height: 1.25;
        font-weight: 600;
        font-size: 16px;
        word-break: break-word;
    }

    .vacansy-card-salary{
        font-size: 16px;
        line-height: 1.5;
        color: var(--q-dark);
    }

    .vacansy-card-address{
        font-size: 13px;
        line-height: 1.286;
        color: var(--q-dark);
    }

    .vacansy-card-company{
        font-size: 12px;
        line-height: 1.286;
        color: var(--q-dark);
        font-weight: 500;
    }

</style>