<template>
    <q-page :style="{minHeight: scrollAreaHeight}">
        <loading-component v-if="loading" :loading="loading"/>
        <scroll-area
            v-else
            :height="scrollAreaHeight"
        >
            <div class="q-mx-md">
                <district-card 
                    v-for="d in districtStore.districts"
                    v-bind="d"
                    v-bind:key="d.id"
                />
            </div>
        </scroll-area>
    </q-page>
</template>

<script setup>
import { onMounted, ref, inject, computed } from 'vue';

import LoadingComponent from 'src/components/LoadingComponent.vue';
import { useDistircts } from 'src/stores/districts-store';
import { getDistricts } from 'src/axios/districts';
import DistrictCard from 'src/components/DistrictCard.vue';
import ScrollArea from 'src/components/ScrollArea.vue';
import { useWindowSize } from '@vueuse/core';

const loading = ref(true)

const footerHeight = inject('footerHeight')
const headerHeight = inject('headerHeight')
const breadCrumbHeight = inject('breadCrumbHeight')

const districtStore = useDistircts()

const {height: windowHeight} = useWindowSize()

const scrollAreaHeight = computed(() => {
    return (windowHeight.value - (footerHeight.value + headerHeight.value + breadCrumbHeight.value + 30)) + 'px'
})

onMounted(async() => {
    const res = await getDistricts()

    if (res.status !== 200){
        return;
    }

    districtStore.setStore(res.data)
    loading.value = false

})

</script>