<?php 

function inputBase($aDados){

	echo 'Input Base';
	echo '<pre>';
	print_r($aDados->oBase);

	$aDados->oBase->keywords = implode(',', explode(' ', $aDados->oBase->descricao));
	$aDados->oBase->descricao = nl2br($aDados->oBase->descricao);

	$aDados->oBase->descricao = base64_encode($aDados->oBase->descricao);
	$aDados->oBase->keywords = base64_encode($aDados->oBase->keywords);


	$sQuery = "INSERT INTO bases SET "
						."nome = '" . stringDecode($aDados->oBase->nome) . "', "					
						."descricao = '" . stringDecode($aDados->oBase->descricao) . "', "
						."keywords = '" . stringDecode($aDados->oBase->keywords) . "', "
						."tipo = '" . stringDecode($aDados->oBase->tipo) . "', "
						."dtcadastro = NOW()";								
											
	mysql_query($sQuery) or die($sQuery . mysql_error()); 
}

function deleteBase($cod){

	echo 'Delete Base';
	echo '<pre>';

	$sQuery = "DELETE FROM bases WHERE codbase = '" . $cod . "' ";						
									
	mysql_query($sQuery) or die($sQuery . mysql_error()); 
}

?>