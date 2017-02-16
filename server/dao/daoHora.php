<? 

function inputHora($aDados){

	echo 'Input Hora';
	echo '<pre>';
	print_r($aDados->oHora);

	$explode = explode('/', $aDados->oHora->dia);
	$aDados->oHora->dia = implode('-', array_reverse($explode)); 

	$sQuery = "INSERT INTO horas SET "
						."descricao = '" . stringDecode($aDados->oHora->descricao) . "', "					
						."horas = '" . $aDados->oHora->horas . ":00:00', "
						."dia = '" . $aDados->oHora->dia . "', "
						."coduser = '" . $_SESSION['user'][0]['coduser'] . "', "
						."dtcadastro = NOW()";								
											
	mysql_query($sQuery) or die($sQuery . mysql_error()); 

}

function deleteHora($cod){

	echo 'Delete Hora';
	echo '<pre>';

	$sQuery = "DELETE FROM horas WHERE codhora = '" . $cod . "' ";					
											
	mysql_query($sQuery) or die($sQuery . mysql_error()); 
}

?>