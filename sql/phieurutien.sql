-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2024 at 06:52 AM
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
-- Table structure for table `phieurutien`
--

CREATE TABLE `phieurutien` (
  `magiaodich` bigint(20) NOT NULL,
  `MATIETKIEM` bigint(20) DEFAULT NULL,
  `NGAYRUT` date DEFAULT NULL,
  `SOTIENRUT` double DEFAULT NULL,
  `SOTIENCONLAI` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phieurutien`
--

INSERT INTO `phieurutien` (`magiaodich`, `MATIETKIEM`, `NGAYRUT`, `SOTIENRUT`, `SOTIENCONLAI`) VALUES
(1003, 1001, '2025-01-15', 200000, 800000),
(1004, 1002, '2025-02-10', 500000, 1500000),
(1005, 1003, '2025-03-05', 300000, 1200000),
(1006, 1004, '2025-04-20', 1000000, 1500000),
(1007, 1005, '2025-05-18', 1500000, 1500000),
(1008, 1006, '2025-06-12', 200000, 1000000),
(1009, 1007, '2025-07-08', 800000, 1000000),
(1010, 1008, '2025-08-14', 500000, 1500000),
(1003, 1009, '2025-09-22', 400000, 1000000),
(1009, 1010, '2025-10-30', 1000000, 1200000);

--
-- Triggers `phieurutien`
--
DELIMITER $$
CREATE TRIGGER `TG_INS_PHIEURUTIEN_BCDSN` AFTER INSERT ON `phieurutien` FOR EACH ROW BEGIN
    DECLARE MALTK INT;
    
    SELECT L.MALOAITIETKIEM INTO MALTK
    FROM phieugoitien L
    WHERE L.MATIETKIEM = NEW.MATIETKIEM
    LIMIT 1;

    -- Kiểm tra nếu ngày hiện tại và loại tiết kiệm chưa tồn tại trong bảng bcdoanhsongay
    IF NOT EXISTS (
        SELECT 1 
        FROM bcdoanhsongay 
        WHERE NGAY = NEW.NGAYRUT AND MALOAITIETKIEM = MALTK
    ) THEN
        -- Thêm một bản ghi mới với các giá trị khởi tạo
        INSERT INTO bcdoanhsongay (NGAY, MALOAITIETKIEM, TONGTIENGOI, TONGTIENRUT, CHENHLECH)
        VALUES (NEW.NGAYRUT, MALTK, 0, 0, 0);
    END IF;

    UPDATE bcdoanhsongay
    SET TONGTIENRUT = NEW.SOTIENRUT + TONGTIENRUT,
        CHENHLECH = TONGTIENGOI - TONGTIENRUT
    WHERE NGAY = NEW.NGAYRUT AND MALOAITIETKIEM = MALTK;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `phieurutien`
--
ALTER TABLE `phieurutien`
  ADD PRIMARY KEY (`magiaodich`),
  ADD KEY `FK_PRT_PGT` (`MATIETKIEM`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `phieurutien`
--
ALTER TABLE `phieurutien`
  MODIFY `magiaodich` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2008;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `phieurutien`
--
ALTER TABLE `phieurutien`
  ADD CONSTRAINT `FK_PRT_PGT` FOREIGN KEY (`MATIETKIEM`) REFERENCES `phieugoitien` (`matietkiem`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
