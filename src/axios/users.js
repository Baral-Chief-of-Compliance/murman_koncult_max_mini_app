import { api } from "src/boot/axios";


/**
 * Получить пользователя
 * @param {number} userId 
 * @returns 
 */
export async function getUser(userId){

    const res = await api.get(
        `/user_from_max_mini_app/${userId}/`
    )

    return res
    
}

export async function addUser(userId){
    const res = await api.post(
        '/user_from_max_mini_app/',
        {
            id: userId
        }
    )

    return res
}