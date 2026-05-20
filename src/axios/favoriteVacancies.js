import { api } from "src/boot/axios";


/**
 * Добавить вакансию в избранное
 * @param {number} vacancieId 
 * @param {number} userId 
 * @returns 
 */
export async function addToFavoriteVacancie(
    vacancieId,
    userId
){
    const res = await api.post(
        '/favorite_vacancies/',
        {
            user: userId,
            vacancy: vacancieId
        }
    )

    return res
}


/**
 * Удалить избранную вакансию
 * @param {number} favoriteVacancieId 
 * @returns 
 */
export async function deleteFavoriteVacancie(
    favoriteVacancieId
){
    const res = await api.delete(
        `/favorite_vacancies/${favoriteVacancieId}/`
    )

    return res
}

/**
 * Получить избранные вакансии пользователя
 * @param {number} userId 
 * @returns {object}
 */
export async function getFavoriteVacancies(userId){
    const res = await api.get(
        '/favorite_vacancies/',
        {
            params: {
                user: userId
            }
        }
    )

    return res
}