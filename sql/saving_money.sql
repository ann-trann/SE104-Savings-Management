-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2024 at 07:15 PM
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
(3, 0, 0.005, '2024-01-01', 0);

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
  MODIFY `MALOAITIETKIEM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `phieugoitien`
--
ALTER TABLE `phieugoitien`
  MODIFY `matietkiem` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1008;

--
-- AUTO_INCREMENT for table `phieurutien`
--
ALTER TABLE `phieurutien`
  MODIFY `magiaodich` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2008;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `SOTAIKHOAN` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1012;

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
  ADD CONSTRAINT `FK_PRT_PGT` FOREIGN KEY (`MATIETKIEM`) REFERENCES `phieugoitien` (`MATIETKIEM`);

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
