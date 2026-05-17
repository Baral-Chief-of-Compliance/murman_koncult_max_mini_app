<template>
    <page-container :flex="false">
        <template #content>
            <loading-component v-if="vacanciesStore.loading" />
            
            <infinite-scroll
                v-else
                ref="infiniteScrollRef"
                @onLoad="getVacancy"
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
import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import PageContainer from 'src/components/PageContainer.vue';
import { useVacancies } from 'src/stores/vacancies-store';
import { getAllVacancies } from 'src/axios/vacancies';
import VacancyCard from 'src/components/VacancyCard.vue';
import InfiniteScroll from 'src/components/InfiniteScroll.vue';
import { NOT_FOUND, SERVER_ERROR } from 'src/router/pathName';


const router = useRouter();

const loadMore = ref(true);

const infiniteScrollRef = ref(null);


const vacanciesStore = useVacancies();

/**
 * Получить вакансии с района (стартовая загрузка)
 */
const getVacancyOnStart = async() => {
    if (!loadMore.value) return;
    
    const res = await getAllVacancies(
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

const getVacancy = async (index, done) => {
    if (!loadMore.value) {
        done(true);
        return;
    }
    
    const res = await getAllVacancies(
        vacanciesStore.currentPage,
        vacanciesStore.vacancySearchName,
        vacanciesStore.sortBy
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
    vacanciesStore.loading = true;
    
    // Если район другой или не загружен
    try {

        // Загружаем первую страницу вакансий
        await getVacancyOnStart();
        
        // Даем Vue время на отрисовку и триггерим infinite scroll
        await nextTick();
        
        // Триггерим загрузку если нужно
        if (infiniteScrollRef.value && vacanciesStore.vacancies.length > 0) {
            infiniteScrollRef.value.triggerLoad();
        }
        
        vacanciesStore.loading = false;
        
        // Дополнительная проверка: если контента мало, infinite scroll может не сработать
        setTimeout(() => {
            if (loadMore.value && infiniteScrollRef.value) {
                infiniteScrollRef.value.triggerLoad();
            }
        }, 100);

    } catch(error) {
        vacanciesStore.loading = false;
        if (error.response?.status === 404) {
            await router.push({name: NOT_FOUND});
        } else {
            await router.push({name: SERVER_ERROR});
            console.error('Произошла ошибка:', error);
        }
    }
});

const { sortBy,  vacancySearchName } = storeToRefs(vacanciesStore)


const getVacanciesInWatch = async() => {
    vacanciesStore.loading = true
    vacanciesStore.vacancies = []
    vacanciesStore.currentPage = 1

    const res = await getAllVacancies(
        vacanciesStore.currentPage,
        vacanciesStore.vacancySearchName,
        vacanciesStore.sortBy
    );

    if (res.status !== 200) {
        return;
    }

    vacanciesStore.vacancies = vacanciesStore.vacancies.concat(res.data.results);
    vacanciesStore.currentPage += 1;
    if (vacanciesStore.currentPage > res.data.total_pages) {
        loadMore.value = false;
    }else{
        loadMore.value = true
    }

    vacanciesStore.loading = false
}


watch(sortBy, async() => {
    await getVacanciesInWatch()
});

watch(vacancySearchName, async() => {
    await getVacanciesInWatch()
})

onUnmounted(() => {
    vacanciesStore.$reset()
});
</script>