<?php

header('content-type:text/html;charset=utf-8'); //设置字符编码。
define('HOST', 'localhost'); //主机名
define('USERNAME', 'root'); //用户名
define('PASSWORD', 'root'); //密码
define('DBNAME', 'userlin'); //数据库

$conn = @new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
// php容错处理，不显示错误信息。代码的前面添加@符号
if ($conn->connect_error) {
    die('数据库连接错误' . $conn->connect_error);
}