<template>
	<div class="mini-player" @click="showPlayStage()">
		<!-- S 歌曲封面 -->
	   	<div class="thumb playing">
	   		<img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+ getCurSong.musicData.albummid +'.jpg'">
	   	</div>
	   	<!-- E 歌曲封面 -->

	   	<div class="song-info">
	   		<h3 v-text="getCurSong.musicData.songname"></h3>
	   		<span v-text="getCurSong.musicData.singer[0].name"></span>
	   	</div>
 
	   	<div class="song-operator">
	   		<a href="javascript:" class="play-paused pause"  @click.stop="playOrPause()"></a>
	   		<a href="javascript:" class="btn-songList" @click.stop="showSongLis"></a>
	   	</div>


		<!-- S 播放 -->
	    <div class="audio">
	      <audio class="player" :src="getPlaySrc" autoplay="autoplay"></audio>
	    </div>
	    <!-- E 播放 -->
		
		<!-- S 弹出层列表信息 -->
	    <SongList :showState="slState" @closesonglist="closeSongList()"></SongList>
		<!-- E 弹出层列表信息 -->

	</div>
</template>

<script>
//载入播放列表SongList
import SongList from '@/components/SongList';

import {mapGetters,mapMutations} from 'vuex';

	export default {
		data(){
			return {
				//歌曲列表弹出层状态
				slState:false

			}

		},
  		computed:{
		    ...mapGetters([
		      'getPlaySrc',
		      'getCurSong',
       		  'getPlayState'
		    ])
  		},
  		methods:{
  			playOrPause(){
		      //audio实现播放与暂停
		      let audioNode = document.querySelector(".player");
		      let albumNode = document.querySelector(".thumb.playing");
		      let opBtnNode = document.querySelector(".play-paused");
		      if(!this.getPlayState){ //播放
		        albumNode.style.animationPlayState = 'running';
		        audioNode.play();
		        opBtnNode.setAttribute('class','play-paused pause');
		      }else{ //暂停
		        albumNode.style.animationPlayState = 'paused';
		        audioNode.pause();
		        opBtnNode.setAttribute('class','play-paused play');
		      }

		      this.setPlayState(!this.getPlayState);
		    },
		    showSongLis(){//控制播放列表弹出层的显示
		    	this.slState = true;

		    },
		    closeSongList(){//控制播放列表弹出层的隐藏
		    	this.slState = false;
		    },
		    showPlayStage(){//点击迷你播放器跳转到当前播放界面
		    	let song = this.getCurSong;

		    	//编程式导航
		    	this.$nextTick(()=>{
		    		this.$router.push({path:'/singer/' + song.musicData.songmid +'/'+ song.musicData.albummid});
		    	})
		    	
		    },
		    ...mapMutations({
		      'setSrc':'setPlaySrc',
		      'setPlayState':'setPlayState'
		    })
		},
		components:{
			SongList
		
		}

	}
	
</script>

<style lang="scss" scoped>
.mini-player{
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  z-index: 1010;
  background: #101010;
  display: flex;
  align-items: center;
  padding-left:18px;
  box-sizing: border-box;
  
  .thumb{
    &.playing{
      animation:playCicle 5s linear infinite;
    }
  	img{
  		width:45px;
  		height:45px;
  		border-radius: 50%;
  	}
  }
  .song-info{
  	flex:1;
  	margin-left:16px;
    overflow: hidden;
  	h3{
  		color: #fff;
  		font-size:16px;
  		font-weight: 400;
      overflow: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
  	}
  	span{
  		color: #ccc;
  		font-size:12px;
  	}
  }
  .song-operator{
  	margin-right:10px;
  	.play-paused,.btn-songList{
		width:30px;
		height:30px;	
		display: inline-block;
  	}
    .play-paused{
      margin-right:16px;
    }
  	.play{
  		background:url(../assets/icon/play.png) no-repeat;
  		background-size:100% 100%;
  	}
    .pause{
    	background:url(../assets/icon/pause.png) no-repeat;
     
      background-size:100% 100%;
    }
  	.btn-songList{
		background:url(../assets/icon/list.png) no-repeat;
  		background-size:100% 100%;
  	}
  }
}

@keyframes playCicle{
  from{
    transform:rotateZ(0deg);
  }
  to{
    transform:rotateZ(360deg);
  }
}
</style>