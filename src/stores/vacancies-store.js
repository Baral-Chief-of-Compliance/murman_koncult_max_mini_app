import { defineStore } from "pinia";


export const VACANCY_SORT = [
    {
        name: 'По названию: А-Я',
        value: 'vacancyName'
    },
    {
        name: 'По названию: Я-А',
        value: '-vacancyName'
    },
    {
        name: 'По максимальной заработной плате: ↑ (возрастание)',
        value: 'salaryMax'
    },
    {
        name: 'По максимальной заработной плате: ↓ (убывание)',
        value: '-salaryMax'
    },
    {
        name: 'По минимальной заработной плате: ↑ (возрастание)',
        value: 'salaryMin'
    },
    {
        name: 'По минимальной заработной плате: ↓ (убывание)',
        value: '-salaryMin'
    },
]

export const useVacancies = defineStore('vacancies', {
    state: () => ({
        currentPage: 1,
        vacancies: [],

        loading: true,
        sortBy: null, //Сортировка для поиска,
        vacancySearchName: '' //Наименование для поиска
    }),

    actions: {
        /**
         * Выбрать параметр соритровки
         * @param {string} value 
         */
        selectSortValue(value){
            const findSortingValue = VACANCY_SORT.find(vs => vs.value === value)

            if (findSortingValue !== null){
                if (findSortingValue.value === this.sortBy){
                    this.sortBy = null
                }else{
                    this.sortBy = findSortingValue.value
                }
            }
        }
    },

    getters: {
        /**
         * Получить статус сортировки
         * @returns {boolean}
         */
        getStatusSort(state){
            if (state.sortBy != null){
                return true
            }else{
                return false
            }
        }
    }
})