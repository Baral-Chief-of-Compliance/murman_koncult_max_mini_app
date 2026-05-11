<template>
    <page-container
        :flex="false"
    >
        <!-- <empty-content /> -->
        <template #content>
            <infinite-scroll @on-load="onLoad">
                    <div class="q-mx-md">  
                        <vacancy-card 
                            v-for="(item, index) in items" :key="index"
                        />
                    </div>
            </infinite-scroll>
        </template>
    </page-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useDistircts } from 'src/stores/districts-store';
import { getDistrictDetail } from 'src/axios/districts';
import { NOT_FOUND, SERVER_ERROR } from 'src/router/pathName';
import PageContainer from 'src/components/PageContainer.vue';
import VacancyCard from 'src/components/VacancyCard.vue';
import InfiniteScroll from 'src/components/InfiniteScroll.vue';
// import EmptyContent from 'src/components/EmptyContent.vue';


const items = ref([{}, {}, {}, {}, {}, {}, {}])

function onLoad(index, done) {
setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {})
    done()
}, 2000)
}

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