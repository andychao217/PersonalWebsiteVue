<?php
	// Replace this with your own email address
	$siteOwnersEmail = 'andychao217@vip.qq.com';
	if($_POST) {
		$name = trim(stripslashes($_POST['contactName']));
		$email = trim(stripslashes($_POST['contactEmail']));
		$subject = trim(stripslashes($_POST['contactSubject']));
		$contact_message = trim(stripslashes($_POST['contactMessage']));
		// Check Name
		if (strlen($name) < 2) {
			$error['name'] = "请输入您的姓名.";
		}
		// Check Email
		if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
			$error['email'] = "请填写正确的电子邮箱地址.";
		}
		// Check Message
		if (strlen($contact_message) < 15) {
			$error['message'] = "请输入您的信息，至少包含15个字。";
		}
		// Subject
		if ($subject == '') { 
			$subject = "有人找你"; 
		}
		// Set Message
		$message .= "姓名： " . $name . "<br />";
		$message .= "邮箱: " . $email . "<br />";
		$message .= "信息: <br />";
		$message .= $contact_message;
		$message .= "<br /> ----- <br /> 此邮件来自andychao217.cn <br />";
		// Set From: header
		$from =  $name . " <" . $email . ">";
		// Email Headers
		$headers = "From: " . $from . "\r\n";
		$headers .= "Reply-To: ". $email . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

		if (!$error) {
			ini_set("sendmail_from", $siteOwnersEmail); // for windows server
			$mail = mail($siteOwnersEmail, $subject, $message, $headers);
			if ($mail) { 
				echo "OK"; 
			} else { 
				echo "有错误，请重试"; 
			}
		}  else {
			$response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
			$response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
			$response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;
			echo $response;
		} # end if - there was a validation error
	}
?>