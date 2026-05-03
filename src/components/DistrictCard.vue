<template>
    <q-card  
        :style="cardStyle"
        class="q-mb-sm"
    >
        <q-card-section>
            <div class="row">
                <div class="col district_card_label">{{ props.name }}</div>
                <div class="col district_card_vacancy_count"><b class="q-mr-sm">{{ props.count_vacansy }}</b> рабочих мест</div>
            </div>
            
        </q-card-section>

        <q-card-actions align="right">
            <q-btn icon="visibility" label="К вакансиям"  unelevated rounded no-caps class="text-white" color="blue" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { computed } from 'vue';

const cardStyle = computed(() => ({
    borderRadius: '10px !important'
}))

const props = defineProps({
    id: {
        type: Number,
        default: 0
    },

    name: {
        type: String,
        default: 'Наименование района'
    },

    min_code: {
        type: Number,
        default: 0
    },

    max_code: {
        type: Number,
        default: 100
    },

    count_vacansy: {
        type: Number,
        default: 100
    }
})
</script>

<style scoped>
    .district_card_label {
        color: var(--q-dark);
        line-height: 1.25;
        font-weight: 600;
        font-size: 16px;
        word-break: break-word;
    }

    .district_card_vacancy_count{
        font-size: 16px;
        line-height: 1.5;
        color: var(--q-dark);
    }
</style>