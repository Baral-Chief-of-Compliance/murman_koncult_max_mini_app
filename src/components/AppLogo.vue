<template>
    <div class="row q-my-sm" @click="router.push({name: INDEX})">
        <q-img alt="Логотип приложения" src="logo-middle.svg" :style="logoSize"></q-img>
        <div class="column justify-center logo-titel q-ml-xs">
            <div class="text-indigo text-bold text-uppercase main-name">работа<br> России</div>
            <div class="text-blue">Мурманская область</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { INDEX } from 'src/router/pathName';

const router = useRouter()

const logoSize = computed(() => ({
    width: props.width + 'px',
    // height: props.height + 'px'
}))

const props = defineProps({
    width: {
        type: Number,
        default: 70
    },

    height: {
        type: Number,
        default: 100
    }
})

</script>

<style scoped>
    .main-name{
        line-height: 1.1
    }

    .logo-titel{
        font-size: 15px;
    }
</style>