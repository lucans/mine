<? 

function inputCusto($aDados){

	echo 'Input Custo';
	echo '<pre>';
	print_r($aDados->oCusto);

	$sQuery = "INSERT INTO custos SET "
						."descricao = '" . stringDecode($aDados->oCusto->descricao) . "', "					
						."valor = '" . $aDados->oCusto->valor . "', "
						."coduser = '" . $_SESSION['user'][0]['coduser'] . "', "
						."dtcadastro = NOW()";								
											
	mysql_query($sQuery) or die($sQuery . mysql_error()); 
}

function deleteCusto($cod){

	echo 'Delete Custo';
	echo '<pre>';

	$sQuery = "DELETE FROM custos WHERE codcusto = '" . $cod . "' ";						
											
	mysql_query($sQuery) or die($sQuery . mysql_error()); 
}

?>