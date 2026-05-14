<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-primary" ref="headerRef">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <app-logo />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Разделы
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <footer-component ref="footerRef" />

    <q-page-container class="bg-grey-1">
      <meta-info />
      <bread-crumbs-panel ref="breadCrumbRef" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'

import EssentialLink from 'components/EssentialLink.vue'
import FooterComponent from 'src/components/FooterComponent.vue'
import AppLogo from 'src/components/AppLogo.vue'
import BreadCrumbsPanel from 'src/components/BreadCrumbsPanel.vue'
import { VACANCIES, DISTRICTS, FAVORITE } from 'src/router/pathName'
import MetaInfo from 'src/components/MetaInfo.vue'
import { useElementSize } from '@vueuse/core'
import { useUserStore } from 'src/stores/user-store'


const footerRef = ref(null)
const headerRef = ref(null)
const breadCrumbRef = ref(null)
const {height: footerHeight} = useElementSize(footerRef)
const {height: headerHeight} = useElementSize(headerRef) 
const {height: breadCrumbHeight} = useElementSize(breadCrumbRef)
provide('footerHeight', footerHeight)
provide('headerHeight', headerHeight)
provide('breadCrumbHeight', breadCrumbHeight)


const userStore = useUserStore()

const linksList = [
  {
    title: 'Районы',
    caption: 'Выберите район поиска',
    icon: 'location_on',
    to: {name: DISTRICTS}
  },
  {
    title: 'Вакансии',
    caption: 'Все вакансии в области',
    icon: 'engineering',
    to: {name: VACANCIES}
  },
  {
    title: 'Избранное',
    caption: 'Ваши выбранные вакансии',
    icon: 'star',
    to: { name: FAVORITE}
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(() => {
  if (Object.keys(window.WebApp.initDataUnsafe).length !== 0){
    const initData = window.WebApp.initDataUnsafe
    userStore.fromMax = true
    userStore.id = initData.user.id
    userStore.userName = initData.user.username
    userStore.firstName = initData.user.first_name
    userStore.lastName = initData.user.last_name
    userStore.photoUrl = initData.user.photo_url
  }
})
</script>
