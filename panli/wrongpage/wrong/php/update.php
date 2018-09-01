<?php 
	require 'conn.php';
	$title1=$_GET['title1'];
	$question1=$_GET['question1'];
	$solve1=$_GET['solve1'];
	$id1=$_GET['sid1'];


	mysql_query("update infomation set title='$title1',question='$question1',solve='$solve1' ,time=now() where sid=$id1 ");

	echo $id1;
 ?>