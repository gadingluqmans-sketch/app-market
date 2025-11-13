-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2025 at 07:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `penjualang_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Sayuran', 'sayuran', '2025-11-12 04:31:49', '2025-11-12 04:31:49'),
(2, 'Buah', 'buah', '2025-11-12 04:31:49', '2025-11-12 04:31:49'),
(4, 'Susu & Telur', 'susu-telur', '2025-11-12 04:31:49', '2025-11-12 04:31:49'),
(5, 'Daging', 'daging', '2025-11-12 04:31:49', '2025-11-12 04:31:49'),
(11, 'men\'s clothing', 'men\'s clothing', '2025-11-12 04:36:30', '2025-11-12 05:55:42'),
(12, 'jewelery', 'jewelery', '2025-11-12 04:36:30', '2025-11-12 04:36:30'),
(13, 'electronics', 'electronics', '2025-11-12 04:36:30', '2025-11-12 04:36:30'),
(14, 'try1', 'try1', '2025-11-12 06:00:28', '2025-11-12 06:00:28');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `price`, `description`, `category`, `image`) VALUES
(1, 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 150000.00, 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 'men\'s clothing', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png'),
(2, 'Mens Casual Premium Slim Fit T-Shirts', 300000.00, 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, lightweight & soft fabric for breathable and comfortable wearing. And solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans.', 'men\'s clothing', 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png'),
(3, 'Mens Cotton Jacket', 900000.00, 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.', 'men\'s clothing', 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png'),
(4, 'Mens Casual Slim Fit', 149999.99, 'The color could be slightly different between on the screen and in practice. Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.', 'men\'s clothing', 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png'),
(5, 'John Hardy Women\'s Legends Naga Gold & Silver Dragon Station Chain Bracelet', 695.00, 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean\'s pearl.', 'jewelery', 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png'),
(6, 'Solid Gold Petite Micropave', 168.00, 'Satisfaction Guaranteed. Return or exchange any order within 30 days.', 'jewelery', 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png'),
(7, 'White Gold Plated Princess', 9.99, 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.', 'jewelery', 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png'),
(8, 'Pierced Owl Rose Gold Plated Stainless Steel Double', 10.99, 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.', 'jewelery', 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png'),
(9, 'WD 2TB Elements Portable External Hard Drive - USB 3.0', 64.00, 'USB 3.0 and USB 2.0 compatibility. Fast data transfers, improve PC performance, high capacity.', 'electronics', 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png'),
(10, 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109.00, 'Easy upgrade for faster boot up, shutdown, application load and response.', 'electronics', 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png'),
(11, 'Plus Men\'s Light Blue Regular Fit Washed Jeans Stretchable', 200000.00, 'Make heads turn in this latest design of Urbano Plus Men\'s Light Blue Regular Fit Shaded Washed Stretch Jeans.', 'men\'s clothing', 'https://www.urbanofashion.com/cdn/shop/files/pluscfjeanp-001-lblue-1.jpg'),
(12, 'Wortel Segar 500gr', 8500.00, 'Wortel segar pilihan, manis dan renyah. Kaya vitamin A untuk kesehatan mata. Cocok untuk jus, sup, atau tumisan.', 'sayuran', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop'),
(13, 'Brokoli Hijau 1 Ikat', 12000.00, 'Brokoli segar kaya serat dan vitamin C. Sempurna untuk menu diet sehat keluarga.', 'sayuran', 'https://images.unsplash.com/photo-1584868147116-aa0e6ef427fc?w=400&h=400&fit=crop'),
(14, 'Bayam Hijau 1 Ikat', 5000.00, 'Bayam segar organik, kaya zat besi dan folat. Cocok untuk sayur bening atau jus hijau.', 'sayuran', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop'),
(15, 'Tomat Merah 500gr', 9500.00, 'Tomat merah segar, manis dan berair. Sempurna untuk sambal, salad, atau jus.', 'sayuran', 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop'),
(16, 'Kentang 1kg', 15000.00, 'Kentang berkualitas tinggi, cocok untuk digoreng, direbus, atau dipanggang.', 'sayuran', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop'),
(17, 'Kangkung Segar 1 Ikat', 4500.00, 'Kangkung segar pilihan, cocok untuk ca kangkung atau sayur bening.', 'sayuran', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop'),
(18, 'Sawi Hijau 1 Ikat', 5500.00, 'Sawi hijau segar dan renyah, kaya vitamin dan mineral penting.', 'sayuran', 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400&h=400&fit=crop'),
(19, 'Cabai Merah 250gr', 12000.00, 'Cabai merah segar dan pedas, cocok untuk bumbu masakan Indonesia.', 'sayuran', 'https://images.unsplash.com/photo-1583663818414-e0b2c3c9e14f?w=400&h=400&fit=crop'),
(20, 'Bawang Merah 500gr', 18000.00, 'Bawang merah berkualitas, harum dan tidak cepat busuk. Bumbu dapur wajib.', 'sayuran', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=400&fit=crop'),
(21, 'Bawang Putih 250gr', 16000.00, 'Bawang putih segar, aroma kuat dan tahan lama. Essential untuk masakan.', 'sayuran', 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=400&h=400&fit=crop'),
(22, 'Paprika Merah 250gr', 22000.00, 'Paprika merah segar, manis dan renyah. Kaya vitamin C dan antioksidan.', 'sayuran', 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop'),
(23, 'Timun Jepang 500gr', 11000.00, 'Timun Jepang segar dan renyah, sempurna untuk lalapan atau salad.', 'sayuran', 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop'),
(24, 'Jagung Manis 3 Buah', 14000.00, 'Jagung manis segar pilihan, manis dan lembut. Cocok direbus atau dibakar.', 'sayuran', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop'),
(25, 'Terong Ungu 500gr', 8000.00, 'Terong ungu segar, cocok untuk balado, sambel goreng, atau tumisan.', 'sayuran', 'https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=400&h=400&fit=crop'),
(26, 'Kol Putih 1 Buah', 10000.00, 'Kol putih segar dan renyah, cocok untuk tumisan atau salad coleslaw.', 'sayuran', 'https://images.unsplash.com/photo-1594282486554-4bd58fbab9f3?w=400&h=400&fit=crop'),
(27, 'Apel Fuji 1kg', 35000.00, 'Apel Fuji manis dan renyah, kaya serat dan vitamin. Sempurna untuk cemilan sehat.', 'buah', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop'),
(28, 'Jeruk Mandarin 1kg', 28000.00, 'Jeruk mandarin manis tanpa biji, mudah dikupas. Kaya vitamin C.', 'buah', 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop'),
(29, 'Pisang Cavendish 1 Sisir', 18000.00, 'Pisang Cavendish premium, manis dan lembut. Sumber energi alami.', 'buah', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop'),
(30, 'Anggur Hijau 500gr', 45000.00, 'Anggur hijau seedless, manis dan segar. Antioksidan tinggi.', 'buah', 'https://images.unsplash.com/photo-1599819177439-d5c3a4a8f8b6?w=400&h=400&fit=crop'),
(31, 'Semangka Merah 2kg', 20000.00, 'Semangka merah manis dan berair, sempurna untuk cuaca panas.', 'buah', 'https://images.unsplash.com/photo-1587049352846-4a222e784210?w=400&h=400&fit=crop'),
(32, 'Mangga Harum Manis 1kg', 32000.00, 'Mangga harum manis matang sempurna, manis legit dan harum.', 'buah', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop'),
(33, 'Pepaya California 1 Buah', 15000.00, 'Pepaya California manis, lembut dan kaya vitamin A. Baik untuk pencernaan.', 'buah', 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400&h=400&fit=crop'),
(34, 'Strawberry Segar 250gr', 38000.00, 'Strawberry segar dan manis, cocok untuk dessert atau dimakan langsung.', 'buah', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop'),
(35, 'Alpukat Mentega 500gr', 25000.00, 'Alpukat mentega matang sempurna, lembut dan creamy. Kaya lemak sehat.', 'buah', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop'),
(36, 'Nanas Madu 1 Buah', 22000.00, 'Nanas madu manis dan segar, kaya enzim bromelain untuk pencernaan.', 'buah', 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=400&h=400&fit=crop'),
(37, 'Melon Golden 1 Buah', 28000.00, 'Melon golden manis dan harum, daging buah tebal dan lembut.', 'buah', 'https://images.unsplash.com/photo-1582281298055-e25b2cd170e1?w=400&h=400&fit=crop'),
(38, 'Pear Hijau 500gr', 35000.00, 'Pear hijau segar dan renyah, manis dengan sedikit asam. Kaya serat.', 'buah', 'https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?w=400&h=400&fit=crop'),
(39, 'Jambu Air 500gr', 12000.00, 'Jambu air merah segar dan renyah, menyegarkan dan rendah kalori.', 'buah', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop'),
(40, 'Salak Pondoh 500gr', 15000.00, 'Salak pondoh manis dan legit, buah khas Indonesia yang menyegarkan.', 'buah', 'https://images.unsplash.com/photo-1628516235180-968db8aae95c?w=400&h=400&fit=crop'),
(41, 'Durian Medan 1kg', 85000.00, 'Durian Medan premium, daging tebal dan legit. Raja buah Indonesia.', 'buah', 'https://images.unsplash.com/photo-1604307908348-e3f8b6d8e4a3?w=400&h=400&fit=crop'),
(42, 'Daging Sapi Segar 500gr', 75000.00, 'Daging sapi pilihan, segar dan berkualitas tinggi. Cocok untuk rendang atau steak.', 'daging', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop'),
(43, 'Ayam Kampung Segar 1 Ekor', 65000.00, 'Ayam kampung segar, daging lebih padat dan gurih. Cocok untuk sup atau bakar.', 'daging', 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop'),
(44, 'Ikan Salmon Fillet 250gr', 95000.00, 'Salmon fillet segar, kaya omega-3. Sempurna untuk grilled atau sushi.', 'daging', 'https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?w=400&h=400&fit=crop'),
(45, 'Dada Ayam Fillet 500gr', 42000.00, 'Dada ayam fillet tanpa tulang, protein tinggi rendah lemak. Cocok untuk diet.', 'daging', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop'),
(46, 'Ikan Tongkol Segar 500gr', 35000.00, 'Ikan tongkol segar, cocok untuk balado, rica-rica, atau pindang.', 'daging', 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop'),
(47, 'Udang Vaname Besar 500gr', 85000.00, 'Udang vaname segar ukuran besar, cocok untuk menu spesial.', 'daging', 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop'),
(48, 'Bakso Sapi Premium 500gr', 45000.00, 'Bakso sapi premium kenyal dan gurih, daging asli tanpa pengawet.', 'daging', 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=400&fit=crop'),
(49, 'Sosis Ayam isi 10', 38000.00, 'Sosis ayam berkualitas, cocok untuk sarapan atau bekal anak.', 'daging', 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=400&h=400&fit=crop'),
(50, 'Daging Kambing Segar 500gr', 90000.00, 'Daging kambing segar pilihan, cocok untuk sate, gulai, atau tongseng.', 'daging', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop'),
(51, 'Cumi Segar 500gr', 55000.00, 'Cumi-cumi segar, tekstur kenyal dan gurih. Cocok untuk tumis atau goreng tepung.', 'daging', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=400&fit=crop'),
(52, 'Telur Ayam Negeri isi 10', 22000.00, 'Telur ayam negeri segar, kaya protein. Cocok untuk segala masakan.', 'susu-telur', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop'),
(53, 'Susu UHT Full Cream 1 Liter', 18000.00, 'Susu UHT full cream, kaya kalsium dan vitamin D. Baik untuk tulang.', 'susu-telur', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop'),
(54, 'Keju Cheddar 200gr', 35000.00, 'Keju cheddar premium, gurih dan creamy. Cocok untuk sandwich atau pasta.', 'susu-telur', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop'),
(55, 'Yogurt Plain 500ml', 25000.00, 'Yogurt plain alami, kaya probiotik untuk kesehatan pencernaan.', 'susu-telur', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop'),
(56, 'Mentega Tawar 200gr', 28000.00, 'Mentega tawar berkualitas, cocok untuk baking atau masakan.', 'susu-telur', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop'),
(57, 'Telur Puyuh isi 20', 12000.00, 'Telur puyuh segar, cocok untuk asinan, sup, atau dimakan rebus.', 'susu-telur', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop'),
(58, 'Susu Kental Manis 370gr', 12500.00, 'Susu kental manis premium, manis dan creamy untuk berbagai resep.', 'susu-telur', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop'),
(59, 'Keju Parut 100gr', 22000.00, 'Keju parut siap pakai, praktis untuk taburan pizza atau pasta.', 'susu-telur', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop'),
(60, 'Susu Kedelai 1 Liter', 15000.00, 'Susu kedelai organik, alternatif susu nabati yang sehat.', 'susu-telur', 'https://images.unsplash.com/photo-1600788907416-456578634209?w=400&h=400&fit=crop'),
(61, 'Cream Cheese 200gr', 42000.00, 'Cream cheese premium, lembut dan creamy. Cocok untuk cheesecake.', 'susu-telur', 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=400&fit=crop');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
