import { api } from "src/boot/axios";


const BASE = '/vacancy_response/'


/**
 * Получить отклики с резюме
 * @param {number} resumeId - id резюме
 * @returns 
 */
export async function getVacancyResponses(resumeId){
    const res = await api.get(
        BASE,
        {
            params: {
                resume: resumeId
            }
        }
    )

    return res
}


/**
 * Откликнуться на вакансию
 * @param {number} resumeId 
 * @param {string} vacancyId 
 * @param {string} vacancyUrl 
 * @returns 
 */
export async function addVacancyResponse(
    resumeId,
    vacancyId,
    vacancyUrl
){
    const res = await api.post(
        BASE,
        {
            resume: resumeId,
            vacancy_id: vacancyId,
            vacancy_url: vacancyUrl
        }
    )

    return res
}