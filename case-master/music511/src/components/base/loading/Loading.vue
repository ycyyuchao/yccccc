<template>
	<div class="loading" v-show="state">
		<i class="icon"></i>
		<span class="text" v-text="title"></span>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}

		},
		props:{
			title:{
				type: String,
				default:'加载中'
			},
			state:{
				type: Boolean,
				default: true
			}
		},
		methods:{

		},
		components:{
		
		}

	}
	
</script>

<style lang="scss" scoped>
.loading{
	z-index: 99;
	display:flex;
	flex-direction:column;
	align-content:center;
	position:fixed;
	top:50%;
	left:50%;
	margin-left:-20px;
	text-align: center;
	.icon{
		width:25px;
		height:25px;
		background:url(loading.gif) no-repeat;
		background-size:25px 25px;
		background-position:center center;

	}
	.text {
		font-size:14px;
		color:white;
	}
}

</style>