<template>
    <page-container :flex="false">
        <template #content>
            <scroll-page
            >   
                <empty-content :empty-data="true" v-if="fvStore.favoriteVacancies.length === 0" />
                <div class="q-mx-md" v-else>
                    <vacancy-card 
                        v-for="v in fvStore.favoriteVacancies" 
                        :key="v.vacancy"
                        :id="v.vacancy"
                        :name="v.vacancy_name"
                        :salary="v.salary"
                        :address="v.vacancy_address"
                        :salary-max="v.salary_max"
                        :salary-min="v.salary_min"
                        :work-places="v.work_places"
                        :company="v.full_company_name"
                    />
                </div>
            </scroll-page>
        </template>
    </page-container>
</template>

<script setup>
import PageContainer from 'src/components/PageContainer.vue';
import EmptyContent from 'src/components/EmptyContent.vue';
import VacancyCard from 'src/components/VacancyCard.vue';

import { useFavoriteVacancies } from 'src/stores/favorite-vacancie-store';

const fvStore = useFavoriteVacancies()
</script>