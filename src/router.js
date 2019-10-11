import Vue from 'vue'
import Router from 'vue-router'
import Intro from './views/Intro.vue'
import FileList from './views/FileList.vue'
import EditTags from './views/EditTags.vue';

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
    {
      path: '/edit-tags',
      name: 'edit-tags',
      component: EditTags
    },
  ]
})
