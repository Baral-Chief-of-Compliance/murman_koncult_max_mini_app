import { VACANCIES, DISTRICTS, FAVORITE, INDEX } from './pathName'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: INDEX},
      { path: DISTRICTS, component: () => import('pages/DistrictsPage.vue'), name: DISTRICTS},
      { path: VACANCIES, component: () => import('pages/VacanciesPage.vue'), name: VACANCIES},
      { path: FAVORITE, component: () => import('pages/FavoritePage.vue'), name: FAVORITE}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue')}
]

export default routes
