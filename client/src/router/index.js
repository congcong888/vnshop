import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import GoodsList from '@/view/GoodsList'
import IndexList from '@/view/IndexList'
import Cart from '@/view/cart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path:'/index',
      name:'IndexList',
      component:IndexList
    },
    {
      path: '/cart',
      component: Cart
    }
  ]
})
