<template>
    <page-container :flex="false">
        <template #content>
            <!-- Индикатор начальной загрузки -->
            <loading-component v-if="loading" />
            
            <infinite-scroll
                v-else
                ref="infiniteScrollRef"
                @onLoad="getVacancyFromDistrict"
            >
                <div class="q-mx-md">  
                    <vacancy-card 
                        v-for="v in vacanciesStore.vacancies" 
                        :key="v.id"
                        :id="v.id"
                        :name="v.vacancyName"
                        :salary="v.salary"
                        :address="v.vacancyAddress"
                        :salary-max="v.salaryMax"
                        :salary-min="v.salaryMin"
                        :work-places="v.workPlaces"
                        :company="v.fullCompanyName"
                    />
                </div>
            </infinite-scroll>
        </template>
    </page-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useDistircts } from 'src/stores/districts-store';
import { getDistrictDetail } from 'src/axios/districts';
import { NOT_FOUND, SERVER_ERROR } from 'src/router/pathName';
import PageContainer from 'src/components/PageContainer.vue';
import VacancyCard from 'src/components/VacancyCard.vue';
import InfiniteScroll from 'src/components/InfiniteScroll.vue';
import { useVacancies } from 'src/stores/vacancies-store';
import { getVacancies } from 'src/axios/vacancies';
import LoadingComponent from 'src/components/LoadingComponent.vue';


const loading = ref(true);
const loadMore = ref(true);
const infiniteScrollRef = ref(null);
const vacanciesStore = useVacancies();

const route = useRoute();
const router = useRouter();
const districtsStore = useDistircts();

/**
 * Получить вакансии с района (стартовая загрузка)
 */
const getVacancyFromDistrictOnStart = async() => {
    if (!loadMore.value) return;
    
    const res = await getVacancies(
        districtsStore.districtMinCode,
        districtsStore.districtMaxCode,
        vacanciesStore.currentPage,
    );

    if (res.status !== 200) {
        return;
    }

    vacanciesStore.vacancies = vacanciesStore.vacancies.concat(res.data.results);
    vacanciesStore.currentPage += 1;

    if (vacanciesStore.currentPage >= res.data.total_pages) {
        loadMore.value = false;
    }
};

/**
 * Получить вакансии с района (для infinite scroll)
 */
const getVacancyFromDistrict = async (index, done) => {
    if (!loadMore.value) {
        done(true);
        return;
    }
    
    const res = await getVacancies(
        districtsStore.districtMinCode,
        districtsStore.districtMaxCode,
        vacanciesStore.currentPage,
    );

    if (res.status !== 200) {
        done(true);
        return;
    }

    vacanciesStore.vacancies = vacanciesStore.vacancies.concat(res.data.results);
    vacanciesStore.currentPage += 1;

    if (vacanciesStore.currentPage > res.data.total_pages) {
        loadMore.value = false;
        done(true);
    } else {
        done();
    }
};

onMounted(async () => {
    // Сбрасываем состояние при монтировании (для router.push)
    vacanciesStore.vacancies = [];
    vacanciesStore.currentPage = 1;
    loadMore.value = true;
    loading.value = true;
    
    // Если район другой или не загружен
    if (districtsStore.districtId == null || districtsStore.districtId !== route.params.id) {
        try {
            const res = await getDistrictDetail(route.params.id);
            
            if (res.status !== 200) {
                await router.push({name: NOT_FOUND});
                return;
            }

            districtsStore.districtId = res.data.id;
            districtsStore.districtName = res.data.name;
            districtsStore.districtMinCode = res.data.min_code;
            districtsStore.districtMaxCode = res.data.max_code;
            districtsStore.workPlaces = res.data.count_vacansy;

            // Загружаем первую страницу вакансий
            await getVacancyFromDistrictOnStart();
            
            // Даем Vue время на отрисовку и триггерим infinite scroll
            await nextTick();
            
            // Триггерим загрузку если нужно
            if (infiniteScrollRef.value && vacanciesStore.vacancies.length > 0) {
                infiniteScrollRef.value.triggerLoad();
            }
            
            loading.value = false;
            
            // Дополнительная проверка: если контента мало, infinite scroll может не сработать
            setTimeout(() => {
                if (loadMore.value && infiniteScrollRef.value) {
                    infiniteScrollRef.value.triggerLoad();
                }
            }, 100);

        } catch(error) {
            loading.value = false;
            if (error.response?.status === 404) {
                await router.push({name: NOT_FOUND});
            } else {
                await router.push({name: SERVER_ERROR});
                console.error('Произошла ошибка:', error);
            }
        }
    } else {
        // Если район уже загружен, просто показываем вакансии
        loading.value = false;
        await nextTick();
        if (infiniteScrollRef.value) {
            infiniteScrollRef.value.triggerLoad();
        }
    }
});

onUnmounted(() => {
    districtsStore.resetStore()
    vacanciesStore.$reset()
});
</script>