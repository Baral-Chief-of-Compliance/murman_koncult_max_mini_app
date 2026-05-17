<template>
    <div class="q-pa-md q-gutter-sm text-indigo">
        <q-breadcrumbs>
            <q-breadcrumbs-el :to="breadCrumbTo" :label="breadCrumbLabel" :icon="breadCrumbIcon"></q-breadcrumbs-el>
            <q-breadcrumbs-el v-if="showSecondBreadcrumb" :label="secondBreadCrumbLabel"></q-breadcrumbs-el>
        </q-breadcrumbs>

        <div class="row" v-if="showSearchInput">
            <div class="col-auto q-mr-md">
                <q-btn
                    size="lg"   
                    icon="sort"
                    outline
                    rounded
                    :color="colorSortBtn"
                >
                    <q-popup-proxy>
                        <q-card>
                            <q-card-section>
                                <q-list>
                                    <q-item 
                                        v-for="sv in VACANCY_SORT" 
                                        clickable
                                        v-ripple
                                        v-bind:key="sv.value"
                                        @click="vacanciesStore.selectSortValue(sv.value)"
                                    >
                                        <q-item-section
                                            :class="{
                                                'text-black': vacanciesStore.sortBy !== sv.value,
                                                'text-indigo': vacanciesStore.sortBy === sv.value
                                            }"
                                        >
                                            {{ sv.name }}
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                    </q-popup-proxy>
                </q-btn>
            </div>
            <div class="col">
                <q-input
                    color="indigo"
                    label="Поиск"
                    outlined 
                    rounded
                    v-model="vacanciesStore.vacancySearchName"
                >
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
        </div>
    </div>
</template>


<script setup>
import { VACANCIES, DISTRICTS, DISTRICTS_DETAIL, INDEX, FAVORITE } from 'src/router/pathName';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

import { useDistircts } from 'src/stores/districts-store';
import { useVacancies, VACANCY_SORT } from 'src/stores/vacancies-store';


const districtsStore = useDistircts()
const vacanciesStore = useVacancies()


const route = useRoute()


const showSecondBreadcrumb = computed(() => {
    let show = false

    switch(route.name){
        case DISTRICTS_DETAIL:
            show = true
            break;

        default:
            show = false
            break;
    }

    return show
})


const breadCrumbTo = computed(() => {
    let to = null

    switch(route.name){
        case DISTRICTS_DETAIL:
            to = {name: DISTRICTS}
            break;
        default:
            to = null
            break;
    }
    return to
})

const breadCrumbLabel = computed(() => {
    let label = ''
    switch(route.name){
        case INDEX:
            label = 'Главная'
            break;

        case DISTRICTS:
            label = 'Районы'
            break;

        case DISTRICTS_DETAIL:
            label = 'Районы'
            break;

        case VACANCIES:
            label = 'Вакансии'
            break;

        case FAVORITE:
            label = 'Избранное'
            break;
        
        default:
            label = 'Раздел'
            break;
    }

    return label
})

const secondBreadCrumbLabel = computed(() => {
    let label = ''

    switch(route.name){
        case DISTRICTS_DETAIL:
            if (districtsStore.districtName == null){
                label = 'Загрузка...'
            }else{
                label = districtsStore.districtName
            }
            break;

        default:
            label = 'Подраздел'
            break;
    }

    return label
})

const breadCrumbIcon = computed(() => {
    let icon = ''

    switch(route.name){
        case INDEX:
            icon = 'home'
            break;
        
        case DISTRICTS:
            icon = 'location_on'
            break;

        case DISTRICTS_DETAIL:
            icon = 'location_on'
            break;
        
        case VACANCIES:
            icon = 'engineering'
            break;
        
        default:
            icon = 'book'
            break;
    }

    return icon
})

const showSearchInput = computed(() => {
    let show = false

    switch (route.name){
        case VACANCIES:
        case DISTRICTS_DETAIL:
            show = true;
            break;
        default:
            show = false
            break;
    }
    return show
})


const colorSortBtn = computed(() => {
    return vacanciesStore.getStatusSort ? 'indigo' : 'grey-6'
})


</script>