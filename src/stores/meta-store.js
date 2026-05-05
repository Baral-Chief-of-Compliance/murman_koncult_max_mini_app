import { defineStore } from "pinia";


export const useMetaStore = defineStore('metaStore', {
    state: () =>({
        titel: 'Главная'
    }),

    actions: {
        /**
         * Установка наименование сайта
         * @param {string} titel 
         */
        setTitel(titel){
            this.titel = titel
        }
    }
})