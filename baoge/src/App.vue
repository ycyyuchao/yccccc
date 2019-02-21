<template>
  <div>
    <headers></headers>  
    <router-view></router-view>
    <footers></footers>
  </div>
</template>

<script>
import headers from './components/public/header';
import footers from './components/public/footer'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    headers,
    footers
  },
  mounted() {
     this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
    })
  },
}
</script>