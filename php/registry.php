<?php
include "conn.php";
header('Access-Control-Allow-Origin: *');
header("content-type:textml;charset=utf-8");


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from registry where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    $conn->query("insert registry values(null,'$username','$password',NOW())");
    header('location:http://10.31.152.32/project-wyyx/src/login.html');
}
