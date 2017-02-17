<?php
include("conexao.php");

$postdata = file_get_contents("php://input");
$aDados = json_decode($postdata);


$p = $_GET['p'];
$q = empty($_GET['q']) ? $q = '' : $q = $_GET['q'];


call_user_func($p, $aDados);

?>