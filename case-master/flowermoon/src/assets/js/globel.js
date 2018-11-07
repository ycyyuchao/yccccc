
//载入createjs库
import easeljs from 'imports-loader?this=>window!easeljs'
import preloadjs from 'imports-loader?this=>window!preloadjs'
import soundjs from 'imports-loader?this=>window!soundjs'
import tweenjs from 'imports-loader?this=>window!tweenjs'

//全局控制变量
export default{
	bg:{},
	
	//场景值
	screen:0,  //0:记载中页面(控制场景) 

	screenLocked:0//锁定画面（控制实例化）
}
