<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './src/Exception.php';
require './src/PHPMailer.php';
require './src/SMTP.php';

$siteOwnersEmail = 'andychao217@qq.com';
$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
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
    // $from =  $name . " <" . $email . ">";
    // Email Headers
    // $headers = "From: " . $from . "\r\n";
    // $headers .= "Reply-To: ". $email . "\r\n";
    // $headers .= "MIME-Version: 1.0\r\n";
    // $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    if (!$error) {
        try {
            //服务器配置
            $mail->CharSet ="UTF-8";                     //设定邮件编码
            $mail->SMTPDebug = 0;                        // 调试模式输出
            $mail->isSMTP();                             // 使用SMTP
            $mail->Host = 'smtp.qq.com';                // SMTP服务器
            $mail->SMTPAuth = true;                      // 允许 SMTP 认证
            $mail->Username = $siteOwnersEmail;      // SMTP 用户名  即邮箱的用户名
            $mail->Password = 'fxapmgivnveibcdd';        // SMTP 密码  部分邮箱是授权码(例如163邮箱)
            $mail->SMTPSecure = 'ssl';                   // 允许 TLS 或者ssl协议
            $mail->Port = 465;                           // 服务器端口 25 或者465 具体要看邮箱服务器支持
        
            $mail->setFrom($siteOwnersEmail, $name);  //发件人
            $mail->addAddress($siteOwnersEmail, 'Andy Chao');  // 收件人
            //$mail->addAddress('ellen@example.com');  // 可添加多个收件人
            $mail->addReplyTo($email, $name); //回复的时候回复给哪个邮箱 建议和发件人一致
            //$mail->addCC('cc@example.com');                    //抄送
            //$mail->addBCC('bcc@example.com');                    //密送
        
            //发送附件
            // $mail->addAttachment('../xy.zip');         // 添加附件
            // $mail->addAttachment('../thumb-1.jpg', 'new.jpg');    // 发送附件并且重命名
        
            //Content
            $mail->isHTML(true);                                  // 是否以HTML文档格式发送  发送后客户端可直接显示对应HTML内容
            $mail->Subject = $subject. ' '. date('Y-m-d H:i:s');
            $mail->Body    = '<div>'. $message. '</div>'. ' '. date('Y-m-d H:i:s');
            $mail->AltBody = $message;
        
            $mail->send();
            echo 'OK';
        } catch (Exception $e) {
            echo '邮件发送失败: ', $mail->ErrorInfo;
        }
        // ini_set("sendmail_from", $siteOwnersEmail); // for windows server
        // $mail = mail($siteOwnersEmail, $subject, $message, $headers);
        // if ($mail) { 
        //     echo "OK"; 
        // } else { 
        //     echo "有错误，请重试"; 
        // }
    }  else {
        $response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
        $response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
        $response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;
        echo $response;
    } # end if - there was a validation error
}