<template>
	<div class="header">
		<h1><i></i>music player</h1>
		<div class="nav">
			<router-link to="index" active-class="active">
				<span>推荐</span>
			</router-link>
			<router-link to="singer" active-class="active">
				<span>歌手</span>
			</router-link>
			<router-link to="search" active-class="active">
				<span>搜索</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {

		data(){
			return {

			}

		},
		methods:{

		},
		components:{

		
		}

	}
	
</script>

<style lang="scss" scoped>
.header {
	padding-top:15px;
	text-align:center;
	h1{
		font-weight:400;
		color:white;
		font-size:22px;
		margin-bottom:10px;
		margin-top: 0;
		i{
			display:inline-block;
			width:30px;
			height:30px;
			background:url(../assets/icon/logo.png) no-repeat;
			background-size:30px 30px;
			vertical-align:middle;
		}
	}
	.nav{
		width:100%;
		display:flex;
		padding-top:10px;
		a {
			flex:1;
			span{
				color:white;
				padding-bottom:5px;
				font-size:16px;
				display:inline-block;
			}
			&.active{
				span{
					color:#d3442c;
					border-bottom:2px solid #d3442c;

				}
			}
		}
	}
	
}

</style>

