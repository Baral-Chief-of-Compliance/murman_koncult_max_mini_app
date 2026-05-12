<template>
    <page-container
        :flex="false"
    >
        <template #content>
            <!-- <loading-component v-if="loading" /> -->
            <infinite-scroll
                @on-load="getVacancyFromDistrict"
                height="auto"
            >
                    <div class="q-mx-md">  
                        <vacancy-card 
                            v-for="v in vacanciesStore.vacancies" :key="v.id"
                            :id="v.id"
                            :name="v.vacancyName"
                            :salary="v.salary"
                            :address="v.vacancyAddress"
                            :salary-max="v.salaryMax"
                            :salary-min="v.salaryMin"
                            :work-places="v.workPlaces"
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
import { useVacancies } from 'src/stores/vacancies-store';
import { getVacancies } from 'src/axios/vacancies';


const loading = ref(true)
const loadMore = ref(true)
const vacanciesStore = useVacancies()

const route = useRoute()
const router = useRouter()

const districtsStore = useDistircts()


/**
 * Получить вакансии с района
 */
const getVacancyFromDistrictOnStart = async() => {
    if (loadMore.value){
        const res = await getVacancies(
            districtsStore.districtMinCode,
            districtsStore.districtMaxCode,
            vacanciesStore.currentPage,
        )

        if (res.status !== 200){
            return
        }

        vacanciesStore.vacancies = vacanciesStore.vacancies.concat(res.data.results)
        vacanciesStore.currentPage += 1


        if (vacanciesStore.currentPage >= res.data.total_pages){
            loadMore.value = false
        }
    }
}

const getVacancyFromDistrict = async (index, done) => {
    if (!loadMore.value) {
        done(true)
        return
    }
    
    const res = await getVacancies(
        districtsStore.districtMinCode,
        districtsStore.districtMaxCode,
        vacanciesStore.currentPage,
    )

    if (res.status !== 200) {
        done(true)
        return
    }

    vacanciesStore.vacancies = vacanciesStore.vacancies.concat(res.data.results)
    vacanciesStore.currentPage += 1

    if (vacanciesStore.currentPage > res.data.total_pages) {
        loadMore.value = false
        done(true)
    } else {
        done()
    }
}

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

            await getVacancyFromDistrictOnStart()

            loading.value = false

            // await nextTick()
            // infiniteScrollRef.value?.triggerLoad()

        }catch(error){
            if (error.response?.status === 404) {
                await router.push({name: NOT_FOUND})
            }else{
                await router.push({name: SERVER_ERROR})
                console.error('Произошла ошибка:', error)
            }
        }

        
    }
})

onUnmounted(() => {
    districtsStore.resetStore()
})
</script>