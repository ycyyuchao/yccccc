<?php 
	require "conn.php";
	$addid=$_GET['addid'];

	$result=mysql_query("select * from infomation where sid=$addid");
	$data=mysql_fetch_array($result,MYSQL_ASSOC);
	echo json_encode($data);
 ?>