<template>
    <q-dialog
        ref="dialogRef"
        @hide="onDialogHide"
    >
        <q-card v-if="resumeStore.resume.length > 0">
            <q-form
                class="q-gutter-md"
                @submit="onDialogOK(selectResume)"
                @reset="onDialogCancel"
            >
                <q-card-section>
                    <div class="text-h6">Откликнуться на «{{props.name}}»</div>

                    <div class="q-mt-md ">
                        
                        <q-select
                            outlined 
                            rounded
                            label="Ваше резюме"
                            v-model="selectResume"
                            :options="resumeStore.getResumeForSelect()"
                            option-value="id"
                            option-label="name"
                            option-disable="inactive"
                            emit-value
                            map-options
                            :rules="[
                                val => val != null || 'Выберите резюме'
                            ]"
                        />
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn 
                        class="q-mr-xs"
                        outlined
                        unelevated
                        rounded
                        no-caps
                        color="indigo"
                        label="Откликнуться"
                        type="submit"
                    >
                    </q-btn>

                    <q-btn 
                        outlined
                        unelevated
                        no-caps
                        rounded
                        color="grey-6"
                        label="Отмена"
                        type="reset"
                    >
                    </q-btn>
                </q-card-actions>
            </q-form>
        </q-card>

        <q-card v-else>
            <q-card-section>
                <div class="text-h6">У Вас нет резюме</div>
                <div class="q-mt-md text-personal-data">
                    Чтобы откликнуться на данную вакансию, Вам необходимо добавить резюме.
                </div>
            </q-card-section>
            
            <q-card-actions align="right">
                <q-btn 
                    class="q-mr-xs"
                    outlined
                    unelevated
                    rounded
                    no-caps
                    color="indigo"
                    label="Добавить"
                    @click="router.push({name: RESUME})"
                >
                </q-btn>

                <q-btn 
                    outlined
                    unelevated
                    no-caps
                    rounded
                    color="grey-6"
                    label="Отмена"
                    @click="onDialogCancel"
                >
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
// import { reactive,toRaw } from 'vue';
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useResumeStore } from 'src/stores/resume-store';

import { useRouter } from 'vue-router';
import { RESUME } from 'src/router/pathName';

const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } = useDialogPluginComponent()
const router = useRouter()

const resumeStore = useResumeStore()

const selectResume = ref(null)

defineEmits([
// REQUIRED; need to specify some events that your
// component will emit through useDialogPluginComponent()
...useDialogPluginComponent.emits
])


const props = defineProps({
    name: {
        type: String,
        default: 'Наименование'
    }
})

</script>