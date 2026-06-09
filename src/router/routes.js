import { VACANCIES, DISTRICTS, FAVORITE, INDEX,
  DISTRICTS_DETAIL, NOT_FOUND, SERVER_ERROR, RESUME,
  PRE_REG, PRE_REG_DETAIL
} from './pathName'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), name: INDEX},
      { path: DISTRICTS, component: () => import('pages/DistrictsPage.vue'), name: DISTRICTS},
      { path: DISTRICTS + '/:id(\\d+)', component: () => import('pages/DistrictsDetailPage.vue'), name: DISTRICTS_DETAIL},
      { path: VACANCIES, component: () => import('pages/VacanciesPage.vue'), name: VACANCIES},
      { path: FAVORITE, component: () => import('pages/FavoritePage.vue'), name: FAVORITE},
      { path: RESUME, component: () => import('pages/ResumePage.vue'), name: RESUME},
      { path: PRE_REG, component: () => import('pages/PreRegPage.vue'), name: PRE_REG},
      { path: PRE_REG + '/:id(\\d+)', component: () => import('pages/PreRegDetailPage.vue'), name: PRE_REG_DETAIL}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  { path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue'), name: NOT_FOUND},
  { path: '/server-error', component: () => import('pages/ErrorServerPage.vue'), name: SERVER_ERROR}
]

export default routes
