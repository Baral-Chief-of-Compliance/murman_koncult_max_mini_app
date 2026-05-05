import { defineStore } from "pinia";

export const useDistircts = defineStore('districts', {
    state: () =>({
        districts: [],
        districtId: null,
        districtName: null,
        districtMinCode: null,
        districtMaxCode: null,
        workPlaces: 0
    }),
    actions: {
        /**
         * Установка хранилища районов кадрового центра
         * @param {array} data 
         */
        setStore(data){
            this.districts = data
        },

        /**
         * Сброс параметров выбранного района
         */
        resetStore(){
            this.districtId = null
            this.districtName = null
            this.districtMinCode = null
            this.districtMaxCode = null
            this.workPlaces = 0
        }
    },
    getters: {
        /**
         * Получить наименование активного района 
         * @param {object} state 
         * @returns {string}
         */
        getName(state){
            if (state.districtName != null){
                return state.districtName
            }else{
                return 'Наименование района'
            }
        }
    }

})