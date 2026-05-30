import { defineStore } from "pinia";


export const useVacancyResponseStore = defineStore('vacancy-response-store',{
    state: () => ({
        vacancyResponse: []
    }),

    actions: {
        
        /**
         * Поместить отклики в хранилище
         * @param {array} vacancyResponse 
         */
        addVacancyResponse(vacancyResponse){
            this.vacancyResponse.push(vacancyResponse)
        }
    }
})