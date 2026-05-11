<template>
    <page-container
        :flex="false"
    >
        <template #content>
            <loading-component v-if="loading" :loading="loading"/>
            <scroll-page
                v-else
            >
                <div class="q-mx-md">
                    <district-card 
                        v-for="d in districtStore.districts"
                        v-bind="d"
                        v-bind:key="d.id"
                    />
                </div>
            </scroll-page>
        </template>
    </page-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import LoadingComponent from 'src/components/LoadingComponent.vue';
import { useDistircts } from 'src/stores/districts-store';
import { getDistricts } from 'src/axios/districts';
import DistrictCard from 'src/components/DistrictCard.vue';
import { useMetaStore } from 'src/stores/meta-store';
import ScrollPage from 'src/components/ScrollPage.vue';
import PageContainer from 'src/components/PageContainer.vue';


const loading = ref(true)


const districtStore = useDistircts()
const metaStore = useMetaStore()

onMounted(async() => {
    metaStore.setTitel('Районы')
    
    const res = await getDistricts()

    if (res.status !== 200){
        return;
    }

    districtStore.setStore(res.data)
    loading.value = false

})

</script>