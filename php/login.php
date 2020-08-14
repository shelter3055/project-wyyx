<?php
include "conn.php";

if (isset($_POST['username']) && isset($_POST['pass'])) {
    $user = $_POST['username'];
    $pass =sha1($_POST['password']);
    $result = $conn->query("select * from registry where username='$user' and password='$pass'");
    if ($result->fetch_assoc()) { //匹配成功
        echo 1;
    } else { //匹配不成功
        echo 2;
    }
}
