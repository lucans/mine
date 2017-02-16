<? 

function inputContato($aDados){

	echo 'Input Contato';
	echo '<pre>';
	print_r($aDados->oContato);

	$sQuery = "INSERT INTO contatos SET "
						."coduser = '" . $_SESSION['user'][0]['coduser'] . "', "					
						."descricao = '" . stringDecode($aDados->oContato->descricao) . "', "									
						."dia = NOW()";								
											
	mysql_query($sQuery) or die($sQuery . mysql_error()); 
}

function deleteContato($cod){

	echo 'Delete Contato';
	echo '<pre>';

	$sQuery = "DELETE FROM contatos WHERE codcontato = '" . $cod . "' ";						
									
	mysql_query($sQuery) or die($sQuery . mysql_error()); 
}

?>