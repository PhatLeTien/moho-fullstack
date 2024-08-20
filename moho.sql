-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 20, 2024 lúc 06:57 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `moho`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisp`
--

CREATE TABLE `loaisp` (
  `id_loaisanpham` int(11) NOT NULL,
  `ten_loaisp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisp`
--

INSERT INTO `loaisp` (`id_loaisanpham`, `ten_loaisp`) VALUES
(1, 'Tủ Bếp'),
(2, 'Bàn ghế');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `ten_sanpham` varchar(255) NOT NULL,
  `mo_ta` text NOT NULL,
  `gia` int(11) NOT NULL,
  `id_loaisanpham` int(11) NOT NULL,
  `anh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`id`, `ten_sanpham`, `mo_ta`, `gia`, `id_loaisanpham`, `anh`) VALUES
(11, 'Tủ Bếp Premium Grenaa ', '- Cánh tủ: gỗ MFC phủ Melamine, dày 18mm, chuẩn CARB P2 (*)\r\n\r\n- Thân tủ: gỗ MFC phủ foil, dày 18mm, chuẩn CARB P2 (*)\r\n\r\n- Thân tủ chậu rửa: Picomat chống nước, dày 18mm.', 890, 1, 'tu-bep-1.webp'),
(12, 'Tủ Bếp Premium Ubeda', '- Cánh tủ: gỗ MFC phủ Melamine, dày 18mm, chuẩn CARB P2 (*)\r\n\r\n- Thân tủ: gỗ MFC phủ foil, dày 18mm, chuẩn CARB P2 (*)\r\n\r\n- Thân tủ chậu rửa: Picomat chống nước, dày 18mm.', 900, 1, 'tu-bep-6.webp'),
(13, 'Hệ tủ bếp MOHO Kitchen Essential Grenaa Nhiều Kích Thước', '- Cánh tủ: gỗ MFC phủ Melamine, dày 18mm, chuẩn CARB P2 (*)\r\n\r\n- Thân tủ: gỗ MFC phủ foil, dày 18mm, chuẩn CARB P2 (*)\r\n\r\n- Thân tủ chậu rửa: Picomat chống nước, dày 18mm.', 1200000, 1, 'tu-bep-2.webp'),
(14, 'Hệ tủ bếp MOHO Kitchen Essential Ubeda Nhiều Kích Thước', '- Cánh tủ: gỗ MFC phủ Melamine, dày 18mm, chuẩn CARB P2 (*)\r\n\r\n- Thân tủ: gỗ MFC phủ foil, dày 18mm, chuẩn CARB P2 (*)\r\n\r\n- Thân tủ chậu rửa: Picomat chống nước, dày 18mm.', 5000000, 1, 'tu-bep-3.webp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `signup`
--

CREATE TABLE `signup` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `signup`
--

INSERT INTO `signup` (`id`, `name`, `email`, `password`) VALUES
(1, 'thuc', 'sieunhangao0985@gmail.com', '123');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `loaisp`
--
ALTER TABLE `loaisp`
  ADD PRIMARY KEY (`id_loaisanpham`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_loaisanpham` (`id_loaisanpham`);

--
-- Chỉ mục cho bảng `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `loaisp`
--
ALTER TABLE `loaisp`
  MODIFY `id_loaisanpham` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `signup`
--
ALTER TABLE `signup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`id_loaisanpham`) REFERENCES `loaisp` (`id_loaisanpham`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
