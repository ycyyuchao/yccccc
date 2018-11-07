 <template>
  <div id="app">
    <router-view/>
    <MiniPlayer></MiniPlayer>
  </div>
</template>

<script>
//载入mini-player
import MiniPlayer from '@/components/MiniPlayer'; 
export default {
  name: 'App',
  components:{
    MiniPlayer
  }
}
</script>

<style lang="scss">
body{
  margin:0;
  padding:0;
  background:#060506;
  overflow-x: hidden;
}
a{
  text-decoration:none;
  -weblit-tap-highlight-color:transparent;//取消点击高亮
}
ul {
  list-style:none;
  padding:0;
}
h1,h2,h3,h4,h5,h6{
  margin:0;
  padding:0;
}
</style> 