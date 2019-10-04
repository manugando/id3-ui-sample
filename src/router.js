import Vue from 'vue'
import Router from 'vue-router'
import Intro from './views/Intro.vue'
import FileList from './views/FileList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro
    },
    {
      path: '/file-list',
      name: 'file-list',
      component: FileList
    },
  ]
})
