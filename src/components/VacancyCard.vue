<template>
    <!-- <q-card @click="showDeatilInfoAboutVacancie" class="no-shadow vacansy-card q-mb-md"> -->
    <q-card  class="text-left no-shadow vacansy-card q-mb-md">
        <q-card-section>
            <div class="vacansy-card-name">{{ props.name }}</div>
            <div class="q-mt-sm vacansy-card-company">{{ companyLabel }}</div>
            <div class="q-mt-xs vacansy-card-address">{{ props.address }}</div>
            <div class="q-mt-sm vacansy-card-salary">{{ props.salary }}</div>
        </q-card-section>
        
        <q-card-actions align="right">
            <q-btn 
                v-if="userStore.fromMax"
                size="md"
                icon="star"
                unelevated
                :color="favoriteBtnColor"
                outline 
                @click="addVacancyToFavorite"
            />
            <q-btn @click="showDeatilInfoAboutVacancie" size="md" icon="more_horiz" unelevated color="blue" outline  />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from 'src/stores/user-store';
import { useQuasar } from 'quasar';

import VacancieDetailInfo from './VacancieDetailInfo.vue';
import { addToFavoriteVacancie, deleteFavoriteVacancie, getFavoriteVacancies } from 'src/axios/favoriteVacancies';
import { useFavoriteVacancies } from 'src/stores/favorite-vacancie-store';


const $q = useQuasar()

const userStore = useUserStore()
const fvStore = useFavoriteVacancies()

const props = defineProps({
    id:{
        type: String,
        default: '547df4f9-e52b-11ef-9a52-e7d0d2cf29b1'
    },
    name: {
        type: String,
        default: 'Наименование вакансии'
    },
    salary: {
        type: String,
        default: 'от 60000'
    },
    address:{
        type: String,
        default: 'Адрес'
    },
    salaryMin: {
        type: Number,
        default: 0
    },
    salaryMax: {
        type: Number,
        default: 1
    },
    workPlaces: {
        type: Number,
        default: 1
    },
    company: {
        type: String,
        default: 'Наименование компании'
    }

})

const companyLabel = computed(() => {
    if (props.company.length > 64){
        return props.company.slice(0, 64) + '...'
    }

    return props.company
})

const favoriteBtnColor = computed(() => {
    return fvStore.vacanciesId.includes(props.id) ? 'orange': 'blue'
})

const showDeatilInfoAboutVacancie = () => {
    $q.dialog({
        component: VacancieDetailInfo,
        componentProps: {
            vacancieId: props.id
        }
    })
}

const addVacancyToFavorite = async () => {
    if (fvStore.vacanciesId.includes(props.id)){
        const fv = fvStore.getFavoriteVacancieId(props.id)

        if (fv){
            const res = await deleteFavoriteVacancie(fv.id)

            if (res.status !== 204){
                $q.notify({
                    type: 'negative',
                    message: `Произошла ошибка при удалении`
                })
            }

            $q.notify({
                type: 'warning',
                message: `${props.name} удалена из избранного`
            })

            const resListFv = await getFavoriteVacancies(
                userStore.id
            )

            if (resListFv.status !== 200){
                $q.notify({
                    type: 'negative',
                    message: `Произошла ошибка при удалении`
                })
            }

            fvStore.setVacancies(resListFv.data)

        }else{
            $q.notify({
                type: 'negative',
                message: `Что-то пошло не так`
            })
        }
    }else{
        const res = await addToFavoriteVacancie(
            props.id,
            userStore.id
        )

        if (res.status != 201){
            $q.notify({
                type: 'negative',
                message: `Произошла ошибка при добавлении в избранное`
            })
            return;
        }

        $q.notify({
            type: 'positive',
            message: `${props.name} добавлена в избранное`
        })
        
        fvStore.favoriteVacancies.push(
            {
                id : res.data.id,
                user: res.data.user,
                vacancy: res.data.vacancy,
                vacancy_name: props.name,
                salary: props.salary,
                vacancy_address: props.address,
                salary_max: props.salaryMax,
                salary_min: props.salaryMin,
                work_places: props.workPlaces,
                full_company_name: props.company
            }
        )
        fvStore.vacanciesId.push(res.data.vacancy)
    }

}

</script>

<style scoped>
    .vacansy-card{
        border-radius: 10px !important;
        border: 1px solid var(--q-light);
    }

    .vacansy-card-name{
        color: var(--q-dark);
        line-height: 1.25;
        font-weight: 600;
        font-size: 16px;
        word-break: break-word;
    }

    .vacansy-card-salary{
        font-size: 16px;
        line-height: 1.5;
        color: var(--q-dark);
    }

    .vacansy-card-address{
        font-size: 13px;
        line-height: 1.286;
        color: var(--q-dark);
    }

    .vacansy-card-company{
        font-size: 12px;
        line-height: 1.286;
        color: var(--q-dark);
        font-weight: 500;
    }

</style>