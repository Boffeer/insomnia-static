<?php

/**
 * EMAIL
 */

$message = '<html><body>';
foreach ($_POST as $key => $value) {
    if ($key == 'user_file') continue;
    if (empty($value)) continue;
    $message .= '<p><strong>' . $key . ':</strong> ' . $value . '</p>';
}
$message .= '</body></html>';

$email_to = 'admin@mirinda.by';
$email_from = 'info@mirinda.info';

$email_subject = "заявка |";
if ($_POST['form']) {
    $email_subject .= " {$_POST['form']} | ";
}
$email_subject .= "mirinda.by";

$from_name = "info";
$headers = array(
    'From: ' . $from_name . ' <' . $email_from . '>',
    'Reply-To: ' . 'noreply@mirinda.info',
    'Content-Type: text/html; charset=UTF-8',
);
$headers = implode("\r\n", $headers);

// заголовок письма

// var_dump(array(
//     'to' => $email_to,
//     'subj' => $email_subject,
//     'message' => $message,
//     'headers' => $headers,
// ));
// отправляем письмо
$mail = mail($email_to, $email_subject, $message, $headers);
// echo json_encode(array(
//     'status' => $mail,
// ));

echo json_encode(array('status' => 'ok', 'mail' => $mail));

die;