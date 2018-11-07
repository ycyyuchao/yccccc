import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/Index'
import Singer from '@/pages/Singer'
import SingerDetail from '@/pages/SingerDetail'
import PlaySong from '@/pages/PlaySong'
import Search from '@/pages/Search'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/Index',
      component: Index
    },
    {
      path: '/Singer',
      component: Singer
    },
    {
      path: '/Search',
      component: Search
    },
    {
      path: '/Singer/:sid',
      component: SingerDetail
    },
    {
      path: '/Singer/:smid/:mid',
      component: PlaySong
    }
  ]
})
