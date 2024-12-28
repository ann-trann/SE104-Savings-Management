-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2024 at 06:53 AM
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
-- Database: `saving_money`
--

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `SOTAIKHOAN` bigint(20) NOT NULL,
  `TENKHACHHANG` varchar(255) DEFAULT NULL,
  `SDT` varchar(255) DEFAULT NULL,
  `CMND` varchar(255) DEFAULT NULL,
  `DIACHI` varchar(255) DEFAULT NULL,
  `NGAYMOTK` date DEFAULT NULL,
  `SODU` double DEFAULT NULL,
  `PASSWORD` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`SOTAIKHOAN`, `TENKHACHHANG`, `SDT`, `CMND`, `DIACHI`, `NGAYMOTK`, `SODU`, `PASSWORD`) VALUES
(1011, 'Nguyen Thi A', '0912345678', '123456789', '123 Duong A, TP.HCM', '2024-12-01', 1000000, 'passwordA'),
(1012, 'Tran Thi B', '0987654321', '987654321', '456 Duong B, Ha Noi', '2024-12-02', 2000000, 'passwordB'),
(1013, 'Le Van C', '0931112222', '654321987', '789 Duong C, Da Nang', '2024-12-03', 3000000, 'passwordC'),
(1014, 'Pham Thi D', '0943334444', '321789654', '101 Duong D, Can Tho', '2024-12-04', 4000000, 'passwordD'),
(1015, 'Hoang Van E', '0955556666', '123789456', '202 Duong E, Hai Phong', '2024-12-05', 5000000, 'passwordE'),
(1016, 'Vu Thi F', '0967778888', '789123654', '303 Duong F, Hue', '2024-12-06', 6000000, 'passwordF'),
(1017, 'Ngo Van G', '0979990000', '456123789', '404 Duong G, Nha Trang', '2024-12-07', 7000000, 'passwordG'),
(1018, 'Dang Thi H', '0922223333', '987321456', '505 Duong H, Vung Tau', '2024-12-08', 8000000, 'passwordH'),
(1019, 'Do Van I', '0934445555', '321654987', '606 Duong I, Binh Duong', '2024-12-09', 9000000, 'passwordI'),
(1020, 'Nguyen Thi J', '0946667777', '654987321', '707 Duong J, Long An', '2024-12-10', 10000000, 'passwordJ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`SOTAIKHOAN`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `SOTAIKHOAN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1021;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
