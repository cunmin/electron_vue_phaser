import Vue from 'vue'
import Router from 'vue-router'
import Leaderboard from '../components/Leaderboard';
import Game from '../components/Game';
import Vueapp from '../components/App';
import PetGameC from '../components/PetGameC';
import Goods from '../common/goods';

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      name: 'game',
      component: Game
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard,
      children: [
        // {path: 'leaderboard',name: 'leaderboard', component: Leaderboard},
        { path: 'goods',name: 'goods' ,component: Goods },
      ]
    },
    {
      path: '/PetGameC',
      name: 'PetGameC',
      component: PetGameC
    },
    {
      path: '/vueapp',
      name: 'vueapp',
      component: Vueapp
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
