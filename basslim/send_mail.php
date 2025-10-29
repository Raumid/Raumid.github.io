<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Método no permitido");
}

function clean_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

$name = clean_input($_POST['name'] ?? '');
$email = clean_input($_POST['email'] ?? '');
$subject = clean_input($_POST['subject'] ?? '');
$message = clean_input($_POST['message'] ?? '');

// Validar campos obligatorios
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    exit("Campos incompletos");
}

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit("Correo inválido");
}

// Limitar longitud
if (strlen($message) > 1000) {
    http_response_code(400);
    exit("Mensaje demasiado largo");
}

// Si pasa validaciones, envía
$to = "ventas.basslim@serviciosbasslim.com.mx";
$email_subject = "Mensaje de contacto: $subject";
$email_body = "Nombre: $name\nCorreo: $email\n\n$message";
$headers = "From: $email\r\nReply-To: $email\r\n";

if (mail($to, $email_subject, $email_body, $headers)) {
    echo "<script>alert('Mensaje enviado correctamente.'); window.history.back();</script>";
} else {
    http_response_code(500);
    echo "<script>alert('Error al enviar el mensaje.'); window.history.back();</script>";
}
?>
