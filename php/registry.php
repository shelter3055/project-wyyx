<?php
require "conn.php";
header('Access-Control-Allow-Origin:*'); //允许所有来源访问

header('Access-Control-Allow-Method:POST,GET'); //允许访问的方式

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
    //设置php跳转
    header('location:http://10.31.152.32/project-wyyx/src/home.html');
}
