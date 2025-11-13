<?php
// Izinkan akses dari mana saja (untuk pengembangan)
header("Access-Control-Allow-Origin: *");

// Konfigurasi koneksi database
$host = 'localhost';
$user = 'root'; // User default XAMPP
$pass = '';     // Password default XAMPP
$db   = 'penjualang_db'; // Nama database

// Membuat koneksi
$conn = new mysqli($host, $user, $pass, $db);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Set charset ke utf8mb4 untuk mendukung karakter yang lebih luas
$conn->set_charset("utf8mb4");
?>
