<template>
    <div class="q-pa-md q-gutter-sm text-indigo">
        <q-breadcrumbs>
            <q-breadcrumbs-el :label="breadCrumbLabel" :icon="breadCrumbIcon"></q-breadcrumbs-el>
        </q-breadcrumbs>
    </div>
</template>


<script setup>
import { VACANCIES, DISTRICTS, INDEX, FAVORITE } from 'src/router/pathName';
import { useRoute } from 'vue-router';
import { computed } from 'vue';


const route = useRoute()

const breadCrumbLabel = computed(() => {
    let label = ''
    switch(route.name){
        case INDEX:
            label = 'Главная'
            break;

        case DISTRICTS:
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

const breadCrumbIcon = computed(() => {
    let icon = ''

    switch(route.name){
        case INDEX:
            icon = 'home'
            break;
        
        case DISTRICTS:
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