-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 10, 2025 at 11:24 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `youtube_clone`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `video_category_id` int NOT NULL AUTO_INCREMENT,
  `video_category_name` varchar(500) NOT NULL,
  PRIMARY KEY (`video_category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`video_category_id`, `video_category_name`) VALUES
(1, 'Music'),
(2, 'Gaming'),
(3, 'Cars And Vehicles'),
(4, 'Comedy'),
(5, 'Education'),
(6, 'Entertainment'),
(7, 'Flim And Animation'),
(8, 'How-To And Style'),
(9, 'News And Politics'),
(10, 'Non-Profits And Activism'),
(11, 'People And Blogs'),
(12, 'Pets And Animals'),
(13, 'Science And Technology'),
(14, 'Sport'),
(15, 'Travel And Events');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_channel`
--

DROP TABLE IF EXISTS `tbl_channel`;
CREATE TABLE IF NOT EXISTS `tbl_channel` (
  `channel_id` int NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(500) NOT NULL,
  `channel_about` mediumtext NOT NULL,
  `channel_banner_image` mediumtext,
  `channel_description` mediumtext,
  `channel_handle` varchar(500) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`channel_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_channel`
--

INSERT INTO `tbl_channel` (`channel_id`, `channel_name`, `channel_about`, `channel_banner_image`, `channel_description`, `channel_handle`, `user_id`) VALUES
(4, 'Test Channel ', 'This Is Test Channel ', 'http://localhost:5000/Uploads/1728026035655-abc23bf8-06fd-477b-a0d4-1637cc0002c8.png', 'Welcome To Test Channell ', 'TestChannel', 4),
(14, 'Gaming Channel', 'This Is Test Channel ', 'http://localhost:5000/undefined', 'Welcome To Test Channell ', 'TestChannel', 8),
(15, 'Gaurav_Test', 'This Is Test Channel ', 'http://localhost:5000/Uploads/1729001606360-1caaf18f-b3c7-4bda-9382-61655abf9d49.jpg', 'Welcome To Test Channell ', 'Gaurav_Test', 9),
(16, 'Gaurav_Test', 'This Is Test Channel ', 'http://localhost:5000/undefined', 'Welcome To Test Channell ', 'Gaurav_Test', 19),
(17, 'Gaurav_Test', 'This Is Test Channel ', 'http://localhost:5000/undefined', 'Welcome To Test Channell ', 'Gaurav_Test', 19),
(18, 'Gaurav_Test', 'This Is Test Channel ', 'http://localhost:5000/undefined', 'Welcome To Test Channell ', 'Gaurav_Test', 19),
(19, 'Gaurav_Test', 'This Is Test Channel ', 'http://localhost:5000/undefined', 'Welcome To Test Channell ', 'Gaurav_Test', 19);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_city`
--

DROP TABLE IF EXISTS `tbl_city`;
CREATE TABLE IF NOT EXISTS `tbl_city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(300) DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  KEY `state_id` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_city`
--

INSERT INTO `tbl_city` (`city_id`, `city_name`, `state_id`) VALUES
(1, 'Surat', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_comment`
--

DROP TABLE IF EXISTS `tbl_comment`;
CREATE TABLE IF NOT EXISTS `tbl_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `video_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `video_id` (`video_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_comment`
--

INSERT INTO `tbl_comment` (`comment_id`, `comment`, `video_id`, `user_id`) VALUES
(1, 'Test Comment_1', 1, 4),
(2, 'Test Comment_1', 2, 1),
(3, 'Test Comment_1', 3, 1),
(4, 'Test Comment_1', 2, 1),
(5, 'Test Comment_1', 2, 1),
(6, 'Test Comment_1', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_country`
--

DROP TABLE IF EXISTS `tbl_country`;
CREATE TABLE IF NOT EXISTS `tbl_country` (
  `country_id` int NOT NULL AUTO_INCREMENT,
  `country_name` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_country`
--

INSERT INTO `tbl_country` (`country_id`, `country_name`) VALUES
(1, 'India');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_language`
--

DROP TABLE IF EXISTS `tbl_language`;
CREATE TABLE IF NOT EXISTS `tbl_language` (
  `video_language_id` int NOT NULL AUTO_INCREMENT,
  `video_language` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`video_language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_language`
--

INSERT INTO `tbl_language` (`video_language_id`, `video_language`) VALUES
(1, 'Abkhazian'),
(2, 'Afar'),
(3, 'Afrikaans'),
(4, 'Akan'),
(5, 'Bambara'),
(6, 'Bashkir'),
(7, 'Basque'),
(8, 'Bengali'),
(9, 'Chinese'),
(10, 'Coptic'),
(11, 'English'),
(12, 'Gujrati'),
(13, 'Hindi');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

DROP TABLE IF EXISTS `tbl_payment`;
CREATE TABLE IF NOT EXISTS `tbl_payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `razorpay_order_id` varchar(200) NOT NULL,
  `payment_status` enum('complate','fail','processing') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'processing',
  `payment_amount` varchar(10) NOT NULL,
  `premium_expire` datetime DEFAULT NULL,
  `cancel_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `user_id` int DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`payment_id`, `razorpay_order_id`, `payment_status`, `payment_amount`, `premium_expire`, `cancel_reason`, `user_id`, `created_on`, `update_on`) VALUES
(1, 'order_PEr7785FHU6HYY', 'complate', '500.00', '2024-11-29 18:06:42', NULL, 1, '2024-10-29 18:06:14', '2024-10-29 18:06:42'),
(2, 'order_PEr7hMBxKsysGv', 'fail', '500.00', NULL, 'Payment was unsuccessful due to a temporary issue. If amount got deducted, it will be refunded within 5-7 working days.', 1, '2024-10-29 18:06:47', '2024-10-29 18:07:30'),
(4, 'order_PF7H4ubQfePPs8', 'fail', '500.00', NULL, 'Your payment didn\'t go through as it was declined by the bank. Try another payment method or contact your bank.', 1, '2024-10-30 09:54:46', '2024-10-30 09:54:58'),
(5, 'order_PF8uxB2Ti9ePY3', 'processing', '500.00', NULL, NULL, 1, '2024-10-30 11:31:13', NULL),
(6, 'order_PF8viiGQFNBVjr', 'processing', '500.00', NULL, NULL, 1, '2024-10-30 11:31:56', NULL),
(7, 'order_PF8wNkycHSGWlN', 'processing', '500.00', NULL, NULL, 1, '2024-10-30 11:32:34', NULL),
(8, 'order_PF8yguv0lyzWx1', 'processing', '500.00', NULL, NULL, 1, '2024-10-30 11:34:45', NULL),
(9, 'order_PF8zhn6KMczqZI', 'processing', '500.00', NULL, NULL, 1, '2024-10-30 11:35:43', NULL),
(10, 'order_PFAHJVsY0fOyUC', 'processing', '500.00', NULL, NULL, 1, '2024-10-30 12:51:04', NULL),
(11, 'order_PFAJpiQDwMUiME', 'fail', '500.00', NULL, 'Your payment didn\'t go through as it was declined by the bank. Try another payment method or contact your bank.', 1, '2024-10-30 12:53:27', '2024-10-30 12:53:41'),
(12, 'order_PVQxnZMGnQKxm5', 'processing', '500.00', NULL, NULL, 20, '2024-12-10 15:34:25', NULL),
(13, 'order_PVQy5dG4HN64rA', 'processing', '500.00', NULL, NULL, 20, '2024-12-10 15:34:42', NULL),
(14, 'order_PVQzfAu5Cgu02Z', 'processing', '500.00', NULL, NULL, 20, '2024-12-10 15:36:11', NULL),
(15, 'order_PVQzsLA6FNRTUF', 'processing', '500.00', NULL, NULL, 20, '2024-12-10 15:36:23', NULL),
(16, 'order_PVR0g71A0DwLrs', 'processing', '500.00', NULL, NULL, 20, '2024-12-10 15:37:09', NULL),
(17, 'order_PVR1yhLJQauYxh', 'processing', '500.00', NULL, NULL, 20, '2024-12-10 15:38:22', NULL),
(18, 'order_PVR2wpsZMMgmH4', 'complate', '500.00', '2025-01-10 15:39:58', NULL, 20, '2024-12-10 15:39:18', '2024-12-10 15:39:58'),
(19, 'order_PVR5rC9mxD0uLT', 'fail', '500.00', NULL, 'Payment was unsuccessful due to a temporary issue. If amount got deducted, it will be refunded within 5-7 working days.', 20, '2024-12-10 15:42:03', '2024-12-10 15:42:40'),
(20, 'order_PVR6dSytaYGARa', 'complate', '500.00', '2025-01-10 15:43:12', NULL, 20, '2024-12-10 15:42:47', '2024-12-10 15:43:12');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_playlists`
--

DROP TABLE IF EXISTS `tbl_playlists`;
CREATE TABLE IF NOT EXISTS `tbl_playlists` (
  `playlists_id` int NOT NULL AUTO_INCREMENT,
  `playlist_name` varchar(5000) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`playlists_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_short_video`
--

DROP TABLE IF EXISTS `tbl_short_video`;
CREATE TABLE IF NOT EXISTS `tbl_short_video` (
  `short_video_id` int NOT NULL AUTO_INCREMENT,
  `short_video_file` varchar(1000) NOT NULL,
  `short_video_title` varchar(1000) NOT NULL,
  `short_video_description` mediumtext,
  `channel_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`short_video_id`),
  KEY `channel_id` (`channel_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_state`
--

DROP TABLE IF EXISTS `tbl_state`;
CREATE TABLE IF NOT EXISTS `tbl_state` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(300) DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  PRIMARY KEY (`state_id`),
  KEY `country_id` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_state`
--

INSERT INTO `tbl_state` (`state_id`, `state_name`, `country_id`) VALUES
(1, 'Gujrat', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subscribe`
--

DROP TABLE IF EXISTS `tbl_subscribe`;
CREATE TABLE IF NOT EXISTS `tbl_subscribe` (
  `subscribe_id` int NOT NULL AUTO_INCREMENT,
  `channel_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`subscribe_id`),
  KEY `channel_id` (`channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_subscribe`
--

INSERT INTO `tbl_subscribe` (`subscribe_id`, `channel_id`, `user_id`) VALUES
(1, 4, 1),
(2, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `user_profile` varchar(500) DEFAULT NULL,
  `is_verify` tinyint NOT NULL DEFAULT '0',
  `is_active` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `country_id` int NOT NULL,
  `state_id` int NOT NULL,
  `city_id` int NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `country_id` (`country_id`),
  KEY `state_id` (`state_id`),
  KEY `city_id` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `username`, `email`, `password`, `user_profile`, `is_verify`, `is_active`, `is_deleted`, `country_id`, `state_id`, `city_id`, `created_on`, `update_on`) VALUES
(1, 'Harshad Katariya', 'harshad2043@gmail.com', '$2a$10$d4OaBy55KOzLklcKmhCeXeTM3MZ9X.QHJGvu61m9Z7icNdWKsQwda', 'http://localhost:5000/Uploads/1728025999255-2dc28881-6a09-4073-9444-f8bad3cbf6ee.png', 0, 1, 0, 1, 1, 1, '2024-10-04 09:40:05', '2024-10-22 19:26:36'),
(4, 'Khushal Ambaliya', 'khushalambaliya2002@gmail.com', '$2a$10$0GpzyQParKtqJ.TPInnN5.pcDMmyHfRndtwNDB/B7WuPo2M2ZANP6', 'http://localhost:5000/Uploads/1728025999255-2dc28881-6a09-4073-9444-f8bad3cbf6ee.png', 0, 1, 0, 1, 1, 1, '2024-10-04 12:43:19', '2024-10-19 11:29:06'),
(7, 'Harshad', 'Harshad@gmail.com', '$2a$10$r9BhLP1hS9ywa9l7v6O3MuezaebQvlIPCdnpApaN7yXlJbrBurUZu', 'http://localhost:5000/undefined', 0, 1, 0, 1, 1, 1, '2024-10-11 11:39:35', NULL),
(10, 'Khushal Ambaliya', 'khushalambaliya2002@gmail.com', '$2a$10$0GpzyQParKtqJ.TPInnN5.pcDMmyHfRndtwNDB/B7WuPo2M2ZANP6', 'http://localhost:5000/Uploads/1728025999255-2dc28881-6a09-4073-9444-f8bad3cbf6ee.png', 0, 1, 0, 1, 1, 1, '2024-10-04 12:43:19', '2024-10-18 15:03:48'),
(11, 'Harshad Katariya', 'harshad2043@gmail.com', '$2a$10$d4OaBy55KOzLklcKmhCeXeTM3MZ9X.QHJGvu61m9Z7icNdWKsQwda', 'http://localhost:5000/Uploads/1728015005424-5077a6fa-cc02-47c3-9d2c-01970f9545c4.jpg', 0, 1, 0, 1, 1, 1, '2024-10-04 09:40:05', '2024-10-19 10:12:55'),
(19, 'Jalpesh Pipaliya', 'jalpeshpipaliya.hq@gmail.com', '$2a$10$.uNoK2G6uoVB4i8TLMWd3OReYmIP9X5M21Kla4a.Xr7eNeQRUEmrS', 'http://localhost:5000/undefined', 0, 1, 0, 1, 1, 1, '2024-12-03 10:05:56', NULL),
(20, 'Jalpesh Pipaliya', 'jalpeshpipaliya2.hq@gmail.com', '$2a$10$fAx4jU3MuvXJFmx8eAKv/euDyK1KRsc423QziyHPIDJ64Fb4S8hTe', 'http://localhost:5000/undefined', 0, 1, 0, 1, 1, 1, '2024-12-10 15:33:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_playlist`
--

DROP TABLE IF EXISTS `tbl_user_playlist`;
CREATE TABLE IF NOT EXISTS `tbl_user_playlist` (
  `playlist_id` int NOT NULL AUTO_INCREMENT,
  `playlists_id` int DEFAULT NULL,
  `video_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `playlists_id` (`playlists_id`),
  KEY `video_id` (`video_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_user_playlist`
--

INSERT INTO `tbl_user_playlist` (`playlist_id`, `playlists_id`, `video_id`, `user_id`) VALUES
(2, 29, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_video`
--

DROP TABLE IF EXISTS `tbl_video`;
CREATE TABLE IF NOT EXISTS `tbl_video` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `video_title` varchar(255) NOT NULL,
  `video_description` text,
  `video_file` varchar(255) DEFAULT NULL,
  `video_thumbnail` varchar(255) NOT NULL,
  `video_language_id` int DEFAULT NULL,
  `video_category_id` int DEFAULT NULL,
  `channel_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_id`),
  KEY `video_language_id` (`video_language_id`),
  KEY `video_category_id` (`video_category_id`),
  KEY `channel_id` (`channel_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_video`
--

INSERT INTO `tbl_video` (`video_id`, `video_title`, `video_description`, `video_file`, `video_thumbnail`, `video_language_id`, `video_category_id`, `channel_id`, `user_id`, `created_on`) VALUES
(1, 'Demo Channel Create Video_2', 'Demo Description Deatils', 'http://localhost:5000/Uploads/1728031043857-65a90e9a-d7d4-4ee7-a758-121fc595cccc.mp4', 'http://localhost:5000/Uploads/1728031043873-d6b7a088-c58d-440c-9e2e-13a828bc3cc7.png', 5, 1, 4, 8, '2024-10-04 14:07:23'),
(2, 'Demo Channel Create Video_3', 'Demo Description Deatils', 'http://localhost:5000/Uploads/1728031048566-38399a94-2124-4af6-ace0-0d54c5be9595.mp4', 'http://localhost:5000/Uploads/1728031048584-85714f65-825d-44ad-99dd-951515c7e6ca.png', 5, 3, 14, 8, '2024-10-04 14:07:28'),
(3, 'Test Khushal', 'Test Khushal_1', 'http://localhost:5000/Uploads/1728031186171-e1a016ac-a265-40a2-a076-b633e0070a50.mp4', 'http://localhost:5000/Uploads/1728031186242-882ae947-d09d-4d79-aedd-cde788e7efb1.png', 5, 1, 6, 4, '2024-10-04 14:09:46'),
(4, 'Test Khushal_2', 'Test Khushal_1', 'http://localhost:5000/Uploads/1728031189426-346e6fb8-fd25-47b7-8e77-d610666c8409.mp4', 'http://localhost:5000/Uploads/1728031189445-90108fe9-e86a-4af6-807a-2e68c9702a63.png', 5, 1, 6, 4, '2024-10-04 14:09:49'),
(5, 'Hi Test 2', 'Hi test 2', 'http://localhost:5000/Uploads/1728031672913-cce0fa84-3ebf-42a2-b006-a3f7762ee4bf.mp4', 'http://localhost:5000/Uploads/1728031672932-e69aab5e-4e4f-49fb-858c-5b2e20a001c7.png', 5, 1, 14, 4, '2024-10-04 14:17:52'),
(6, 'Hi Test 3', 'Hi test 3', 'http://localhost:5000/Uploads/1727946617072-76ae3c95-a0b7-4e94-b0c8-32a23b423e2f.mp4', 'http://localhost:5000/Uploads/1727946617087-27891f1d-1e97-4ec0-b916-36fe376b45a6.png', 5, 1, 4, 4, '2024-10-03 14:40:17'),
(7, 'Demo Video Tiitle ', 'Demo Description', 'http://localhost:5000/Uploads/1728890085565-48eeb79b-5eed-484f-8cad-e562912fe04e.mp4', 'http://localhost:5000/Uploads/1728890085731-78e86b64-d599-48d8-82b6-adfe06ff42dd.png', 5, 1, 14, 4, '2024-10-14 12:44:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_watch_later`
--

DROP TABLE IF EXISTS `tbl_watch_later`;
CREATE TABLE IF NOT EXISTS `tbl_watch_later` (
  `watch_later_id` int NOT NULL AUTO_INCREMENT,
  `video_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `channel_id` int DEFAULT NULL,
  PRIMARY KEY (`watch_later_id`),
  KEY `video_id` (`video_id`),
  KEY `user_id` (`user_id`),
  KEY `channel_id` (`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
