<template>
    <page-container :flex="false">
        <template #content>
            <scroll-area>
                <empty-content v-if="resumeStore.resume.length === 0" />
                <div class="q-mx-md" v-else>
                    <resume-card 
                        v-for="r in resumeStore.resume"
                        v-bind:key="r.id"
                        :name="r.name"
                        :file="r.file"
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

import PageContainer from 'src/components/PageContainer.vue';
import EmptyContent from 'src/components/EmptyContent.vue';
import ScrollArea from 'src/components/ScrollArea.vue';
import { useResumeStore } from 'src/stores/resume-store';
import ResumeCard from 'src/components/ResumeCard.vue';
import DialogAddResume from 'src/components/DialogAddResume.vue';

const resumeStore = useResumeStore()

const $q = useQuasar()

const showDialogAddResume = () =>{
    $q.dialog({
        component: DialogAddResume
    }).onOk(() => {
        console.log('Отправить резюме')
    })
}

</script>