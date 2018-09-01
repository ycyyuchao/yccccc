/*;!function($){
	
	//banner数据
	$.ajax({
		url:'php/banner.php',
		dataType:'json'
	}).done(function(bannerdata){
		$.each(bannerdata,function(index,value){
			var $bannerstr='<ul>';
			
		});
	});
	
	//lunbo数据
	$.ajax({
		url:'php/banner.php',
		dataType:'json'
	}).done(function(bannerdata){
		$.each(bannerdata,function(index,value){
			var $bannerstr='<ul>';
			
		});
	});
	//tab切换数据
	$.ajax({
		url:'php/banner.php',
		dataType:'json'
	}).done(function(bannerdata){
		$.each(bannerdata,function(index,value){
			var $bannerstr='<ul>';
			
		});
	});
}(jQuery);*/
!function(){
	//banner效果
	
}(jQuery);

!function(){
	//lunbo效果
	
}(jQuery);

!function(){
	//广告弹出效果
	var $gg=$("#gg");
	var $close=$(".close");
	$close.on('click',function(){
		$gg.hide();
	})
	
}(jQuery);
