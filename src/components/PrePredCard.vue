<template>
    <q-card @click="router.push({name: PRE_REG_DETAIL, params: {id: props.id}})" class="no-shadow pre-reg-card q-mb-md cursor-pointer">
        <div class="pre-reg-card-name">{{ props.name }}</div>
        <div class="pre-reg-card-address">{{ props.address }}</div>
    </q-card>
</template>


<script setup>
import { PRE_REG_DETAIL } from 'src/router/pathName';

import { useRouter } from 'vue-router';


const router = useRouter()

const props = defineProps({
    id: {
        type: Number,
        default: 1
    },

    name: {
        type: String,
        default: 'Наименование Очереди'
    },

    address: {
        type: String,
        default: 'Адрес очереди'
    },
})

</script>


<style scoped>
    .pre-reg-card{
        width: 385px;
        height: 172px;
        border-radius: 10px !important;
        border: 1px solid var(--q-light);
    }

    .pre-reg-card-name{
        color: var(--q-dark);
        line-height: 1.25;
        font-weight: 600;
        font-size: 16px;
        word-break: break-word;
    }

    .pre-reg-card-address{
        font-size: 13px;
        line-height: 1.286;
        color: var(--q-dark);
    }


</style>
