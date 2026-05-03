<template>
    <q-page>
        {{ footerHeight }}
        {{ headerHeight }}
        {{ breadCrumbHeight }}
        <loading-component v-if="loading" :loading="loading"/>
        <scroll-area
            v-else
        >
            <div >
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
import { onMounted, ref, inject } from 'vue';

import LoadingComponent from 'src/components/LoadingComponent.vue';
import { useDistircts } from 'src/stores/districts-store';
import { getDistricts } from 'src/axios/districts';
import DistrictCard from 'src/components/DistrictCard.vue';
import ScrollArea from 'src/components/ScrollArea.vue';

const loading = ref(true)

const footerHeight = inject('footerHeight')
const headerHeight = inject('headerHeight')
const breadCrumbHeight = inject('breadCrumbHeight')

const districtStore = useDistircts()

onMounted(async() => {
    const res = await getDistricts()

    if (res.status !== 200){
        return;
    }

    districtStore.setStore(res.data)
    loading.value = false

})

</script>