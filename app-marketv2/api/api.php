<?php
require 'db.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

switch ($action) {
    // PRODUCT ENDPOINTS
    case 'get_products':
        get_products($conn);
        break;
    case 'get_product':
        get_product($conn);
        break;
    case 'add_product':
        add_product($conn);
        break;
    case 'update_product':
        update_product($conn);
        break;
    case 'delete_product':
        delete_product($conn);
        break;
    
    // CATEGORY ENDPOINTS
    case 'get_categories':
        get_categories($conn);
        break;
    case 'get_category':
        get_category($conn);
        break;
    case 'add_category':
        add_category($conn);
        break;
    case 'update_category':
        update_category($conn);
        break;
    case 'delete_category':
        delete_category($conn);
        break;
    
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Aksi tidak valid']);
        break;
}

/* ======================================================
   🔹 PRODUCT FUNCTIONS
   ====================================================== */

function get_products($conn) {
    $result = $conn->query("SELECT * FROM products ORDER BY id DESC");
    $products = [];

    while ($row = $result->fetch_assoc()) {
        $products[] = [
            'id' => intval($row['id']),
            'nama' => $row['title'],
            'harga' => floatval($row['price']),
            'deskripsi' => $row['description'],
            'kategori' => $row['category'],
            'image' => $row['image']
        ];
    }

    echo json_encode(['products' => $products]);
}

function get_product($conn) {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID tidak valid']);
        return;
    }

    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($row = $res->fetch_assoc()) {
        echo json_encode([
            'id' => intval($row['id']),
            'nama' => $row['title'],
            'harga' => floatval($row['price']),
            'deskripsi' => $row['description'],
            'kategori' => $row['category'],
            'image' => $row['image']
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Produk tidak ditemukan']);
    }
    $stmt->close();
}

function add_product($conn) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['nama']) || empty($data['harga']) || empty($data['deskripsi']) || empty($data['kategori']) || empty($data['image'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Semua field wajib diisi.']);
        return;
    }

    $stmt = $conn->prepare("INSERT INTO products (title, price, description, category, image) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdsss", $data['nama'], $data['harga'], $data['deskripsi'], $data['kategori'], $data['image']);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Produk berhasil ditambahkan.', 'id' => $conn->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Gagal menambahkan produk.', 'details' => $stmt->error]);
    }
    $stmt->close();
}

function update_product($conn) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID produk wajib diisi.']);
        return;
    }

    $stmt = $conn->prepare("UPDATE products SET title=?, price=?, description=?, category=?, image=? WHERE id=?");
    $stmt->bind_param("sdsssi", $data['nama'], $data['harga'], $data['deskripsi'], $data['kategori'], $data['image'], $data['id']);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Produk berhasil diperbarui.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Gagal memperbarui produk.', 'details' => $stmt->error]);
    }
    $stmt->close();
}

function delete_product($conn) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID produk wajib diisi.']);
        return;
    }

    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $data['id']);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Produk berhasil dihapus.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Gagal menghapus produk.', 'details' => $stmt->error]);
    }
    $stmt->close();
}

/* ======================================================
   🔹 CATEGORY FUNCTIONS
   ====================================================== */

function get_categories($conn) {
    $query = "
        SELECT c.*, COUNT(p.id) as product_count 
        FROM categories c 
        LEFT JOIN products p ON c.slug = p.category 
        GROUP BY c.id 
        ORDER BY product_count DESC
    "; // <-- UBAH DI SINI
    
    $result = $conn->query($query);
    $categories = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $categories[] = [
                'id' => intval($row['id']),
                'name' => $row['name'],
                'slug' => $row['slug'],
                'product_count' => intval($row['product_count'])
            ];
        }
        echo json_encode(['success' => true, 'categories' => $categories]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Gagal memuat kategori: ' . $conn->error]);
    }
}

function get_category($conn) {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID tidak valid']);
        return;
    }

    $stmt = $conn->prepare("SELECT * FROM categories WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($row = $res->fetch_assoc()) {
        echo json_encode([
            'id' => intval($row['id']),
            'name' => $row['name'],
            'slug' => $row['slug']
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Kategori tidak ditemukan']);
    }
    $stmt->close();
}

function add_category($conn) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['name']) || empty($data['slug'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Nama dan slug wajib diisi.']);
        return;
    }

    // Check if slug already exists
    $stmt = $conn->prepare("SELECT id FROM categories WHERE slug = ?");
    $stmt->bind_param("s", $data['slug']);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->fetch_assoc()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Slug sudah digunakan. Gunakan slug yang berbeda.']);
        $stmt->close();
        return;
    }
    $stmt->close();

    // Insert category
    $stmt = $conn->prepare("INSERT INTO categories (name, slug) VALUES (?, ?)");
    $stmt->bind_param("ss", $data['name'], $data['slug']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Kategori berhasil ditambahkan.', 'id' => $conn->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Gagal menambahkan kategori.', 'details' => $stmt->error]);
    }
    $stmt->close();
}

function update_category($conn) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id']) || empty($data['name']) || empty($data['slug'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID, nama, dan slug wajib diisi.']);
        return;
    }

    // Check if slug exists for another category
    $stmt = $conn->prepare("SELECT id FROM categories WHERE slug = ? AND id != ?");
    $stmt->bind_param("si", $data['slug'], $data['id']);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->fetch_assoc()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Slug sudah digunakan oleh kategori lain.']);
        $stmt->close();
        return;
    }
    $stmt->close();

    // Get old slug to update products
    $stmt = $conn->prepare("SELECT slug FROM categories WHERE id = ?");
    $stmt->bind_param("i", $data['id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $oldCategory = $result->fetch_assoc();
    $stmt->close();

    // Update category
    $stmt = $conn->prepare("UPDATE categories SET name = ?, slug = ? WHERE id = ?");
    $stmt->bind_param("ssi", $data['name'], $data['slug'], $data['id']);

    if ($stmt->execute()) {
        // Update products with old slug to new slug
        if ($oldCategory && $oldCategory['slug'] !== $data['slug']) {
            $updateStmt = $conn->prepare("UPDATE products SET category = ? WHERE category = ?");
            $updateStmt->bind_param("ss", $data['slug'], $oldCategory['slug']);
            $updateStmt->execute();
            $updateStmt->close();
        }
        
        echo json_encode(['success' => true, 'message' => 'Kategori berhasil diperbarui.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Gagal memperbarui kategori.', 'details' => $stmt->error]);
    }
    $stmt->close();
}

function delete_category($conn) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID kategori wajib diisi.']);
        return;
    }

    // Check if category has products
    $stmt = $conn->prepare("
        SELECT COUNT(*) as count 
        FROM products p 
        JOIN categories c ON p.category = c.slug 
        WHERE c.id = ?
    ");
    $stmt->bind_param("i", $data['id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    
    if ($row['count'] > 0) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'error' => 'Tidak dapat menghapus kategori yang memiliki produk. Hapus atau pindahkan produk terlebih dahulu.'
        ]);
        return;
    }

    // Delete category
    $stmt = $conn->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->bind_param("i", $data['id']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Kategori berhasil dihapus.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Gagal menghapus kategori.', 'details' => $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>
