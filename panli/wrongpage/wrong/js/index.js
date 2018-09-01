!function(){
	var submit=document.querySelector('#btn');
	var title=document.querySelector('#title');
	var question=document.querySelector('#question');
	var solve=document.querySelector('#solve');


	var submit1=document.querySelector('#btn1');
	var title1=document.querySelector('#title1');
	var question1=document.querySelector('#question1');
	var solve1=document.querySelector('#solve1');


	var tbody=document.querySelector('tbody');




	//1.点击提交问题按钮，将数据提交到数据库里面。
	submit.onclick=function(){
		ajax({
			url:"http://localhost/server/Second/Classcode/wrong/php/insert.php",
			data:{
				title:title.value,
				question:question.value,
				solve:solve.value
			},
			success:function(){
				location.reload();
			}
		})
		console.log(title);
	};

	//将数据渲染出来
	ajax({
		url:"http://localhost/server/Second/Classcode/wrong/php/data.php",
		success:function(data){
			var arr=JSON.parse(data);
			//console.log(arr);
			var str="";
			for(var i=0;i<arr.length;i++){
				str+='<tr index='+arr[i].sid+'>';

				for(var j in arr[i]){
					str+='<td>'+arr[i][j]+'</td>'
				}

				str+='<td><button class="btn btn-danger btn-sm">删除</button> <input type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#myModal1" value="修改"/></td>';
				str+='</tr>';
			}
			tbody.innerHTML=str;
		}
	});


	//点击删除按钮，数据删除--事件委托
	var amendid=null;
	tbody.onclick=function(ev){
		var ev=ev||window.event;
		ele=ev.target||ev.srcElement;
		if(ele.nodeName=='BUTTON'){
			if(confirm('你确定要删除吗？')){
				ajax({
					url:"http://localhost/server/Second/Classcode/wrong/php/del.php",
					data:{
						id:ele.parentNode.parentNode.getAttribute("index")
					}
				})
				ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
			}
		}else if (ele.nodeName=="INPUT"){
			ajax({
					url:"http://localhost/server/Second/Classcode/wrong/php/adddata.php",
					data:{
						addid:ele.parentNode.parentNode.getAttribute("index")
					},
					success:function(data){
						var d=JSON.parse(data);
						//console.log(d);
						title1.value=d.title;
						question1.value=d.question;
						solve1.value=d.solve;
						amendid=d.sid;
						console.log(amendid);
					}
				})
		}
	}

	//点击确认修改按钮，重新提交数据，后端进行update更新
	submit1.onclick=function(){
		ajax({
			url:'http://localhost/server/Second/Classcode/wrong/php/update.php',
			data:{
				title1:title1.value,
				question1:question1.value,
				solve1:solve1.value,
				sid1:amendid
			},
			success:function(){
				location.reload();
			}
		})
	};
}();