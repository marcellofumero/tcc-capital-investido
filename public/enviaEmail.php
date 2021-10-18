<?php
@header("Content-Type: text/html; charset=ISO-8859-1",true);

   
			$mensagem ='
				<table border="0">
					<tr>
						<td colspan="2" align="center"><font face="Verdana" size="1" color="#81191A"><b><u>MENSAGEM ENVIADA DO SITE</td>						
					</tr>	
					<tr>
						<td colspan="2">&nbsp;</td>						
					</tr>	
					<tr>
						<td><font face="Verdana" size="1" color="#81191A"><b>Nome:</td>
						<td><font face="Verdana" size="1" color="#81191A">&nbsp;'.$_POST[name].'</td>			
					</tr>
					<tr>
						<td><font face="Verdana" size="1" color="#81191A"><b>E-mail:</td>
						<td><font face="Verdana" size="1" color="#81191A">&nbsp;'.$_POST[email].'</td>			
					</tr>	
					<tr>
						<td><font face="Verdana" size="1" color="#81191A"><b>Assunto:</td>
						<td><font face="Verdana" size="1" color="#81191A">&nbsp;'.$_POST[subject].'</td>			
					</tr>		
					<tr>
						<td valign="top"><font face="Verdana" size="1" color="#81191A"><b>Mensagem:</td>
						<td><font face="Verdana" size="1" color="#81191A">&nbsp;'.$_POST[message].'</td>			
					</tr>
				</table>	
			';
			/*			
			include("phpmailer/class.phpmailer.php");			
			$mail = new PHPMailer();

			$mail->IsSMTP(); // mandar via SMTP
			$mail->Host = "mail.wtsistemas.com.br"; // Seu servidor smtp
			$mail->SMTPAuth = true; // smtp autenticado
			$mail->Username = "email@wtsistemas.com.br"; // usu�rio deste servidor smtp
			$mail->Password = "emwilt"; // senha

			//De quem est�o sendo enviadas as mensagens
			$mail->From = "mfumero@ig.com.br";
			$mail->FromName = $_POST[nome].' - CONTATO SITE';

			//Endereco de resposta
			$mail->AddReplyTo($_POST[email],$_POST[nome]);

			//Enderecos que devem ser enviadas as mensagens
			$mail->AddAddress("contato@pbolosartisticos.com.br","Pelinsari Bolos Art�sticos");

			$mail->WordWrap = 50; // set word wrap
			//$mail->AddAttachment("anexo/argohost.zip"); // attachment
			//$mail->AddAttachment("imagem/argohost.jpg");
			$mail->IsHTML(true); // send as HTML

			$mail->Subject = "CONTATO SITE"; //Titulo do e-mail
			$mail->Body = $mensagem; //Corpo do e-mail
			$mail->AltBody = "";

			if(!$mail->Send())
			{
				echo "<script>alert ('Seu e-mail n�o pode ser enviado. \n Tente mais tarde. \n Obrigado')</script>";
				
				//echo '<script>parent.$("contatoFormStatus").innerHTML = "<font face=Verdana size=1><b>POR FAVOR, TENTE NOVAMENTE, N�O FOI POSS�VEL ENVIAR O E-MAIL</b></font>";</script>';
				//echo "Erro: " . $mail->ErrorInfo;
			}
			else
			{
				echo "<script>alert ('Seu e-mail foi enviado!')</script>";
				//echo '<script>parent.$("contatoFormStatus").innerHTML = "<font face=Verdana size=1><b>Contato Enviado com Sucesso!!!</b></font>";</script>';
            	echo '<script>parent.$("frmContato").reset();</script>';

			*/





if (mail("atendimento@capitalinvestido.com.br", "Contato Site", $mensagem, "Content-Type: text/html")==true){
	echo'
	<script>
        $(\'form.php-email-form\').find(\'.error-message\').slideUp()
        $(\'form.php-email-form\').find(\'.sent-message\').slideDown();
		//alert(\'Seu e-mail foi enviado!\');
	</script>
	';
}
else{
	echo'
	<script>
        $(\'form.php-email-form\').find(\'.error-message\').slideDown().html(\'Ocorreu uma falha e seu contato não pode ser enviado.\');		
		//alert(\' Seu e-mail não pode ser enviado. \n Tente mais tarde. \n Obrigado\');
	</script>
	';
}

?>
