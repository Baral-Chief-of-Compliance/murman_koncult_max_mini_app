import { defineStore } from "pinia";

export const useVacancies = defineStore('vacancies', {
    state: () => ({
        currentPage: 1,
        vacancies: []
    })
})