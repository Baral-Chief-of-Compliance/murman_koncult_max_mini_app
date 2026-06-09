import { apiPreReg } from "src/boot/axiosPreReg";


class PrePregistrationService{

    /**
     * Получить все Электронные очереди для перергистрации
     */
    async getAll(){
        const res = await apiPreReg.get('/')

        return res
    }


    /**
     * Получить очередь перегистрации по её id
     * @param {number} preRegId 
     * @returns 
     */
    async get(preRegId){
        const res = await apiPreReg.get(`/${preRegId}/`)

        return res
    }

    /**
     * Проверить находиться ли очередь в онлайн статусе
     * @param {number} preRegId 
     * @returns 
     */
    async checkOnline(preRegId){
        const res = await apiPreReg.get(`/${preRegId}/online/`)
        
        return res
    }


    /**
     * Получить свободные даты для записи
     * @param {number} preRegId 
     */
    async getAvailableDates(preRegId){
        const res = await apiPreReg.get(`/${preRegId}/get_available_dates/`)
        return res        
    }


    /**
     * Записаться
     * @param {number} preRegId 
     * @param {string} selectDateTime 
     * @returns 
     */
    async makeRecord(preRegId, selectDateTime){
        const res = await apiPreReg.post(`/${preRegId}/make_record/`)
        return res
    }
}


export default new PrePregistrationService();
