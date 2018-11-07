<template>
	<div class="">
		<!-- S 头部logo跟导航栏 -->
		<HeaderTab></HeaderTab>
		<!-- E 头部logo跟导航栏 -->
		
		<!-- S 歌手列表 -->
		<div class="wrapper">
			<div class="content">
				<div class="singer-item" v-for="(item,k) in singerList" :key="item.index" >
					<h3 v-text="item.index"></h3>
					<ul>
						<router-link :to="'/singer/'+ singer.Fsinger_mid" v-for="(singer,j) in item.singer" :key="singer.Fsinger_id" tag="div">
						<li >
							<img :src="'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+ singer.Fsinger_mid +'.jpg?max_age=2592000'">
							<span>{{singer.Fsinger_name}}</span>
						</li>
						</router-link>
					</ul>
				</div>
			</div>

			<!-- S 字母索引 -->
			<div class="index-tool">
				<ul>
					<li v-for="(index,k) in indexTool" :key="k" :class="{active:curIndex==k}">
						{{index}}
					</li>
				</ul>
			</div>
			<!-- E 字母索引 -->
		</div>

		<!-- E 歌手列表 -->


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

//引入jsonp
import jsonp from 'jsonp';

//导入api接口地址文件
import api from '@/api/singerApi.js';

//引入better-scroll插件
import BScroll from 'better-scroll'
	export default {
		data(){
			return {
				scroll:null,
				loadingState:true,
				singerList:[],
				indexTool:null,
				curIndex:0

			}

		},
		mounted(){
			jsonp(api.singerListApi,{param:'jsonpCallback',timeout:50000},(err,data)=>{
				this._getOrderSingerList(data.data.list);
				this.scroll=new BScroll('.wrapper',{//实例化better-scroll
					probeType:3,//非实时派发better-scroll滚动的位置
					click:true//默认情况下为false，better-scroll的点击事件默认被禁掉
				});

				this.loadingState=false;
				this.scroll.on('scroll',(pops)=>{
					let popsY = Math.abs(pops.y);
					let singerList = this.singerList;
					let indexMax = singerList.length;
					for(let i = 0;i<indexMax;i++){
						if(popsY < singerList[i].distance){
							this.curIndex = i;
							break;
						}
					} 
					
				});
				this.$nextTick(()=>{
					this._getDistance();
				})
			});
		},
		methods:{
			//整理歌手列表数据，按照热门 A--Z进行排布
			_getOrderSingerList(data){
				this._getIndexTool();

				//生成热门
				let hotSinger = {index:'热',singer:data.splice(0,10)};
				this.singerList.push(hotSinger);

				//生成A--Z的歌手信息索引
				for(let i =1;i<=26;i++){
					let curIndex = this.indexTool[i]
					let temp = {index:curIndex,singer:[]};
					data.forEach((singer,k)=>{
						if(singer.Findex === curIndex){
							temp.singer.push(singer);
							data.splice(k,1);
						}

					});
					this.singerList.push(temp);

				}

				/*//清楚无歌手信息的字母索引
				this.singerList.map((item,k)=>{
					if(item.singer.length<=0){
						this.singerList.splice(k,1);
						this.indexTool.splice(k,1);
					}
				});*/

				//清楚无歌手信息的字母索引
				  let tempSingerList = [];
			      let tempIndexTool = [];
			      this.singerList.map((item,k)=>{
			        if(item.singer.length > 0){
			          tempSingerList.push(item);
			          tempIndexTool.push(item.index);
			        }
			      });

			      
			      this.singerList = tempSingerList;
			      this.indexTool = tempIndexTool;
			},
			_getIndexTool(){
				let indexArr=['热'];
				for(let code=65;code<=90;code++){
				//根据ASCII码生成A--Z
					indexArr.push(String.fromCharCode(code));
				}
				this.indexTool = indexArr;
			},
			_getDistance(){
				let singerItemNode = document.getElementsByClassName('singer-item');
				//console.log(singerItemNode);
				let offset=0;
				/*this.singerList.map((item,i)=>{
					offset +=singerItemNode[i].offsetHeight;
					this.singerList[i].distance = offset;
					console.log(singerItemNode[i]);
				});*/
				//console.log(singerItemNode.length)
				for(var i= 0;i<singerItemNode.length;i++){
					offset +=singerItemNode[i].offsetHeight;
					this.singerList[i].distance = offset;//给singerList[i]添加一个distance属性
					// console.log(singerItemNode[i].offsetHeight);

				}
			}

		},
		components:{
			HeaderTab,
			Loading
		
		}

	}
	
</script>

<style lang="scss" scoped>
.wrapper{
	height:calc(100vh - 95px);
	overflow:hidden;

	.content{

		.singer-item{

			h3{
				font-size: 15px;
			    line-height: 30px;
			    background: #131313;
			    font-weight: 400;
			    text-indent: 1em;
			    color: #fff;

			}
			ul{
			    padding-left: 25px;
			    padding-bottom: 20px;
				li{
				    display: flex;
				    line-height: 50px;
				    margin-top: 10px;
					img{
						width: 50px;
					    height: 50px;
					    border-radius: 50%;


					}
					span{
						color: #fff;
					    flex-grow: 1;
					    margin-left: 20px;
					    white-space: nowrap;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    padding-right: 8px;


					}
				}
			}
		}

	}
	.index-tool{
		width: 16px;
	    position: fixed;
	    top: 285px;
	    right: 10px;
	    margin-top: -145px;
	    background-color: hsla(0,0%,92%,.1);
	    font-size: 12px;
	    border-radius: 10px;
	    padding: 5px 0;
	    color: #c8c8c8;
		ul{

			li{
				text-align: center;
				font-size: 12px;
			    color: #c8c8c8;
			    &.active{
			    	color:#d3442c;
			    }
			}

		}
	}
}

</style>