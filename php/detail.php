<?php
include './conn.php';
if(isset($_GET["sid"])){
    $sid = $_GET["sid"];

    $resule = $conn -> query("SELECT * FROM datawyyx WHERE sid = $sid");

    echo json_encode($resule->fetch_assoc());

}
