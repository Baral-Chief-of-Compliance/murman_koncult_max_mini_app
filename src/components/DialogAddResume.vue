<template>
    <q-dialog
        ref="dialogRef"
        @hide="onDialogHide"
    >
        <q-card>
            <q-form
                class="q-gutter-md"
                @submit="onDialogOK(toRaw(dataDialog))"
                @reset="onDialogCancel"
            >
            <q-card-section>
                <div class="text-h6">Добавить резюме</div>
                <div class="q-mt-md text-personal-data">При отправке резюме Вы соглашаетесь, что ознакомлены с <a target="_blank" href="https://disk.yandex.ru/i/qEI1KA6BtLV5Sg" class="text-indigo">Политикой конфиденциальности</a> и даете согласие на обработку персональных данных</div>

                <q-input
                    class="q-mt-lg"
                    color="indigo"
                    label="Название резюме"
                    outlined 
                    rounded
                    v-model="dataDialog.name"
                    :rules="[val => (val && val.length > 0) || 'Введите название резюме']"
                >
                </q-input>

                <q-file
                    class="q-mt-md"
                    v-model="dataDialog.file" 
                    label="Резюме"
                    outlined 
                    rounded
                    color="indigo"
                    accept=".pdf, application/pdf"
                    :rules="[
                        val => validFileResume(val)
                    ]"
                />
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
    </q-dialog>
</template>

<script setup>
import { reactive,toRaw } from 'vue';
import { useDialogPluginComponent } from 'quasar';

const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } = useDialogPluginComponent()

defineEmits([
// REQUIRED; need to specify some events that your
// component will emit through useDialogPluginComponent()
...useDialogPluginComponent.emits
])

const dataDialog = reactive({
    name: '',
    file: null
})

async function validFileResume(val){
    if (val !== null && val !== ''){
        if (val.type === 'application/pdf'){
            if (val.size < 60000000){
                return true
            }else{
                return 'Загружаемый файл не должен превышать размер 60 Мб'
            }
        }else{
            return 'Загружаемый файл должен быть расширения (.pdf)'
        }
    }else{
        return 'Прикрипите файл'
    }
}
</script>

<style scoped>

.text-personal-data{
    color: var(--q-dark);
    line-height: 1.25;
    font-weight: 600;
    font-size: 14px;
    word-break: break-word;  
}

</style>