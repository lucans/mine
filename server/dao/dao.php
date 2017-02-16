<?

function getContatos($aDados){

	$sQuery = "SELECT dia FROM contatos GROUP BY dia";
	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmt)){	
		$oResult->dia = $oResult->dia;
		$oResult->contatos = getContatosByDia($oResult->dia);
		array_push($aResult, encodeUT8Array($oResult));
	}
	
	echo json_encode(["data" => $aResult]);
}


function getContatosByDia($dia){ 

	$sQuery = "SELECT u.tema,u.email, c.* FROM contatos c INNER JOIN users u ON c.coduser = u.coduser WHERE c.dia = '$dia'";

	// die($sQuery);

	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmt)){
		array_push($aResult, $oResult);
	}

	return $aResult;
}



function getTarefas($aDados){

	$subQueryTipo = $aDados->oParametros->tipo != '' ? " AND tipo = '" . $aDados->oParametros->tipo . "'"  : '';

	$sQuery = "SELECT dia FROM tarefas WHERE coduser = " . $_SESSION['user'][0]['coduser'] . " " . $subQueryTipo . " GROUP BY dia ORDER BY dtcadastro DESC";
	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmt)){	
		$oResult->dia = $oResult->dia;
		$oResult->tarefas = getTarefasByDia($oResult->dia, $subQueryTipo);
		array_push($aResult, encodeUT8Array($oResult));
	}
	
	echo json_encode(["data" => $aResult]);
}


function getTarefasByDia($dia, $subQueryTipo){ 
	$sQuery = "SELECT * FROM tarefas WHERE coduser = " . $_SESSION['user'][0]['coduser'] . " AND dia = '$dia'" . $subQueryTipo;
	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmt)){
		array_push($aResult, $oResult);
	}

	return $aResult;
}


function getHorasAll(){

	$sQueryCods = "SELECT tema, email, coduser FROM users";
	$oStmtCods = mysql_query($sQueryCods) or die($sQueryCods . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmtCods)){
		$oResult->horas = getHorasByUser($oResult->coduser);
		array_push($aResult, $oResult);
	}

	echo json_encode($aResult);
}


function getHorasByUser($cod){
	$sQuery = "SELECT * FROM horas WHERE coduser = $cod AND dtcadastro > DATE_ADD(NOW(), INTERVAL -10 DAY) ORDER BY dtcadastro DESC";
	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmt)){
		$aux = explode('-', $oResult->dtcadastro);
		$oResult->dtcadastro = $aux[2] . '/' . $aux[1] . '/' . $aux[0];   
		array_push($aResult, encodeUT8Array($oResult));
	}

	return $aResult;
}


function getBases(){
	$sQuery = "SELECT * FROM bases ORDER BY dtcadastro DESC LIMIT 30";
	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmt)){
		$oResult->descricao = utf8_decode(base64_decode($oResult->descricao));
		$oResult->keywords = base64_decode($oResult->keywords);
		array_push($aResult, encodeUT8Array($oResult));
	}
	
	echo json_encode($aResult);
}


// function getTarefas(){

// 	$sQuery = "SELECT * FROM tarefas WHERE coduser = " . $_SESSION['user'][0]['coduser'] . " ORDER BY dia DESC";
// 	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
// 	$aResult = array();

// 	while($oResult = mysql_fetch_object($oStmt)){
// 		$oResult->total = mysql_num_rows($oStmt);
// 		$aux = explode('-', $oResult->dia);
// 		$oResult->dia = $aux[2] . '/' . $aux[1] . '/' . $aux[0];   
// 		array_push($aResult, encodeUT8Array($oResult));
// 	}

// 	echo json_encode($aResult);
// }


function getHoras(){
	$sQuery = "SELECT * FROM horas WHERE coduser = " . $_SESSION['user'][0]['coduser'] . " ORDER BY dtcadastro DESC";
	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmt)){
		array_push($aResult, encodeUT8Array($oResult));
	}

	echo json_encode($aResult);
}

function getCustos(){
	$sQuery = "SELECT * FROM custos WHERE coduser = " . $_SESSION['user'][0]['coduser'] . " ORDER BY dtcadastro DESC";
	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$aResult = array();

	while($oResult = mysql_fetch_object($oStmt)){		
		array_push($aResult, encodeUT8Array($oResult));
	}
	echo json_encode($aResult);
}

function getTotal($aDados){		
	$sQuery = "SELECT ROUND(SUM(" . $aDados->oDados->field . "),2) as total FROM " . $aDados->oDados->table . " ORDER BY dtcadastro DESC";

	$oStmt = mysql_query($sQuery) or die($sQuery . mysql_error()); 
	$fResult = mysql_result($oStmt, 0);

	echo $fResult;
}
?>