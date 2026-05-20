import { defineStore } from "pinia";


export const useFavoriteVacancies = defineStore('favorite-vacancie-store', {
    state: () => ({
        favoriteVacancies: [],
        vacanciesId: []
    }),

    actions: {
        /**
         * Поместить вакансии в хранилище
         * @param {array} vacancies 
         */
        setVacancies(vacancies){
            this.favoriteVacancies = vacancies
            this.vacanciesId = []
            this.favoriteVacancies.forEach(v => this.vacanciesId.push(v.vacancy))
        },

        /**
         * Получить id избранной вакансии
         * @param {number} vacancyId 
         * @returns {object}
         */
        getFavoriteVacancieId(vacancyId){
            return this.favoriteVacancies.find(v => v.vacancy === vacancyId)
        }

    }
})