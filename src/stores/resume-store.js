import { defineStore } from "pinia";


export const useResumeStore = defineStore('resumestore', {
    state: () => ({
        resume: []
    }),

    actions: {

        /**
         * Поместить резюме в хранилище
         * @param {array} resume 
         */
        setResume(resume){
            this.resume = resume
        },


        /**
         * Удалить резюме из хранилища
         * @param {number} resumeId 
         */
        deleteResume(resumeId){
            this.resume = this.resume.filter(r => r.id !== resumeId)
        },

        /**
         * Получить resume для select
         */
        getResumeForSelect(){
            let resumeSelect = []
             this.resume.forEach(
                r => resumeSelect.push({
                    id: r.id,
                    name: r.name
                })
            )
            return resumeSelect
        }
    }
})