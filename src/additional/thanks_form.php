<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];

    $message = $_POST["message"]; 
    
    $to = "support@" . $_SERVER['HTTP_HOST'];
    $subject = "New Contact Form Submission";
    $body = "Name: $name\n";
    $body .= "Email: $email\n";

    $body .= "Message: $message\n"; 
    
    $headers = "From: $to \r\n";
    mail($to, $subject, $body, $headers);
    header("Location: thanks/");
    exit();
}
?>
