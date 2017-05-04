import Vue from 'vue'
import Router from 'vue-router'
import demo from '../components/demo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo',
      component: demo
    }
  ]
})
