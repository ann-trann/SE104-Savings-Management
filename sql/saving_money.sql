-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2025 at 09:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `bcdoanhsongay`
--

CREATE TABLE `bcdoanhsongay` (
  `NGAY` date NOT NULL,
  `MALOAITIETKIEM` int(11) NOT NULL,
  `TONGTIENGOI` double DEFAULT NULL,
  `TONGTIENRUT` double DEFAULT NULL,
  `CHENHLECH` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bcdoanhsongay`
--

INSERT INTO `bcdoanhsongay` (`NGAY`, `MALOAITIETKIEM`, `TONGTIENGOI`, `TONGTIENRUT`, `CHENHLECH`) VALUES
('2024-05-25', 1, 0, 2100000, -2100000),
('2024-06-01', 1, 2000000, 0, 2000000),
('2024-06-01', 2, 5000000, 0, 5000000),
('2024-07-01', 1, 3000000, 0, 3000000),
('2024-07-01', 2, 4000000, 0, 4000000),
('2024-07-15', 1, 0, 1700000, -1700000),
('2024-07-20', 2, 0, 1500000, -1500000),
('2024-08-01', 1, 6000000, 0, 6000000),
('2024-08-15', 3, 7000000, 2000000, 5000000),
('2024-09-01', 2, 8000000, 0, 8000000),
('2024-09-15', 1, 4500000, 500000, 4000000),
('2024-10-01', 3, 5000000, 0, 5000000),
('2024-10-15', 1, 6000000, 800000, 5200000),
('2024-11-25', 1, 0, 1800000, -1800000),
('2024-12-15', 2, 0, 1000000, -1000000),
('2024-12-15', 3, 0, 1900000, -1900000),
('2024-12-28', 1, 30211111, 13000000, 17211111),
('2024-12-28', 2, 30900000, 0, 30900000),
('2024-12-28', 3, 15700000, 2500000, 13200000),
('2024-12-29', 1, 0, 0, 0),
('2024-12-29', 6, 9000000, 0, 9000000),
('2025-01-07', 1, 0, 0, 0),
('2025-01-15', 1, 0, 200000, -200000),
('2025-01-15', 2, 0, 1200000, -1200000),
('2025-02-10', 2, 0, 500000, -500000),
('2025-03-05', 1, 0, 300000, -300000),
('2025-04-20', 2, 0, 1000000, -1000000),
('2025-05-18', 3, 0, 1500000, -1500000),
('2025-06-12', 1, 0, 200000, -200000),
('2025-07-08', 2, 0, 800000, -800000),
('2025-08-14', 3, 0, 500000, -500000),
('2025-09-22', 1, 0, 400000, -400000),
('2025-10-30', 2, 0, 1000000, -1000000);

-- --------------------------------------------------------

--
-- Table structure for table `hinhthucgiahan`
--

CREATE TABLE `hinhthucgiahan` (
  `MAHINHTHUCGIAHAN` int(11) NOT NULL,
  `GIAHANGOC` tinyint(1) DEFAULT NULL,
  `GIAHANLAI` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hinhthucgiahan`
--

INSERT INTO `hinhthucgiahan` (`MAHINHTHUCGIAHAN`, `GIAHANGOC`, `GIAHANLAI`) VALUES
(1, 1, 1),
(2, 1, 0),
(3, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `loaitietkiem`
--

CREATE TABLE `loaitietkiem` (
  `MALOAITIETKIEM` int(11) NOT NULL,
  `KYHAN` int(11) DEFAULT NULL,
  `LAISUAT` float DEFAULT NULL,
  `NGAYAPDUNGLAISUAT` date DEFAULT NULL,
  `SONGAYTOITHIEURUTTIEN` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loaitietkiem`
--

INSERT INTO `loaitietkiem` (`MALOAITIETKIEM`, `KYHAN`, `LAISUAT`, `NGAYAPDUNGLAISUAT`, `SONGAYTOITHIEURUTTIEN`) VALUES
(1, 3, 0.05, '2024-01-01', 90),
(2, 6, 0.055, '2024-01-01', 180),
(3, 0, 0.005, '2024-01-01', 0),
(6, 9, 0.06, '2024-12-29', 270);

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
(1001, 1001, '2024-06-01', 2000000, 2000000, 50000, '2024-09-01', 5, 1, 1),
(1002, 1002, '2024-06-01', 5000000, 5000000, 137500, '2024-12-01', 5.5, 2, 2),
(1003, 1003, '2024-07-01', 3000000, 0, 45000, '2024-10-01', 5, 1, 1),
(1004, 1004, '2024-07-01', 4000000, 4000000, 110000, '2025-01-01', 5.5, 2, 2),
(1005, 1005, '2024-08-01', 6000000, 6000000, 90000, '2024-11-01', 5, 1, 1),
(1006, 1006, '2024-08-15', 7000000, 4500000, 175000, '2025-02-15', 0.5, 3, 3),
(1007, 1007, '2024-09-01', 8000000, 8000000, 240000, '2025-03-01', 5.5, 2, 2),
(1008, 1008, '2024-09-15', 4500000, 4500000, 67500, '2024-12-15', 5, 1, 1),
(1009, 1009, '2024-10-01', 5000000, 5000000, 137500, '2025-04-01', 0.5, 3, 3),
(1010, 1010, '2024-10-15', 6000000, 6000000, 90000, '2025-01-15', 5, 1, 1),
(1011, 1011, '2024-12-28', 1000000, 1000000, 50000, '2025-01-28', 5, 1, 1),
(1012, 1012, '2024-12-28', 2000000, 2000000, 110000, '2025-06-28', 5.5, 2, 2),
(1013, 1013, '2024-12-28', 1500000, 1500000, 75000, '2025-03-28', 5, 1, 3),
(1014, 1014, '2024-12-28', 2500000, 2500000, 137500, '2025-06-28', 5.5, 2, 1),
(1015, 1015, '2024-12-28', 3000000, 3000000, 15000, '2025-12-28', 0.5, 3, 2),
(1016, 1016, '2024-12-28', 1200000, 1200000, 60000, '2025-03-28', 5, 1, 3),
(1017, 1017, '2024-12-28', 1800000, 1800000, 99000, '2025-06-28', 5.5, 2, 1),
(1018, 1018, '2024-12-28', 2000000, 2000000, 10000, '2025-12-28', 0.5, 3, 2),
(1019, 1019, '2024-12-28', 1400000, 1400000, 70000, '2025-03-28', 5, 1, 3),
(1020, 1020, '2024-12-28', 2200000, 2200000, 121000, '2025-06-28', 5.5, 2, 1),
(1021, 1011, '2024-12-28', 2600000, 2600000, 13000, '2025-12-28', 0.5, 3, 2),
(1022, 1012, '2024-12-28', 1300000, 1300000, 65000, '2025-03-28', 5, 1, 3),
(1023, 1013, '2024-12-28', 2400000, 2400000, 132000, '2025-06-28', 5.5, 2, 1),
(1024, 1014, '2024-12-28', 1700000, 1700000, 85000, '2025-03-28', 5, 1, 2),
(1025, 1015, '2024-12-28', 3100000, 3100000, 15500, '2025-11-28', 0.5, 3, 3),
(1026, 1021, '2024-12-28', 20000000, 20000000, 0, '2025-06-26', 5.5, 2, 1),
(1027, 1021, '2024-12-28', 5000000, 5000000, 0, '2024-12-28', 0.5, 3, 1),
(1029, 1021, '2024-12-01', 1000000, 10000000, 0, '2025-03-01', 5, 1, 1),
(1030, 1003, '2024-12-28', 10000000, 0, 0, '2025-03-28', 5, 1, 2),
(1031, 1001, '2024-12-28', 11111111, 11111111, 0, '2025-03-28', 5, 1, 1),
(1032, 1021, '2024-12-29', 9000000, 9000000, 0, '2025-09-25', 6, 6, 1);

--
-- Triggers `phieugoitien`
--
DELIMITER $$
CREATE TRIGGER `TG_INS_PGT_BCDSN` AFTER INSERT ON `phieugoitien` FOR EACH ROW BEGIN
    -- Check if current date and savings type don't exist in daily sales report
    IF NOT EXISTS (
        SELECT 1 
        FROM bcdoanhsongay 
        WHERE NGAY = CURDATE() 
        AND MALOAITIETKIEM = NEW.MALOAITIETKIEM
    ) THEN
        -- Add new record to daily sales report
        INSERT INTO bcdoanhsongay(NGAY, MALOAITIETKIEM, TONGTIENGOI, TONGTIENRUT, CHENHLECH) 
        VALUES(CURDATE(), NEW.MALOAITIETKIEM, 0, 0, 0);
    END IF;
    
    -- Update total deposits and calculate difference
    UPDATE bcdoanhsongay
    SET TONGTIENGOI = TONGTIENGOI + NEW.SOTIENGOI,
        CHENHLECH = TONGTIENGOI - TONGTIENRUT
    WHERE NGAY = CURDATE() 
    AND MALOAITIETKIEM = NEW.MALOAITIETKIEM;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TG_UPD_PGT_BCDSN` AFTER UPDATE ON `phieugoitien` FOR EACH ROW BEGIN
    -- Check if current date and savings type don't exist in daily sales report
    IF NOT EXISTS (
        SELECT 1 
        FROM bcdoanhsongay 
        WHERE NGAY = CURDATE() 
        AND MALOAITIETKIEM = NEW.MALOAITIETKIEM
    ) THEN
        -- Add new record to daily sales report
        INSERT INTO bcdoanhsongay(NGAY, MALOAITIETKIEM, TONGTIENGOI, TONGTIENRUT, CHENHLECH) 
        VALUES(CURDATE(), NEW.MALOAITIETKIEM, 0, 0, 0);
    END IF;
    
    -- Update total deposits and calculate difference
    UPDATE bcdoanhsongay
    SET TONGTIENGOI = TONGTIENGOI + (NEW.SOTIENGOI - OLD.SOTIENGOI),
        CHENHLECH = TONGTIENGOI - TONGTIENRUT
    WHERE NGAY = CURDATE() 
    AND MALOAITIETKIEM = NEW.MALOAITIETKIEM;
END
$$
DELIMITER ;

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
(2001, 1001, '2024-09-15', 500000, 0),
(2002, 1002, '2024-12-15', 1000000, 0),
(2003, 1003, '2024-10-15', 800000, 0),
(2004, 1004, '2025-01-15', 1200000, 0),
(2005, 1005, '2024-07-15', 1700000, 0),
(2006, 1006, '2024-08-15', 2000000, 0),
(2007, 1007, '2024-07-20', 1500000, 0),
(2008, 1008, '2024-11-25', 1800000, 0),
(2009, 1009, '2024-12-15', 1900000, 0),
(2010, 1010, '2024-05-25', 2100000, 0),
(2011, 1011, '2025-01-15', 200000, 800000),
(2012, 1012, '2025-02-10', 500000, 1500000),
(2013, 1013, '2025-03-05', 300000, 1200000),
(2014, 1014, '2025-04-20', 1000000, 1500000),
(2015, 1015, '2025-05-18', 1500000, 1500000),
(2016, 1016, '2025-06-12', 200000, 1000000),
(2017, 1017, '2025-07-08', 800000, 1000000),
(2018, 1018, '2025-08-14', 500000, 1500000),
(2019, 1019, '2025-09-22', 400000, 1000000),
(2020, 1020, '2025-10-30', 1000000, 1200000),
(2021, 1006, '2024-12-28', 2500000, 4500000),
(2022, 1003, '2024-12-28', 3000000, 0),
(2023, 1030, '2024-12-28', 10000000, 0);

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
(1001, 'Nguyen Van A', '0901234567', '123456789012', '123 ABC Street', '2024-01-01', 5000000, '123'),
(1002, 'Nguyen Thi Nhung', '0906849265', '12349876556', '12 pham van dong street', '2024-01-01', 7000000, '123'),
(1003, 'Huynh Thi Man', '0907589468', '657849637856', '123 Nguyen Trai Street', '2024-01-01', 22000000, '123'),
(1004, 'Huynh Van Cuong', '8694859059', '575937589354', '23 To Thuc Street', '2024-01-01', 7000000, '123'),
(1005, 'Huynh Gia Phu', '0687492674', '123456789012', '123 ABC Street', '2024-01-01', 5000000, '123'),
(1006, 'Le Van Thanh', '0912345678', '987654321098', '45 Hai Ba Trung Street', '2024-01-01', 10500000, '123'),
(1007, 'Tran Thi Hoa', '0908765432', '876543210987', '67 Tran Hung Dao Street', '2024-01-01', 6000000, '123'),
(1008, 'Nguyen Van An', '0911111111', '123123123123', '89 Le Loi Street', '2024-01-01', 4000000, '123'),
(1009, 'Pham Van Minh', '0922222222', '321321321321', '101 Nguyen Hue Street', '2024-01-01', 9000000, '123'),
(1010, 'Do Thi Lan', '0933333333', '456456456456', '12 Cong Quynh Street', '2024-01-01', 5000000, '123'),
(1011, 'Nguyen Thi A', '0912345678', '123456789', '123 Duong A, TP.HCM', '2024-12-01', 1000000, 'passwordA'),
(1012, 'Tran Thi B', '0987654321', '987654321', '456 Duong B, Ha Noi', '2024-12-02', 2000000, 'passwordB'),
(1013, 'Le Van C', '0931112222', '654321987', '789 Duong C, Da Nang', '2024-12-03', 3000000, 'passwordC'),
(1014, 'Pham Thi D', '0943334444', '321789654', '101 Duong D, Can Tho', '2024-12-04', 4000000, 'passwordD'),
(1015, 'Hoang Van E', '0955556666', '123789456', '202 Duong E, Hai Phong', '2024-12-05', 5000000, 'passwordE'),
(1016, 'Vu Thi Phuong', '0967778888', '789123654', '303 Duong Duong, Hue', '2024-12-06', 6000000, 'passwordF'),
(1017, 'Ngo Van G', '0979990000', '456123789', '404 Duong G, Nha Trang', '2024-12-07', 7000000, 'passwordG'),
(1018, 'Dang Thi H', '0922223333', '987321456', '505 Duong H, Vung Tau', '2024-12-08', 8000000, 'passwordH'),
(1019, 'Do Van I', '0934445555', '321654987', '606 Duong I, Binh Duong', '2024-12-09', 9000000, 'passwordI'),
(1020, 'Nguyen Thi J', '0946667777', '654987321', '707 Duong J, Long An', '2024-12-10', 10000000, 'passwordJ'),
(1021, 'Trần Thúy An', '1234567890', '123412341234', 'ktx b', '2024-12-28', 10000000, '123123123');

-- --------------------------------------------------------

--
-- Table structure for table `thamso`
--

CREATE TABLE `thamso` (
  `TENTHAMSO` varchar(255) NOT NULL,
  `GIATRI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thamso`
--

INSERT INTO `thamso` (`TENTHAMSO`, `GIATRI`) VALUES
('Tien toi thieu', 1000000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `role`, `name`) VALUES
('anhhuynh', '123', 'Admin', 'Huỳnh Thị Ngọc Ánh'),
('antrann', '123', 'Staff', 'Trần Thúy An'),
('bao01', '123', 'Admin', 'Nguyễn Thái Bảo'),
('connghuynh', '123', 'Admin', 'Huỳnh Lê Quốc Công'),
('tuananh', '123', 'Staff', 'Phan Nguyễn Tuấn Anh');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bcdoanhsongay`
--
ALTER TABLE `bcdoanhsongay`
  ADD PRIMARY KEY (`NGAY`,`MALOAITIETKIEM`),
  ADD KEY `FK_BCDSN_LTK` (`MALOAITIETKIEM`);

--
-- Indexes for table `hinhthucgiahan`
--
ALTER TABLE `hinhthucgiahan`
  ADD PRIMARY KEY (`MAHINHTHUCGIAHAN`);

--
-- Indexes for table `loaitietkiem`
--
ALTER TABLE `loaitietkiem`
  ADD PRIMARY KEY (`MALOAITIETKIEM`);

--
-- Indexes for table `phieugoitien`
--
ALTER TABLE `phieugoitien`
  ADD PRIMARY KEY (`matietkiem`),
  ADD KEY `FK_PGT_TK` (`SOTAIKHOAN`),
  ADD KEY `FK_PGT_HTGH` (`MAHINHTHUCGIAHAN`),
  ADD KEY `FK_PGT_PRT` (`MALOAITIETKIEM`);

--
-- Indexes for table `phieurutien`
--
ALTER TABLE `phieurutien`
  ADD PRIMARY KEY (`magiaodich`),
  ADD KEY `FK_PRT_PGT` (`MATIETKIEM`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`SOTAIKHOAN`);

--
-- Indexes for table `thamso`
--
ALTER TABLE `thamso`
  ADD PRIMARY KEY (`TENTHAMSO`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loaitietkiem`
--
ALTER TABLE `loaitietkiem`
  MODIFY `MALOAITIETKIEM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `phieugoitien`
--
ALTER TABLE `phieugoitien`
  MODIFY `matietkiem` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1034;

--
-- AUTO_INCREMENT for table `phieurutien`
--
ALTER TABLE `phieurutien`
  MODIFY `magiaodich` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2024;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `SOTAIKHOAN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1025;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bcdoanhsongay`
--
ALTER TABLE `bcdoanhsongay`
  ADD CONSTRAINT `FK_BCDSN_LTK` FOREIGN KEY (`MALOAITIETKIEM`) REFERENCES `loaitietkiem` (`MALOAITIETKIEM`);

--
-- Constraints for table `phieugoitien`
--
ALTER TABLE `phieugoitien`
  ADD CONSTRAINT `FK_PGT_HTGH` FOREIGN KEY (`MAHINHTHUCGIAHAN`) REFERENCES `hinhthucgiahan` (`MAHINHTHUCGIAHAN`),
  ADD CONSTRAINT `FK_PGT_PRT` FOREIGN KEY (`MALOAITIETKIEM`) REFERENCES `loaitietkiem` (`MALOAITIETKIEM`),
  ADD CONSTRAINT `FK_PGT_TK` FOREIGN KEY (`SOTAIKHOAN`) REFERENCES `taikhoan` (`SOTAIKHOAN`);

--
-- Constraints for table `phieurutien`
--
ALTER TABLE `phieurutien`
  ADD CONSTRAINT `FK_PRT_PGT` FOREIGN KEY (`MATIETKIEM`) REFERENCES `phieugoitien` (`matietkiem`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `evt_DailyLoanRenewal` ON SCHEDULE EVERY 1 DAY STARTS '2024-12-28 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    -- Declare variables
    DECLARE v_done INT DEFAULT FALSE;
    DECLARE v_matietkiem BIGINT;
    DECLARE v_sotaikhoan BIGINT;
    DECLARE v_maloaitietkiem INT;
    DECLARE v_ngaygui DATE;
    DECLARE v_ngaydaohan DATE;
    DECLARE v_soduhienco DECIMAL(16,2);
    DECLARE v_sotiengoi DECIMAL(16,2);
    DECLARE v_giahangoc BOOLEAN;
    DECLARE v_giahanlai BOOLEAN;
    DECLARE v_laisuat FLOAT;
    DECLARE v_songaytoithieu INT;
    DECLARE v_tienlai DECIMAL(16,2);
    DECLARE v_songaytraiqua INT;
    DECLARE v_tongtienrut DECIMAL(16,2);
    DECLARE v_sodu_truoc_rut DECIMAL(16,2);
    
    -- Cursor for selecting savings accounts
    DECLARE renewal_cursor CURSOR FOR
        SELECT 
            pg.MATIETKIEM,
            pg.SOTAIKHOAN,
            l.MALOAITIETKIEM,
            pg.NGAYGOI,
            pg.NGAYDAOHAN,
            pg.SODUHIENCO,
            pg.SOTIENGOI,
            h.GIAHANGOC,
            h.GIAHANLAI,
            pg.LAISUATAPDUNG,
            l.SONGAYTOITHIEURUTTIEN
        FROM PHIEUGOITIEN pg
        INNER JOIN HINHTHUCGIAHAN h ON pg.MAHINHTHUCGIAHAN = h.MAHINHTHUCGIAHAN
        INNER JOIN LOAITIETKIEM l ON pg.MALOAITIETKIEM = l.MALOAITIETKIEM;
    
    -- Handler for cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;
    
    OPEN renewal_cursor;
    
    read_loop: LOOP
        -- Get next record
        FETCH renewal_cursor INTO 
            v_matietkiem, 
            v_sotaikhoan,
            v_maloaitietkiem,
            v_ngaygui,
            v_ngaydaohan,
            v_soduhienco,
            v_sotiengoi,
            v_giahangoc,
            v_giahanlai,
            v_laisuat,
            v_songaytoithieu;
            
        IF v_done THEN
            LEAVE read_loop;
        END IF;
        
        -- Handle term deposits (maloaitietkiem = 1 or 2)
        IF v_maloaitietkiem IN (1, 2) AND v_ngaydaohan = CURDATE() THEN
            -- Calculate interest
            SET v_tienlai = v_soduhienco * v_laisuat;
            
            -- Case 1: Renew both principal and interest
            IF v_giahangoc AND v_giahanlai THEN
                UPDATE PHIEUGOITIEN
                SET SODUHIENCO = SODUHIENCO + v_tienlai,
                    NGAYDAOHAN = DATE_ADD(CURDATE(), INTERVAL v_songaytoithieu DAY)
                WHERE MATIETKIEM = v_matietkiem;
                
            -- Case 2: Renew only principal
            ELSEIF v_giahangoc AND NOT v_giahanlai THEN
                -- Add interest to account balance
                UPDATE TAIKHOAN
                SET SODU = SODU + v_tienlai
                WHERE SOTAIKHOAN = v_sotaikhoan;
                
                -- Extend term
                UPDATE PHIEUGOITIEN
                SET NGAYDAOHAN = DATE_ADD(CURDATE(), INTERVAL v_songaytoithieu DAY)
                WHERE MATIETKIEM = v_matietkiem;
                
            -- Case 3: No renewal
            ELSE
                -- Return principal and interest
                UPDATE TAIKHOAN
                SET SODU = SODU + v_soduhienco + v_tienlai
                WHERE SOTAIKHOAN = v_sotaikhoan;
                
                -- Reset balance
                UPDATE PHIEUGOITIEN
                SET SODUHIENCO = 0
                WHERE MATIETKIEM = v_matietkiem;
            END IF;
            
        -- Handle non-term savings (maloaitietkiem = 3)
        ELSEIF v_maloaitietkiem = 3 THEN
            -- Tính tổng tiền đã rút
            SELECT COALESCE(SUM(SOTIENRUT), 0) INTO v_tongtienrut
            FROM PHIEURUTIEN
            WHERE MATIETKIEM = v_matietkiem;
            
            -- Tính số dư trước khi rút = số tiền gửi ban đầu
            SET v_sodu_truoc_rut = v_sotiengoi;
            
            -- Tính số ngày từ lần gửi đầu tiên
            SET v_songaytraiqua = DATEDIFF(CURDATE(), v_ngaygui);
            
            -- Tính lãi suất đơn dựa trên số dư sau khi rút
            SET v_tienlai = ((v_sodu_truoc_rut - v_tongtienrut) * v_songaytraiqua * v_laisuat) / 365;
            
            -- Cập nhật số dư hiện có = số dư thực + tiền lãi
            UPDATE PHIEUGOITIEN
            SET SODUHIENCO = (v_sodu_truoc_rut - v_tongtienrut + v_tienlai)
            WHERE MATIETKIEM = v_matietkiem;
        END IF;
    END LOOP;
    
    CLOSE renewal_cursor;
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
