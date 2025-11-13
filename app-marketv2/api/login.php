<?php
session_start();
require 'db.php';

// Ambil data login
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    // Redirect kembali ke halaman login dengan pesan error
    header("Location: ../login.html?error=Harap+isi+semua+field");
    exit;
}

// --- GANTI BAGIAN INI SESUAI ADMIN KAMU ---
$admin_user = 'admin';
$admin_pass = '12345';
// ------------------------------------------

// Cek login sederhana
if ($username === $admin_user && $password === $admin_pass) {
    $_SESSION['admin_logged_in'] = true;
    // Redirect ke halaman admin
    header("Location: ../admin.html");
    exit;
} else {
    // Redirect kembali ke login dengan error
    header("Location: ../login.html?error=Username+atau+password+salah");
    exit;
}
?>
