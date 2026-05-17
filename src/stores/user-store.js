import { defineStore } from "pinia";


export const useUserStore = defineStore('user', {
    state: () => ({
        fromMax: false,
        id: null,
        userName: null,
        firstName: null,
        lastName: null,
        photoUrl: null,
        favoriteVacancies: []
    }),

    actions: {
        /**
         * Установить данные пользователя в store
         * @param {object} userData 
         */
        setUser(userData){
            this.id = userData.id
            this.firstName = userData.first_name
            this.lastName = userData.last_name
            this.userName = userData.username
            this.photoUrl = userData.photo_url
        }
    },

    getters: {
        /**
         * Получить имя пользователя для главной страницы
         * @returns {string}
         */
        getUserName(state){
            if (state.firstName != null && state.lastName != null){
                return state.firstName
            }else{
                if (state.userName != null){
                    return state.userName
                }else{
                    return ''
                }
            }
        },

        /**
         * Получить полное имя с фамилией пользователя
         * @returns {string}
         */
        getFullUserName(state) {
            if (state.firstName != null && state.lastName != null){
                return `${state.firstName} ${state.lastName}`
            }else{
                if (state.userName != null){
                    return state.userName
                }else{
                    return ''
                }
            }
        }
    }
})