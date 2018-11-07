<template>
	<div class="index">

		<!-- S 头部logo跟导航栏 -->
		<HeaderTab></HeaderTab>
		<!-- E 头部logo跟导航栏 -->

		<div class="index-wrapper">
			<div class="content">
				<!-- S 轮播图 -->
				<div class="sliders">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(s,i) in slider" :key="i">
								<img :src="s.picUrl">
							</div>
						</div>
						
						<!-- S 翻页 -->
						<div class="swiper-pagination">
							
						</div>
						<!-- E 翻页 -->
					</div>
				</div>
				<!-- E 轮播图 -->

				<!-- S 歌曲排行榜帮 -->
				<div class="top-list">
					<h2>歌曲排行榜</h2>
					<div class="song-content">
						<ul>
							<router-link tag="div" :to="'/singer/'+ song.data.songmid +'/'+ song.data.albummid" v-for="(song,k) in topList" :key="song.data.songid" @click.native="addSong(song)" >
								<li > 
									<div class="thumb">
										<img v-lazy="'https://y.gtimg.cn/music/photo_new/T002R90x90M000'+
			song.data.albummid +'.jpg?max_age=2592000'">
									</div>
									<div class="song-info">
										<h3 v-text="song.data.songname"></h3>
										<span>{{song.data.singer[0].name}}</span>
									</div>
									<div class="play-time">{{song.data.interval |  getTime}}</div>
								</li>
							</router-link> 
						</ul>
					</div>

				</div>

		<!-- E 歌曲排行榜帮 -->
			</div>
		</div>
		<!-- S Loading组件 -->
		<Loading :title="'加载中...'" :state="loadingState"></Loading>
		<!-- E Loading组件 -->
	</div>
</template>

<script>
//导入头部组件HeaderTab
import HeaderTab from '@/components/HeaderTab.vue';
//载入loading组件
import Loading from '@/components/base/loading/Loading';

//导入轮播图插件swiper
import Swiper from 'swiper';
//导入swiper的样式
import 'swiper/dist/css/swiper.min.css';

//引入jsonp
import jsonp from 'jsonp';

//导入api接口地址文件
import api from '@/api/indexApi.js';

//引入better-scroll插件
import BScroll from 'better-scroll';

import {mapGetters,mapMutations} from 'vuex';



export default {

	data(){
		return {
			slider:[],//轮播获取
			topList:[],//歌曲获取
			scroll:null,
			loadingState:true
		}

	},
	computed:{
		...mapGetters([
			'getPlayList'
		])
	},
	mounted:function(){
		//轮播图
		this._getSlider();
		this._getTopList();

		//实例化better-scroll
		this.$nextTick(function(){
			this.scroll = new BScroll('.index-wrapper',{
				click:true,
				pullUpLoad:{
					threshold:50
				}

			});
			this.scroll.on('pullingUp',()=>{
				this.loadingState = true;
				this._getTopList();
				this.scroll.finishPullUp();
				this.scroll.refresh();
			});
		});
		
	},
	methods:{
		
		_getSlider(){//轮播图
			jsonp(api.bannerApi,{param:'jsonpCallback'},(err,data)=>{
				this.slider = data.data.slider;
				this.$nextTick(function(){
					let mySwiper = new Swiper('.swiper-container',{
						pagination:{//小图标翻页
							el:'.swiper-pagination',
							type:'bullets',
							bulletClass:'bullet',
							bulletActiveClass:'bullet-active'

						}
						
					});
				});
			
			});
		},
		addSong(song){//添加歌曲
		      song = {musicData:song.data};
		      this.setCurSong(song);
		      
		    
		      //防止重复添加
		      let listArr = this.getPlayList;
		      let numFlag = 0;
		      listArr.forEach((item,i)=>{
		        if(song.musicData.songid == item.musicData.songid){
		          numFlag++;
		          this.setCurSongIndex(i);
		        }
		      });


		      if(numFlag <= 0){
		        this.setCurSongIndex(listArr.length);
		        this.setPlayList(song);

		      }
		      
		},

		_getTopList(){//调取歌曲信息
			let songBegin=this.topList.length;
			// console.log(songBegin);
			let url = api.topListApi + songBegin;
			jsonp(url,{param:'jsonpCallback'},(err,data)=>{
				// console.log(url);
				this.topList=this.topList.concat(data.songlist);
				// console.log(this.topList);
				this.loadingState = false;
				
				
			})
		},
		...mapMutations({
		      'setCurSong':'setCurSong',
		      'setPlayList':'setPlayList',
		      'setCurSongIndex':'setCurSongIndex'
		})

	},
	filters:{
		getTime:function(t){
			let m = parseInt(t/60);
			let s = t % 60;
			s = s<10 ? ('0'+s):s;
			return m + '分' + s;

		}
	},
	components:{
		HeaderTab,
		Loading
		
	}

}
	
</script>

<style lang="scss" scoped>

.index{	
	.index-wrapper{
		height:calc(100vh - 95px);
		overflow:hidden;
		.sliders{
		
			img{
				width:100%;
			}
			
				.bullet{
					display:inline-block;
					width:8px;
					height:8px;
					border-radius: 50%;
					background:white;
					margin:0 4px;

				}
				.bullet-active{
					background:#d3442c;
				}		
		}

		.top-list{
			color:white;
			padding:0 15px;
			h2{
				font-size:16px;
				color:#d3442c;
				text-align:center;
			}
			.song-content{
				ul{
					li{
						display: flex;
						margin-bottom:15px;
						.thumb{
							width:60px;
							height:60px;
							
							img{
								width:60px;
								height:60px;

							}
						}
						.song-info{
							flex:1;
							margin-left:20px;
							color:white;
							h3{
								font-size:14px;
								padding-top:15px;

							}
							span{
								font-size:12px;
							}

						}

						.play-time{
							color:#999;
							font-size:12px;
							padding-top:15px;
							
						}
					}
				}
			}
		}

	}
	


}


</style>