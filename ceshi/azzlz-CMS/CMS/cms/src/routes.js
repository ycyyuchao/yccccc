import User from './components/user/User.vue';
import Home from './components/Home.vue';
import News from './components/news/News.vue';
import Cate from './components/cate/Cate.vue';
import Product from './components/product/Product.vue';
import Upload from './components/upload/Upload.vue';
import Comment from './components/comment/Comment.vue';


export const routes = [
	{ path:'/',component:Home },
	{ path:'/user',component:User },	
	{ path:'/news',component:News },	
	{ path:'/cate',component:Cate },	
	{ path:'/product',component:Product },	
	{ path:'/upload',component:Upload },	
	{ path:'/comment',component:Comment },	
];