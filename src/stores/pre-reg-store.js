import { defineStore } from "pinia";


export const usePreRegStore = defineStore('prereg', {
    state: () => ({
        id: null,
        name: null,
        address: null
    }),

    actions: {

        /**
         * Установить выбранную пререгистрацию
         * @param {number} id 
         * @param {string} name 
         * @param {string} address 
         */
        setPreReg(id, name, address){
            this.id = id;
            this.name = name;
            this.address = address;
        }
    }
})
