<template>
    <page-container>
        <template #content>

        </template>
    </page-container>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

import { usePreRegStore } from 'src/stores/pre-reg-store';
import PrePregistrationService from 'src/axios/preReg';
import { NOT_FOUND, SERVER_ERROR } from 'src/router/pathName';
import PageContainer from 'src/components/PageContainer.vue';


const route = useRoute();
const router = useRouter();

const preRegStore = usePreRegStore()



/**
 * Получить доступные даты для пререгистрации
 * @param id {number}
 */
const parseAvailableDates = async(id) => {
    const res = await PrePregistrationService.getAvailableDates(id)

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(res.data, 'text/xml')
}

onMounted(async() => {
    const res = await PrePregistrationService.get(route.params.id)

    if (res.status !== 200){
        if (res.status === 404){
            await router.push({name: NOT_FOUND})
            return;
        }else{
            await router.push({name: SERVER_ERROR})
            return;
        }
    }


    preRegStore.setPreReg(
        res.data.id,
        res.data.name,
        res.data.address
    )

    await parseAvailableDates(id)

})


</script>
