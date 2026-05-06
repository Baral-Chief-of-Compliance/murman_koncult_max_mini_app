<template>
    <q-page class="flex flex-center text-center">
        <empty-content />
    </q-page>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useDistircts } from 'src/stores/districts-store';
import { getDistrictDetail } from 'src/axios/districts';
import { NOT_FOUND, SERVER_ERROR } from 'src/router/pathName';
import EmptyContent from 'src/components/EmptyContent.vue';


const route = useRoute()
const router = useRouter()

const districtsStore = useDistircts()

onMounted(async() => {
    if (districtsStore.districtId == null || districtsStore.districtId !== route.params.id){
        try{
            const res = await getDistrictDetail(route.params.id)
            
            if (res.status !== 200){
                await router.push({name: NOT_FOUND})
            }

            districtsStore.districtId = res.data.id
            districtsStore.districtName = res.data.name
            districtsStore.districtMinCode = res.data.min_code
            districtsStore.districtMaxCode = res.data.max_code
            districtsStore.workPlaces = res.data.count_vacansy

        }catch(error){
            if (error.response?.status === 404) {
                await router.push({name: NOT_FOUND})
            }else{
                await route.push({name: SERVER_ERROR})
                console.log('Произошла ошибка:', error)
            }
        }

        
    }
})

onUnmounted(() => {
    districtsStore.resetStore()
})
</script>