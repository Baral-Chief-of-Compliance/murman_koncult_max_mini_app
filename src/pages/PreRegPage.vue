<template>
    <page-container :flex="false">
        <template #content>
            <scroll-area
                :height="scrollAreaHeight"
            >
                <empty-content v-if="preRegList.length === 0" />
                <div class="row justify-between" v-else>
                    <pre-pred-card 
                        v-for="pr in preRegList"
                        v-bind:key="d.id"
                        :id="d.id"
                        :address="d.address"
                        :name="d.name"
                    />
                </div>
            </scroll-area>
        </template>
    </page-container>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { inject, ref, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';

import PageContainer from 'src/components/PageContainer.vue';
import EmptyContent from 'src/components/EmptyContent.vue';
import ScrollArea from 'src/components/ScrollArea.vue';
import PrePredCard from 'src/components/PrePredCard.vue';
import PrePregistrationService from 'src/axios/preReg';


const footerHeight = inject('footerHeight')
const headerHeight = inject('headerHeight')
const breadCrumbHeight = inject('breadCrumbHeight')

const {height: windowHeight} = useWindowSize()

const $q = useQuasar()

const preRegList = ref([])

const scrollAreaHeight = computed(() => {
    return (windowHeight.value - (footerHeight.value + headerHeight.value + breadCrumbHeight.value + 100)) + 'px'
})

const ERROR_TEXT_NOTIFY_GET_PRE_REG = 'Произошла ошибка в получение пререгистраций'


/**
 * Получить статус пререгистрации
 * @param preRegId {number}
 */
const preRegCheckOnline = async(preRegId) => {
    const res = await PrePregistrationService.checkOnline(preRegId).catch(
        async (error) => {
            if (error.response){
                console.error(`Error status ${error.response.status}: `, error.response.data);
            }else if (error.request){
                console.error('No response received from server');
            }else{
                console.error('Error: ', error.message);
            }

            $q.notify({
                type: 'negative',
                message: ERROR_TEXT_NOTIFY_GET_PRE_REG
            })
            return;
        }
    )

    if (res.status != 200){
        $q.notify({
            type: 'negative',
            message: ERROR_TEXT_NOTIFY_GET_PRE_REG
        })
        return;
    }

    return res.data.online

}

/**
 * Получить список пререгистраций
 */
const getPreReg = async () => {
    const res = await PrePregistrationService.getAll().catch(
        async (error) => {
            if (error.response){
                console.error(`Error status ${error.response.status}: `, error.response.data);
            }else if (error.request){
                console.error('No response received from server');
            }else{
                console.error('Error: ', error.message);
            }

            $q.notify({
                type: 'negative',
                message: ERROR_TEXT_NOTIFY_GET_PRE_REG
            })
            return;
        }
    )

    if (res.status != 200){
        $q.notify({
            type: 'negative',
            message: ERROR_TEXT_NOTIFY_GET_PRE_REG
        })
        return;
    }

    for (const pr in res.data){
        if (await preRegCheckOnline(pr.id)){
            preRegList.value.push(
                pr
            )
        }
    }
}



onMounted(async() => {
    await getPreReg()
})

</script>
