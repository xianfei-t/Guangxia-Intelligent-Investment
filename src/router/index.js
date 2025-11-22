import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Home from '../views/Home.vue'
import AllProjects from '../views/AllProjects.vue'
import CompanyDetail from '../views/CompanyDetail.vue'
import CompanyManagement from '../views/CompanyManagement.vue'
import DocumentsAndFavorites from '../views/DocumentsAndFavorites.vue'
import Profile from '../views/Profile.vue'
import VideoPlayer from '../views/VideoPlayer.vue'
import IndustryOverview from '../views/IndustryOverview.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Home
  },
  {
    path: '/all-projects',
    name: 'AllProjects',
    component: AllProjects
  },
  {
    path: '/company/:id',
    name: 'CompanyDetail',
    component: CompanyDetail
  },
  {
    path: '/company-management',
    name: 'CompanyManagement',
    component: CompanyManagement
  },
  {
    path: '/documents-and-favorites',
    name: 'DocumentsAndFavorites',
    component: DocumentsAndFavorites
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/video-player',
    name: 'VideoPlayer',
    component: VideoPlayer
  },
  {
    path: '/industry-overview',
    name: 'IndustryOverview',
    component: IndustryOverview
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


