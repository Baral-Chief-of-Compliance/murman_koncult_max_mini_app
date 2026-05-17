<template>
    <q-dialog 
        ref="dialogRef" @hide="onDialogHide"
        :maximized="false"
        :style="{ maxWidth: 'none' }"
>
        <q-card :style="cardStyle">   
            <q-card-section class="row items-center q-pb-none">
                <div class="vacansy-name">{{ vacansyName }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
                <loading-component
                    v-if="loading"
                />
                <scroll-area
                    v-else
                    :height="loadingHeight" 
                >
                    <div v-if="vacancieInfo && Object.keys(vacancieInfo).length" class="col q-mx-xl">
                        <vacancie-row-info
                        v-for="([key, value], index) in objectEntries"
                        :key="index"
                        :titel="key"
                        :value="value"
                        />
                    </div>
                </scroll-area>
            </q-card-section>
        </q-card>

    </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar';
import { onMounted, ref, computed } from 'vue';

import { useWindowSize } from '@vueuse/core';

import LoadingComponent from './LoadingComponent.vue';
import ScrollArea from './ScrollArea.vue';
import { getVacancieDetail } from 'src/axios/vacancies';
import VacancieRowInfo from './VacancieRowInfo.vue';


const { dialogRef, onDialogHide } = useDialogPluginComponent()
const loading = ref(true)

const vacancieInfo = ref({})

const vacansyName = computed(() => {
    if (vacancieInfo.value != {}){
        if ('vacancyName' in vacancieInfo.value){
            return vacancieInfo.value.vacancyName
        }
    }

    return 'Загрузка...'
})

const objectEntries = computed(() => {
  return Object.entries(vacancieInfo.value)
})

const {height: windowHeight, width: windowWidth} = useWindowSize()

const loadingHeight = computed(() => {
    return `${windowHeight.value * 0.66}px`
})

const cardStyle = computed(() => ({
    width : `${windowWidth.value}px`,
    maxWidth: '100vw',
    height: '81vh'
}))


defineEmits([
    ...useDialogPluginComponent.emits
])

const props = defineProps({
    vacancieId: {
        type: String
    }
})

const getVacancieDetailById = async () => {
    loading.value = true
    const res = await getVacancieDetail(props.vacancieId)

    if (res.status != 200){
        return;
    }
    vacancieInfo.value = res.data
    loading.value = false
}

onMounted(async() => {
    await getVacancieDetailById()
})

</script>

<style scoped>
    .cancel-btn{
        border-radius: 10px !important;
    }
    .vacansy-name{
        color: var(--q-dark);
        font-size: 20px;
        line-height: 1.4;
        font-weight: 600;
        letter-spacing: .2px;
        word-break: break-word;
    }
</style>