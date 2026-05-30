<template>
    <q-card  class="text-left no-shadow vacansy-card q-mb-md">
        <q-card-section>
            <div class="vacansy-card-name">{{ props.name }}</div>
            <div class="q-mt-sm vacansy-card-salary">{{ formatDate }}</div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn
                unelevated outline
                icon="delete"
                color="red"
                @click="deleteR"
            >
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { computed } from 'vue';
import { useQuasar } from 'quasar';

import { deleteResume } from 'src/axios/resume';
import { useResumeStore } from 'src/stores/resume-store';


const $q = useQuasar()
const resumeStore = useResumeStore()

const props = defineProps({
    id: {
        type: Number,
    },

    name: {
        type: String,
        default: 'Наименование'
    },

    date: {
        type: String,
        default: '2023-07-05'
    }
})


const formatDate = computed(() => {
    const date = new Date(props.date)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `Дата добавления: ${day}.${month}.${year}`
})

const deleteR = async() => {
   
    const res = await deleteResume(props.id)

    if (res.status !== 204){
        $q.notify({
            type: 'negative',
            message: `Произошла ошибка при удалении`
        })
    }

    $q.notify({
        type: 'warning',
        message: `Резюме ${props.name} удалено`
    })

    resumeStore.resume = resumeStore.resume.filter(r => r.id !== props.id)
}

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