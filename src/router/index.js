import Vue from 'vue'
import Router from 'vue-router'
import UploadPage from '@/components/UploadPage'
import TestingPage from '@/components/TestingPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UploadPage',
      component: UploadPage
    },
    {
      path: '/testing',
      name: 'TestingPage',
      component: TestingPage
    }
  ]
})
