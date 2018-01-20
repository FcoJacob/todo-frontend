import Vue from 'vue'
import Router from 'vue-router'
import TasksList from '@/components/TasksList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TasksList',
      component: TasksList
    }
  ]
})
