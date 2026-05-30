import { api } from "src/boot/axios";


const BASE = `/resume/`
/**
 * Получить резюме пользователя
 * @param {number} userId - id пользователя
 * @returns {object}
 */
export async function getResumes(userId){

    const res = await api.get(
        BASE,
        {
            params: {
                user: userId,
                ordering: "-date"
            }
        }
    )

    return res
}


/**
 * Добавить резюме пользователя
 * @param {number} userId 
 * @param {string} resumeName 
 * @param {file} resumeFile 
 * @returns {object}
 */
export async function addResume(userId, resumeName, resumeFile){
    const res = await api.post(
        BASE,
        {
            user: userId,
            name: resumeName,
            file: resumeFile
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )

    return res
}


/**
 * Удалить резюме пользователя
 * @param {number} id 
 * @returns 
 */
export async function deleteResume(id){
    const res = await api.delete(
        BASE + id + '/'
    )

    return res
}