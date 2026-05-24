<template>
    <page-container :flex="false">
        <template #content>
            <scroll-area>
                <empty-content v-if="resumeStore.resume.length === 0" />
                <div class="q-mx-md" v-else>

                </div>
            </scroll-area>
        </template>
    </page-container>
</template>

<script setup>
import PageContainer from 'src/components/PageContainer.vue';
import EmptyContent from 'src/components/EmptyContent.vue';
import ScrollArea from 'src/components/ScrollArea.vue';
import { useResumeStore } from 'src/stores/resume-store';

const resumeStore = useResumeStore()

</script>