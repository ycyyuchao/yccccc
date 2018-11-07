<template>
	<keep-alive>
		<transition name="sd">
			<!-- S 歌手详情页 -->
			<div class="singer-details">

				<!-- S 歌手详情页头部 -->
				<div class="header">
					<div class="container">
						<a href="javascript:"><i @click="back"></i></a>{{singer.singer_name}}
					</div>
				</div>
				<!-- E 歌手详情页头部 -->

				<!-- S 歌手详情页封面 -->
				<div class="thumb" v-html="thumb"></div>
				<!-- E 歌手详情页封面 -->

				<!-- S 歌手详情页列表 -->
			
				<div class="song-list">
					<div class="wrapper">
						<div class="content">
							<ul>
								<router-link :to="'/singer/' + song.musicData.songmid +'/'+ song.musicData.albummid" tag="div" v-for="(song,k) in singer.list" :key="song.musicData.songid" @click.native="addSong(song)">
									<li >
										<div class="info">
											<h2>{{song.musicData.songname}}</h2>
											<span>{{singer.singer_name}}-{{song.musicData.albumname}}</span>
										</div>
									</li>
								</router-link>
							</ul>
						</div>
					</div>
				</div>

				<!-- E 歌手详情页列表 -->

				<!-- S Loading组件 -->
				<Loading :title="'加载中...'" :state="loadingState"></Loading>
				<!-- E Loading组件 -->

			</div>
			<!-- E 歌手详情页 -->
		</transition>
	</keep-alive>
	

</template>

<script>
//载入animate.css
import '@/assets/css/animate.css'

//载入songapi
import api from '@/api/singerApi'

//载入jsonp
import jsonp from 'jsonp'

//载入better-scroll
import BScroll from 'better-scroll'

//载入loading组件
import Loading from '@/components/base/loading/Loading'

import {mapGetters,mapMutations} from 'vuex'
	export default {
		data(){
			return {
				singer:{},
				scroll:null,
				thumb:'',
				loadingState:true


			}

		},
		created(){
			this._getData();
		},
		computed:{
			...mapGetters([
				'getCurSong',
				'getPlayList'
			])
		},
		methods:{
			_getData(){//获取歌手详情信息
				let url = api.singerDetailApi + this.$route.params.sid;
				jsonp(url,{param:'jsonpCallback'},(err,data)=>{
					this.singer=data.data;
					// console.log(data.data);
					this.loadingState=false;

					//生成封面结构
					this.thumb=`<img style="width:100%" src="https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.singer_mid}.jpg">`;

					this.$nextTick(()=>{
					//实例化better-scroll
						this.scroll = new BScroll('.wrapper',{
							click:true
						});
					});
				});
			},

			//返回上一级目录
			back(){
				this.$router.go(-1);
			},
			addSong(song){
				this.setCurSong(song);

				//弹出层列表去重
				let listArr = this.getPlayList;
				let numFlag = 0;//歌曲存在列表的次数
				listArr.forEach((item,i)=>{
					if(song.musicData.songid == item.musicData.songid){
						numFlag++;
						this.setCurSongIndex(i);
					}
				});
				if(numFlag <= 0){//歌曲列表中不存在时才能添加进列表数组中
					this.setCurSongIndex(listArr.length);
					this.setPlayList(song);

				}
				
				
			},
			...mapMutations({
				'setCurSong':'setCurSong',
				'setPlayList':'setPlayList',
				'setCurSongIndex':'setCurSongIndex'
			})
		},
		components:{
			Loading
		
		}

	}
	
</script>

<style lang="scss" scoped>
.singer-details{
	background-color: #060506;
    height: 100vh;

	.header{
		text-align: center;
	    font-size: 20px;
	    line-height: 55px;
	    color: #fff;
	    position: fixed;
	    width: 100%;
	    .container{
	    	padding: 0 10px;
    		margin: 0 auto;
		    text-align: center;
		    font-size: 20px;
		    line-height: 55px;
		    color: #fff;
    		a{
    			i{
    				display: inline-block;
				    width: 25px;
				    height: 25px;
				    padding: 15px;
				    background:url(../assets/icon/back.png) no-repeat;
				    background-size: 25px 25px;
				    background-position: 50%;
				    position: absolute;
				    left: 0
    			}
    		}
	    }

	}
	.thumb{
		width:100%;
		img{
			width: 100%;

		}
	}
	.song-list{

		.wrapper{
		width: 100vw;
	    height: 340px;
	    position: fixed;
	    bottom: 0;
	    z-index: 99;
	    background-color: #060506;
	    color: #fff;
	    overflow: hidden;

			.content{

				ul{

					li{
						padding: 0 10px;
					    padding-top: 10px;
						.info{
							color:white;
							h2{
								font-weight: 400;
							    font-size: 18px;
							}
							span{
								font-size: 16px;
								white-space: nowrap;
							    overflow: hidden;
							    text-overflow: ellipsis;
							}
						}

					}
				}
			}
		}
	}
}
.sd-enter-active{
	animation:fadeInRight .2s;
}

</style>