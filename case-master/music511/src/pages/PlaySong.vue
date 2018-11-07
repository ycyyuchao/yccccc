<template>
  <transition name="playSong">
    <div class="play-song">
      <!-- S 歌曲播放头部 -->
      <div class="header">
          <h1><i @click="back"></i>{{getCurSong.musicData.singer[0].name}}</h1>
          <span>{{getCurSong.musicData.songname}}</span>
      </div>
      <!-- E 歌曲播放头部 -->

      <!-- S 歌曲播放封面-->
      <div class="thumb playing" >
        <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + getCurSong.musicData.albummid +'.jpg?max_age=2592000'">
      </div>
      <!-- E 歌曲播放封面-->

      <!-- S 歌曲播放选择按钮-->
      <div class="opt-btn">
        <a href="javascript:void(0);" class="mode"></a>
        <a href="javascript:void(0);" class="prev" @click="playPrev"></a>
        <a href="javascript:void(0);" class="playPause play" @click="playOrPause()"></a>
        <a href="javascript:void(0);" class="next" @click="playNext"></a>
        <a href="javascript:void(0);" class="like"></a>
      </div>
      <!-- E 歌曲播放选择按钮-->

      <!-- S 歌曲播放背景-->
      <div class="bg-album">
        <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + getCurSong.musicData.albummid +'.jpg?max_age=2592000'">
      </div>
      <!-- E 歌曲播放背景-->
   
    </div>
  </transition>
</template>

<script>
//引入jsonp
import jsonp from 'jsonp';
//引入api接口地址文件
import api from '@/api/songApi';

import {mapGetters,mapMutations} from 'vuex';

export default {
  name: '',
  data(){
    return {
    	smid:'',
    	mid:'',
    	src:''
    }
  },
  computed:{
    ...mapGetters([
      'getCurSong',
      'getPlayState',
      'getPlaySrc',
      'getPlayList',
      'getCurSongIndex'
      
    ])
  },
 created(){
  	//获取路由参数 sid歌曲 mid , 专辑封面 mid
        this.smid = this.$route.params.smid;
        this.mid = this.$route.params.mid;

        this._getSongPlaySrc(this.smid,this.mid)

  },
  methods:{

    //返回上一级目录
      back(){
        this.$router.go(-1);
      },
      //切换暂停播放
      playOrPause(){

        //audio播放
        let audioNode = document.querySelector('.player');
        let thumbNode = document.querySelector('.thumb');
        let btnNode = document.querySelector('.playPause');
        if(!this.getPlayState){//播放
          thumbNode.style.animationPlayState = 'running';//封面旋转
          audioNode.play();
          //播放暂停按钮的切换（播放）
          btnNode.setAttribute('class','playPause play');

        }else{//暂停
          thumbNode.style.animationPlayState = 'paused';//封面暂停
          audioNode.pause();
          //播放暂停按钮的切换(暂停)
          btnNode.setAttribute('class','playPause pause');
        }
        this.setPlayState(!this.getPlayState);
        

      },
      playPrev(){//上一曲
        let curIndex = this.getCurSongIndex;//当前歌曲索引
        let maxIndex = this.getPlayList.length-1;//歌曲列表最大索引

        let prevIndex = curIndex - 1 ;
        prevIndex=(prevIndex >= 0)?prevIndex:maxIndex;
        this.setCurSongIndex(prevIndex);
        this.setCurSong(this.getPlayList[prevIndex]);

        let songData = this.getPlayList[prevIndex].musicData;
        // this.$router.push({path:'/singer/' + songData.songmid + '/' + songData.albummid})
        this._getSongPlaySrc(songData.songmid,songData.albummid);


      },
      playNext(){//下一曲
        let curIndex = this.getCurSongIndex;//当前歌曲索引
        let maxIndex = this.getPlayList.length+1;//歌曲列表最大索引

        let nextIndex = curIndex + 1 ;
        nextIndex=(nextIndex <= maxIndex)?nextIndex:maxIndex;
        this.setCurSongIndex(nextIndex);
        this.setCurSong(this.getPlayList[nextIndex]);

        let songData = this.getPlayList[nextIndex].musicData;
        this._getSongPlaySrc(songData.songmid,songData.albummid);


      },
      _getSongPlaySrc(smid,amid){//获取当前播放地址
        //获取路由参数 sid歌曲 mid , 专辑封面 mid
        this.smid = smid;
        this.mid = amid;

        //1、获取vKey
        var url = api.vKeyApi + `&songmid=${this.smid}&filename=C400${this.smid}.m4a`;
        jsonp(url,{param:'callback'},(err,data)=>{
          let vkey = data.data.items[0].vkey;

          //2、使用 smid和vKey取得歌曲播放地址
          this.src = `http://dl.stream.qqmusic.qq.com/C400${this.smid}.m4a?vkey=${vkey}&guid=7120953682&uin=0&fromtag=66`;

          //3、添加播放地址到vuex
          this.setSrc(this.src);
          // console.log(this.getPlaySrc);
        });
      },
      ...mapMutations({
        'setSrc':'setPlaySrc',
        'setPlayState':'setPlayState',
        'setCurSongIndex':'setCurSongIndex',
        'setCurSong':'setCurSong'
      })
   
    
  }
}
</script>

<style lang="scss" scoped>
.play-song {
  position:relative;
  z-index: 11111;
  width:100%;
  height:100vh;
  overflow-x: hidden;
  transition:all 0.3s cubic-bezier(0.25, 0.1, 0.07, 2.34);
  .header {
    text-align: center;
    color: #fff;
    position: relative;
    z-index: 11222;
    h1{
      font-weight: 400;
      font-size: 22px;
      line-height: 55px;

      i{
        display: inline-block;
        width: 25px;
        height: 25px;
        padding: 15px;
        background: url(../assets/icon/arrow_down.png) no-repeat;
        background-size: 25px 25px;
        background-position: 50%;
        position: absolute;
        left: 0;

      }
    }
    span{
      font-size: 15px;
      text-align: center;
      color: #fff;
      

    }
  }
  .thumb {
    text-align: center;
    margin-top: 15px;
    position: relative;
    z-index: 999;
    animation:playCicle 10s linear infinite;
    @keyframes playCicle{
      0% {
      transform: rotateZ(0deg);
      }
      100% {
      transform: rotateZ(1turn);
      }
    }
    img{
      width: 250px;
      height: 250px;
      border-radius: 50%;
      border: 10px solid #000;
    }
  }
  .opt-btn {
    display: flex;
    position: fixed;
    z-index: 999;
    bottom: 50px;
    width: 100%;
    justify-content: space-around;
    a{
      width:30px;
      height:30px;
    }

    .mode {
      background:url(../assets/icon/mode.png) no-repeat;
      background-size: 30px 30px;
    }
    .prev {
      background:url(../assets/icon/prev.png) no-repeat;
      background-size: 30px 30px;
    }
    .pause {
      background:url(../assets/icon/play.png) no-repeat;
      background-size: 30px 30px;
    }
    .next {
      background:url(../assets/icon/next.png) no-repeat;
      background-size: 30px 30px;
    }
    .like {
      background:url(../assets/icon/like.png) no-repeat;
      background-size: 30px 30px;
    }
    .play {
      background:url(../assets/icon/pause.png) no-repeat;
      background-size: 30px 30px;
    }

  }
  .bg-album {
    background: #000;
    height: 100vh;
    position: fixed;
    top: 0;
    width: 100%;
    transform-origin: center center;
    img {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
    }
  }
  .audio {

  }

}


.header,.opt-btn{
  transition: all .2s cubic-bezier(0, 0.48, 0.32, 1.31) .15s;
}
.thumb{
  transition: all .3s cubic-bezier(.68,.44,.32,.71);
  img{
    transition: all .3s cubic-bezier(.68,.44,.32,.71);
  }
}


.playSong-enter-active{
  .header{
    top:0;
  }
  .thumb{
    left:0;
    top:0;
    img{
      width:250px;
      height:250px;
    }
  }
  .opt-btn{
    bottom:30px;
  }
}



.playsong-enter{
  .header{
    top:-80px;
  }
  .thumb{
    left:-100px;
    top:400px;
    img{
      width:45px;
      height:45px;
    }
  }
  
  .opt-btn{
    bottom:-30px;
  }
}


</style>