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
-- Table structure for table `phieugoitien`
--

CREATE TABLE `phieugoitien` (
  `matietkiem` bigint(20) NOT NULL,
  `SOTAIKHOAN` bigint(20) DEFAULT NULL,
  `NGAYGOI` date DEFAULT NULL,
  `SOTIENGOI` double DEFAULT NULL,
  `SODUHIENCO` double DEFAULT NULL,
  `TIENLAIPHATSINH_DUKIEN` double DEFAULT NULL,
  `NGAYDAOHAN` date DEFAULT NULL,
  `LAISUATAPDUNG` float DEFAULT NULL,
  `MALOAITIETKIEM` int(11) DEFAULT NULL,
  `MAHINHTHUCGIAHAN` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phieugoitien`
--
INSERT INTO `phieugoitien` (`matietkiem`, `SOTAIKHOAN`, `NGAYGOI`, `SOTIENGOI`, `SODUHIENCO`, `TIENLAIPHATSINH_DUKIEN`, `NGAYDAOHAN`, `LAISUATAPDUNG`, `MALOAITIETKIEM`, `MAHINHTHUCGIAHAN`) VALUES
(1001, 1011, '2024-09-28', 1000000, 1000000, 50000, '2024-12-28', 5, 1, 1),
(1002, 1012, '2024-06-28', 2000000, 2000000, 110000, '2024-12-28', 5.5, 2, 2),
(1003, 1013, '2024-10-28', 1500000, 1500000, 75000, '2025-01-28', 5, 1, 3),
(1004, 1014, '2024-08-25', 2500000, 2500000, 137500, '2025-02-25', 5.5, 2, 1),
(1005, 1015, '2024-09-12', 3000000, 3000000, 15000, '2024-10-12', 0.5, 3, 2),
(1006, 1016, '2024-11-04', 1200000, 1200000, 60000, '2025-02-04', 5, 1, 3),
(1007, 1017, '2024-10-07', 1800000, 1800000, 99000, '2025-04-07', 5.5, 2, 1),
(1008, 1018, '2024-09-16', 2000000, 2000000, 10000, '2024-10-16', 0.5, 3, 2),
(1009, 1019, '2024-11-19', 1400000, 1400000, 70000, '2025-02-19', 5, 1, 3),
(1010, 1020, '2024-10-23', 2200000, 2200000, 121000, '2025-04-23', 5.5, 2, 1),
(1011, 1011, '2024-10-11', 2600000, 2600000, 13000, '2024-11-11', 0.5, 3, 2),
(1012, 1012, '2024-11-27', 1300000, 1300000, 65000, '2025-02-27', 5, 1, 3),
(1013, 1013, '2024-11-01', 2400000, 2400000, 132000, '2025-05-01', 5.5, 2, 1),
(1014, 1014, '2024-10-21', 1700000, 1700000, 85000, '2025-01-21', 5, 1, 2),
(1015, 1015, '2024-09-28', 3100000, 3100000, 15500, '2024-10-28', 0.5, 3, 3);

--
-- Triggers `phieugoitien`
--
DELIMITER $$
CREATE TRIGGER `TG_INS_PGT_BCDSN` AFTER INSERT ON `phieugoitien` FOR EACH ROW BEGIN
    -- Kiểm tra nếu ngày hiện tại và loại tiết kiệm chưa tồn tại trong bảng báo cáo doanh số
    IF NOT EXISTS (
        SELECT 1 
        FROM bcdoanhsongay 
        WHERE NGAY = NEW.NGAYGOI AND MALOAITIETKIEM = NEW.MALOAITIETKIEM
    ) THEN
        -- Thêm bản ghi mới vào bảng báo cáo doanh số ngày
        INSERT INTO bcdoanhsongay(NGAY, MALOAITIETKIEM, TONGTIENGOI, TONGTIENRUT, CHENHLECH) 
        VALUES(NEW.NGAYGOI, NEW.MALOAITIETKIEM, 0, 0, 0);
    END IF;
    
    -- Cập nhật tổng tiền gửi và chênh lệch
    UPDATE bcdoanhsongay
    SET TONGTIENGOI = TONGTIENGOI + NEW.SOTIENGOI,
        CHENHLECH = TONGTIENGOI - TONGTIENRUT
    WHERE NGAY = NEW.NGAYGOI AND MALOAITIETKIEM = NEW.MALOAITIETKIEM;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `phieugoitien`
--
ALTER TABLE `phieugoitien`
  ADD PRIMARY KEY (`matietkiem`),
  ADD KEY `FK_PGT_TK` (`SOTAIKHOAN`),
  ADD KEY `FK_PGT_HTGH` (`MAHINHTHUCGIAHAN`),
  ADD KEY `FK_PGT_PRT` (`MALOAITIETKIEM`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `phieugoitien`
--
ALTER TABLE `phieugoitien`
  MODIFY `matietkiem` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1008;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `phieugoitien`
--
ALTER TABLE `phieugoitien`
  ADD CONSTRAINT `FK_PGT_HTGH` FOREIGN KEY (`MAHINHTHUCGIAHAN`) REFERENCES `hinhthucgiahan` (`MAHINHTHUCGIAHAN`),
  ADD CONSTRAINT `FK_PGT_PRT` FOREIGN KEY (`MALOAITIETKIEM`) REFERENCES `loaitietkiem` (`MALOAITIETKIEM`),
  ADD CONSTRAINT `FK_PGT_TK` FOREIGN KEY (`SOTAIKHOAN`) REFERENCES `taikhoan` (`SOTAIKHOAN`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;