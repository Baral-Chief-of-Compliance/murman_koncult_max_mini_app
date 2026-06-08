<template>
    <page-container :flex="false">
        <template #content>
            <scroll-area
                :height="scrollAreaHeight"
            >
                <empty-content v-if="resumeStore.resume.length === 0" />
                <div class="q-mx-md" v-else>
                    <resume-card 
                        v-for="r in resumeStore.resume"
                        v-bind:key="r.id"
                        :id="r.id"
                        :name="r.name"
                        :date="r.date"
                    />
                </div>
            </scroll-area>
            <div class="q-mx-md q-mt-md">
                <q-btn
                    @click="showDialogAddResume"
                    icon="add"
                    size="md"
                    unelevated
                    rounded
                    no-caps
                    class="text-white full-width"
                    color="indigo"
                    label="Добавить резюме" 
                />
            </div>

        </template>
    </page-container>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { inject, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

import PageContainer from 'src/components/PageContainer.vue';
import EmptyContent from 'src/components/EmptyContent.vue';
import ScrollArea from 'src/components/ScrollArea.vue';
import { useResumeStore } from 'src/stores/resume-store';
import ResumeCard from 'src/components/ResumeCard.vue';
import DialogAddResume from 'src/components/DialogAddResume.vue';
import { addResume } from 'src/axios/resume';
import { useUserStore } from 'src/stores/user-store';

const resumeStore = useResumeStore()
const userStore = useUserStore()

const $q = useQuasar()

const showDialogAddResume = () =>{
    $q.dialog({
        component: DialogAddResume
    }).onOk(async (data) => {

        const res = await addResume(
            userStore.id,
            data.name,
            data.file
        ).catch(
            async (error) => {
                if (error.response){
                    console.error(`Error ${error.response.status}:`, error.response.data);
                }else if (error.request) {
                    // Request was made but no response received
                    console.error('No response received from server');
                } else {
                    // Something happened in setting up the request
                    console.error('Error:', error.message);
                }
                $q.notify({
                    type: 'negative',
                    message: `Произошла ошибка при добавлении резюме`
                });
            }
        )

        if (res.status != 201){
            $q.notify({
                type: 'negative',
                message: `Произошла ошибка при добавлении резюме`
            });
            return;
        }

        $q.notify({
            type: 'positive',
            message: `Резюме ${data.name} добавлен`
        })

        resumeStore.resume.unshift(
            {
                id: res.data.id,
                name: res.data.name,
                date: res.data.date
            }
        )
    })
}

const footerHeight = inject('footerHeight')
const headerHeight = inject('headerHeight')
const breadCrumbHeight = inject('breadCrumbHeight')

const {height: windowHeight} = useWindowSize()

const scrollAreaHeight = computed(() => {
    return (windowHeight.value - (footerHeight.value + headerHeight.value + breadCrumbHeight.value + 100)) + 'px'
})

</script>