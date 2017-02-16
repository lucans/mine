<?
if ($_SERVER['DOCUMENT_ROOT'] == 'C:/Users/Lucas/Documents/GitHub') {
	mysql_connect('192.168.10.20','root','proxy');
} else{
	mysql_connect('localhost','root','');
}

// mysql_connect('www.lucans.com.br','lucas','meupenis');

mysql_select_db("db_lucas");

include("dao.php");

include("daoTarefa.php");
include("daoCusto.php");
include("daoHora.php");
include("daoUser.php");
include("daoBase.php");
include("daoContato.php");


session_start();


function decodeUT8Array($a) {
    if (is_object($a)){
        $a = (array) $a;
    }
    if (is_array($a)) {
        foreach ($a as $c => $v) {
            $a[$c] = decodeUT8Array($v);
        }
    } else {
        $a = utf8_decode($a);
    }
    return (object)$a;
}

function encodeUT8Array($a) {
    if (is_object($a)) {
        $b = (array)$a;
    } else {
        $b = $a;
    }
    if (is_array($b)) {
        foreach ($b as $c => $v) {
            $b[$c] = encodeUT8Array($v);
        }
    } else {
        $b = utf8_encode($b);
    }
    return $b;
}

function stringDecode ($string){
	return utf8_decode($string);
}

function stringEncode ($string){
	return utf8_encode($string);
}


?>