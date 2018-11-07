//载入全局控制变量G 
import G from './globel';

export default function Screen01(stage,queue){
	this.stage= stage;
	this.queue= queue;
	this.flowers = [];
	this.flowersPath = [];
	this.container = new createjs.Container();

	//花朵的滑动顺序，默认从第一个开始
	this.curI = 0;

	this._init();
}

Screen01.prototype._init=function(){
	G.screenLocked =1;
	//花朵 flower
	this._flower();
	//文字
	this._text();
	//手势
	this._gestureAnimation();

}
Screen01.prototype._flower=function(){
	//花朵 flower
	//位置
	var flowerPath = [
		[307,403],
		[421,316],
		[571,266],
		[741,261],
		[866,356],
		[1041,331],
		[1051,171]
	];
	for(let i = 0 ; i<7;i++){
		//动态生成7朵花
		let flowerObj = new createjs.Bitmap(this.queue.getResult('01_flower'));
		//设置花瓣偏移量
		flowerObj.regX = flowerObj.regY = 31;
		flowerObj.x = flowerPath[i][0];//花朵x坐标
		flowerObj.y = flowerPath[i][1];//花朵y坐标
		this.container.addChild(flowerObj);
		this.flowers.push(flowerObj);
	}

	//解锁路径 x,y,deg
	var path = [
		[332,375,-40],
		[466,288,-18],
		[625,244,0],
		[783,281,30],
		[930,350,-15],
		[1040,270,-90]
	];
	for(let i = 0;i<6;i++){//取得图片滑动路劲，并把它放入数组
		let flowerPathObj = new createjs.Bitmap(this.queue.getResult('01_flower_path'));
		flowerPathObj.setTransform(path[i][0],path[i][1],.6,.6,path[i][2]);
		flowerPathObj.alpha = 0.3;
		this.flowersPath.push(flowerPathObj);
		this.container.addChild(flowerPathObj);
	}
	this.stage.addChild(this.container);

	//给背景添加事件
	this.stage.addEventListener('stagemousemove',(evt)=>{
		let x =evt.stageX;//鼠标的X坐标；
		let y =evt.stageY;//鼠标的y坐标；
		/*console.log('******')
		console.log(this.flowers);*/
		let len = this.flowers.length;//花朵数组的长度
		for(let i=0;i<=len-1;i++){
			let bounds = this.flowers[i].getBounds();//返回每一个花朵的边界值

			//花瓣位置坐标（即图片左上角坐标）
			let posx = flowerPath[i][0];//花瓣x位置
			let posy = flowerPath[i][1];//花瓣y位置

			//判断鼠标是否在花朵的有效范围内
			if(x>=posx && x<=posx+62 && y>=posy && y<=posy+62){

				//判断花朵是否按顺序划过的
				if(this.curI === i){
					if(this.curI === 0){
						//隐藏手势并且设置帧频率
						this.container.removeChild(this.animation);
						createjs.Ticker.setFPS(60);
					}
					//当上面两个判断都满足的话鼠标经过的花朵才开始旋转
					createjs.Tween.get(this.flowers[i],{loop:true})
					.to({
						rotation:360
					},1500);

					//花瓣间路径高亮
					try{
						createjs.Tween.get(this.flowersPath[i-1])
						.to({
							alpha:1
						},1000);
					}catch(e){
						console.log(e);
					}
					
						if(this.curI >= 6){//最后一朵花开始转了就奇特换场景

							//切换场景时把容器清除掉
							createjs.Tween.get(this.container)
							.to({
								alpha:0
							},3000)
							.call(()=>{
								this.stage.removeChild(this.container);
							})
							.wait(500)
							G.screen = 2;
							return;
						}
						this.curI = this.curI + 1;
					

				}
			}

		}

	});
}
//文字添加
Screen01.prototype._text = function(){
	this.text = new createjs.Bitmap(this.queue.getResult('01_text'));
	this.text.x = 540;
	this.text.y = 520;
	this.container.addChild(this.text);
}

//手势滑动引导
Screen01.prototype._gestureAnimation = function(){
	this.gestureSprite = new createjs.SpriteSheet({
		images:[this.queue.getResult('01_handtip')],
		frames:{//帧
			width:218,
			height:200,
			count:5
		},
		animations:{
			handtip:[0,1,2,3,4,4,0]//读取帧的顺序
		}
	}); 


	this.animation = new createjs.Sprite(this.gestureSprite, "handtip");

	//位置2，缩放2，偏移角度2
	this.animation.setTransform(300, 430, 1, 1, -35);

	//设置帧频率
	createjs.Ticker.setFPS(3);
	this.container.addChild(this.animation);
}