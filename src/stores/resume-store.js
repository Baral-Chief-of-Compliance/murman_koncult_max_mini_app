import { defineStore } from "pinia";


export const useResumeStore = defineStore('resumestore', {
    state: () => ({
        resume: []
    })
})