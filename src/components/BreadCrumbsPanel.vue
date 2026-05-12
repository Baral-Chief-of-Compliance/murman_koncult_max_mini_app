<template>
    <div class="q-pa-md q-gutter-sm text-indigo">
        <q-breadcrumbs>
            <q-breadcrumbs-el :to="breadCrumbTo" :label="breadCrumbLabel" :icon="breadCrumbIcon"></q-breadcrumbs-el>
            <q-breadcrumbs-el v-if="showSecondBreadcrumb" :label="secondBreadCrumbLabel"></q-breadcrumbs-el>
        </q-breadcrumbs>
    </div>
</template>


<script setup>
import { VACANCIES, DISTRICTS, DISTRICTS_DETAIL, INDEX, FAVORITE } from 'src/router/pathName';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

import { useDistircts } from 'src/stores/districts-store';


const districtsStore = useDistircts()


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


</script>