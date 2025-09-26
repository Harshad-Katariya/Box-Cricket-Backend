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
-- Database: `box_cricket`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_amenities`
--

DROP TABLE IF EXISTS `tbl_amenities`;
CREATE TABLE IF NOT EXISTS `tbl_amenities` (
  `amenities_id` int NOT NULL AUTO_INCREMENT,
  `amenities_icon` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `amenities_name` varchar(255) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`amenities_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_amenities`
--

INSERT INTO `tbl_amenities` (`amenities_id`, `amenities_icon`, `amenities_name`, `is_active`, `is_deleted`, `created_on`, `update_on`) VALUES
(1, 'http://harshad.com:8000/icon/1736256886196-c881a003-c449-4cdd-9c4e-5d96db298684.png', 'Ball', 1, 0, '2025-01-07 19:04:46', NULL),
(2, 'http://harshad.com:8000/icon/1736256903717-31192dbb-ed80-446b-ac3c-1fa0c97fa69e.png', 'Bat', 1, 0, '2025-01-07 19:05:03', NULL),
(3, 'http://harshad.com:8000/icon/1736256928591-b0204b18-aa27-459f-a241-e88837509567.png', 'Parking', 1, 0, '2025-01-07 19:05:28', NULL),
(4, 'http://harshad.com:8000/icon/1736256955402-d8f51264-c788-4dd3-b953-920b4021ea32.png', 'Stumps', 1, 0, '2025-01-07 19:05:55', NULL),
(5, 'http://harshad.com:8000/icon/1736256990073-981e2db3-6086-4ba5-913e-5eafeae879ce.png', 'Sitting Area', 1, 0, '2025-01-07 19:06:30', NULL),
(6, 'http://harshad.com:8000/icon/1736257009808-d583c44e-6133-4eb2-8186-f296a7e7ed1e.png', 'Light', 1, 0, '2025-01-07 19:06:49', NULL),
(7, 'http://harshad.com:8000/icon/1736257064077-6078df77-2827-4d24-8784-dad629a7ac92.png', 'Washroom', 1, 0, '2025-01-07 19:07:44', NULL),
(8, 'http://harshad.com:8000/icon/1736257087479-7b5cad74-5a0a-4e32-b324-0e1498db8dfe.png', 'Changing Room', 1, 0, '2025-01-07 19:08:07', NULL),
(9, 'http://harshad.com:8000/icon/1736257113629-f897e479-1658-40e9-bd63-5a6f474bf58d.png', 'Sound System', 1, 0, '2025-01-07 19:08:33', NULL),
(10, 'http://harshad.com:8000/icon/1736257137394-a9a70a30-6c20-4b0e-9348-22ca42e7d7df.png', 'Drink Water', 1, 0, '2025-01-07 19:08:57', NULL),
(11, 'http://harshad.com:8000/icon/1736257161000-029dd30f-12e4-4094-a7b6-55ad98dab739.png', 'Fast Food', 1, 0, '2025-01-07 19:09:21', NULL),
(12, 'http://harshad.com:8000/icon/1736257190551-ede97116-87d2-4c94-b6d8-99916bea984e.png', 'Garbage', 1, 0, '2025-01-07 19:09:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_booking`
--

DROP TABLE IF EXISTS `tbl_booking`;
CREATE TABLE IF NOT EXISTS `tbl_booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_num` varchar(16) DEFAULT NULL,
  `booking_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `amount` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `box_id` int NOT NULL,
  `slot_id` int NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `box_id` (`box_id`),
  KEY `user_id` (`user_id`),
  KEY `slot_id` (`slot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_booking`
--

INSERT INTO `tbl_booking` (`booking_id`, `booking_num`, `booking_date`, `start_time`, `end_time`, `amount`, `user_id`, `box_id`, `slot_id`) VALUES
(1, 'B7354', '2025-02-08', '09:00:00', '15:00:00', '7080', 7, 3, 25),
(2, 'B7612', '2025-02-09', '10:00:00', '16:00:00', '7080', 7, 3, 25);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_box`
--

DROP TABLE IF EXISTS `tbl_box`;
CREATE TABLE IF NOT EXISTS `tbl_box` (
  `box_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `open_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `close_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `longitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `contact_num` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`box_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_box`
--

INSERT INTO `tbl_box` (`box_id`, `title`, `open_time`, `close_time`, `address`, `latitude`, `longitude`, `city_id`, `state_id`, `contact_num`, `user_id`, `created_on`, `update_on`) VALUES
(2, 'A-1 Box Cricket ', '9:00 AM', '24:00', 'The Radiant international School, Ugat Gam, Jahangirabad, Adajan Surat-395005', '21.221236205501828', '72.81062127136086', 1, 1, '9586392234', 1, '2025-01-16 15:39:25', '2025-02-06 15:27:40'),
(3, 'Free Hit Box Cricket ', '9:00 AM', '24:00', 'Celebration Compound, Vesu Canal Rd, near Shayona Plaza, Punagam, Yoginagar Society, Surat, Gujarat', '21.210638018786234', '72.8839123419137', 1, 1, '9586392234', 2, '2025-01-17 15:45:55', '2025-02-06 17:27:56'),
(6, 'Infinity Box Cricket', '8:00 AM', '20:00', 'Vesu Canal Rd, nr. Jiviba Farm, Magob, Puna, Surat, Gujarat', '21.196213', '72.877360', 1, 1, '9586392234', 2, '2025-01-17 15:45:55', '2025-02-06 17:29:03');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_box_amenities`
--

DROP TABLE IF EXISTS `tbl_box_amenities`;
CREATE TABLE IF NOT EXISTS `tbl_box_amenities` (
  `box_amenities_id` int NOT NULL AUTO_INCREMENT,
  `amenities_id` int DEFAULT NULL,
  `box_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`box_amenities_id`),
  KEY `amenities_id` (`amenities_id`),
  KEY `box_id` (`box_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_box_amenities`
--

INSERT INTO `tbl_box_amenities` (`box_amenities_id`, `amenities_id`, `box_id`, `user_id`, `created_on`, `update_on`) VALUES
(1, 1, 2, 1, '2025-01-16 15:36:36', '2025-01-17 12:58:15'),
(2, 2, 2, 1, '2025-01-16 15:36:36', '2025-01-17 12:58:39'),
(3, 3, 2, 1, '2025-01-16 15:36:36', '2025-01-17 12:58:53'),
(4, 4, 2, 1, '2025-01-16 15:36:36', '2025-01-17 12:59:07'),
(5, 5, 2, 1, '2025-01-16 15:36:36', '2025-01-17 12:59:18'),
(6, 6, 2, 1, '2025-01-16 15:36:36', '2025-01-17 13:02:43'),
(7, 7, 2, 1, '2025-01-16 15:36:36', '2025-01-17 13:02:46'),
(8, 8, 2, 1, '2025-01-16 15:36:36', '2025-01-17 13:05:46'),
(9, 9, 2, 1, '2025-01-16 15:36:36', '2025-01-17 13:05:49'),
(10, 10, 2, 1, '2025-01-16 15:36:36', '2025-01-17 13:05:52'),
(11, 11, 2, 1, '2025-01-16 15:36:36', '2025-01-17 13:05:55'),
(12, 12, 2, 1, '2025-01-16 15:36:36', '2025-01-17 13:05:58'),
(25, 1, 3, 2, '2025-01-17 15:45:55', NULL),
(26, 2, 3, 2, '2025-01-17 15:45:55', NULL),
(27, 3, 3, 2, '2025-01-17 15:45:55', NULL),
(28, 4, 3, 2, '2025-01-17 15:45:55', NULL),
(29, 6, 3, 2, '2025-01-17 15:45:55', NULL),
(30, 7, 3, 2, '2025-01-17 15:45:55', NULL),
(31, 10, 3, 2, '2025-01-17 15:45:55', NULL),
(32, 12, 3, 2, '2025-01-17 15:45:55', NULL),
(33, 1, 5, 4, '2025-01-18 16:02:31', NULL),
(34, 2, 5, 4, '2025-01-18 16:02:31', NULL),
(35, 3, 5, 4, '2025-01-18 16:02:31', NULL),
(36, 4, 5, 4, '2025-01-18 16:02:31', NULL),
(37, 6, 5, 4, '2025-01-18 16:02:31', NULL),
(43, 1, 7, 2, '2025-02-02 10:07:09', NULL),
(44, 2, 7, 2, '2025-02-02 10:07:09', NULL),
(45, 3, 7, 2, '2025-02-02 10:07:09', NULL),
(46, 4, 7, 2, '2025-02-02 10:07:09', NULL),
(47, 5, 7, 2, '2025-02-02 10:07:09', NULL),
(48, 1, 8, 2, '2025-02-02 10:10:25', NULL),
(49, 2, 8, 2, '2025-02-02 10:10:25', NULL),
(50, 3, 8, 2, '2025-02-02 10:10:25', NULL),
(51, 4, 8, 2, '2025-02-02 10:10:25', NULL),
(52, 5, 8, 2, '2025-02-02 10:10:25', NULL),
(53, 6, 8, 2, '2025-02-02 10:10:25', NULL),
(54, 1, 9, 2, '2025-02-02 10:14:14', NULL),
(55, 2, 9, 2, '2025-02-02 10:14:14', NULL),
(56, 3, 9, 2, '2025-02-02 10:14:14', NULL),
(57, 4, 9, 2, '2025-02-02 10:14:14', NULL),
(58, 5, 9, 2, '2025-02-02 10:14:14', NULL),
(59, 6, 9, 2, '2025-02-02 10:14:14', NULL),
(60, 1, 10, 2, '2025-02-02 10:16:25', NULL),
(61, 2, 10, 2, '2025-02-02 10:16:25', NULL),
(62, 3, 10, 2, '2025-02-02 10:16:25', NULL),
(63, 4, 10, 2, '2025-02-02 10:16:25', NULL),
(64, 6, 10, 2, '2025-02-02 10:16:25', NULL),
(65, 7, 10, 2, '2025-02-02 10:16:25', NULL),
(66, 9, 10, 2, '2025-02-02 10:16:25', NULL),
(67, 12, 10, 2, '2025-02-02 10:16:25', NULL),
(68, 1, 11, 2, '2025-02-02 10:20:54', NULL),
(69, 2, 11, 2, '2025-02-02 10:20:54', NULL),
(70, 3, 11, 2, '2025-02-02 10:20:54', NULL),
(71, 4, 11, 2, '2025-02-02 10:20:54', NULL),
(72, 5, 11, 2, '2025-02-02 10:20:54', NULL),
(73, 6, 11, 2, '2025-02-02 10:20:54', NULL),
(74, 1, 12, 2, '2025-02-02 10:27:21', NULL),
(75, 2, 12, 2, '2025-02-02 10:27:21', NULL),
(76, 3, 12, 2, '2025-02-02 10:27:21', NULL),
(77, 4, 12, 2, '2025-02-02 10:27:21', NULL),
(78, 5, 12, 2, '2025-02-02 10:27:21', NULL),
(79, 6, 12, 2, '2025-02-02 10:27:21', NULL),
(80, 7, 12, 2, '2025-02-02 10:27:21', NULL),
(81, 8, 12, 2, '2025-02-02 10:27:21', NULL),
(82, 9, 12, 2, '2025-02-02 10:27:21', NULL),
(83, 10, 12, 2, '2025-02-02 10:27:21', NULL),
(84, 12, 12, 2, '2025-02-02 10:27:21', NULL),
(85, 1, 13, 2, '2025-02-02 11:57:15', NULL),
(86, 5, 13, 2, '2025-02-02 11:57:15', NULL),
(87, 1, 14, 2, '2025-02-02 12:01:09', NULL),
(88, 2, 14, 2, '2025-02-02 12:01:09', NULL),
(89, 3, 14, 2, '2025-02-02 12:01:09', NULL),
(90, 4, 14, 2, '2025-02-02 12:01:09', NULL),
(91, 5, 14, 2, '2025-02-02 12:01:09', NULL),
(92, 6, 14, 2, '2025-02-02 12:01:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_box_media`
--


--
-- Dumping data for table `tbl_box_media`
--


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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_city`
--

INSERT INTO `tbl_city` (`city_id`, `city_name`, `state_id`) VALUES
(1, 'Surat', 1);

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
-- Table structure for table `tbl_payment`
--

DROP TABLE IF EXISTS `tbl_payment`;
CREATE TABLE IF NOT EXISTS `tbl_payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `razorpay_order_id` varchar(200) NOT NULL,
  `payment_status` enum('complate','fail','initialize') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'initialize',
  `payment_amount` varchar(10) NOT NULL,
  `cancel_reason` text,
  `box_id` int DEFAULT NULL,
  `slot_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `box_id` (`box_id`),
  KEY `slot_id` (`slot_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_payment`
--

INSERT INTO `tbl_payment` (`payment_id`, `razorpay_order_id`, `payment_status`, `payment_amount`, `cancel_reason`, `box_id`, `slot_id`, `user_id`, `created_on`, `update_on`) VALUES
(1, 'order_PsLBLIk8iIgPzE', 'complate', '2360', NULL, 2, 17, 7, '2025-02-06 12:52:08', '2025-02-06 12:52:29'),
(2, 'order_PsLF2z4yC8Ckci', 'complate', '1062.00', NULL, 6, 26, 7, '2025-02-06 12:55:38', '2025-02-06 12:56:00'),
(3, 'order_PsLI9LyvvWKIxi', 'initialize', '590.00', NULL, 2, 17, 7, '2025-02-06 12:58:35', NULL),
(4, 'order_PsLIAKM53g1WpR', 'complate', '590.00', NULL, 2, 17, 7, '2025-02-06 12:58:35', '2025-02-06 12:58:55'),
(5, 'order_PsLK3qSTcpdogN', 'complate', '590.00', NULL, 2, 17, 7, '2025-02-06 13:00:23', '2025-02-06 13:00:43'),
(6, 'order_PsMZWGxqCuOyTr', 'complate', '2124.00', NULL, 6, 26, 7, '2025-02-06 14:13:42', '2025-02-06 14:14:06'),
(7, 'order_PsMfJmD7spXkd9', 'initialize', '944.00', NULL, 3, 23, 7, '2025-02-06 14:19:12', NULL),
(8, 'order_PsN7upzaJk2IZ7', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 14:46:16', '2025-02-06 14:46:39'),
(9, 'order_PsNAHUK9YwFo4I', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 14:48:31', '2025-02-06 14:48:50'),
(10, 'order_PsNC0mqKWXfi2d', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 14:50:09', '2025-02-06 14:50:29'),
(11, 'order_PsNIEQSADxVRth', 'complate', '1180.00', NULL, 3, 25, 7, '2025-02-06 14:56:02', '2025-02-06 14:56:25'),
(12, 'order_PsNNbRKJaeMOhn', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 15:01:07', '2025-02-06 15:01:27'),
(13, 'order_PsNPj4MkPSucDU', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:03:08', '2025-02-06 15:03:32'),
(14, 'order_PsNaHaOYiORtlE', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 15:13:07', '2025-02-06 15:13:27'),
(15, 'order_PsNbx2j336EtVD', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 15:14:42', '2025-02-06 15:15:09'),
(16, 'order_PsNdGqylNg8YFE', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:15:57', '2025-02-06 15:16:21'),
(17, 'order_PsNll0x7hDMOoY', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:23:59', '2025-02-06 15:24:23'),
(18, 'order_PsNn5DAicvpSwW', 'complate', '1180.00', NULL, 2, 17, 7, '2025-02-06 15:25:14', '2025-02-06 15:25:36'),
(19, 'order_PsNobFPmf76S0I', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:26:41', '2025-02-06 15:27:01'),
(20, 'order_PsNq065xyPbkFY', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:28:00', '2025-02-06 15:28:19'),
(21, 'order_PsNx4CgOjBK4Cu', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 15:34:42', '2025-02-06 15:35:02'),
(22, 'order_PsO04Gi1T6lh4P', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:37:32', '2025-02-06 15:38:00'),
(23, 'order_PsO1cyUdmY0vh6', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:39:01', '2025-02-06 15:39:25'),
(24, 'order_PsO47nz3F3r8xc', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 15:41:23', '2025-02-06 15:41:44'),
(25, 'order_PsO4te7jy9BLZQ', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:42:06', '2025-02-06 15:42:27'),
(26, 'order_PsO7EazhKg6JXs', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:44:19', '2025-02-06 15:44:43'),
(27, 'order_PsOAwocKOQ0qIA', 'complate', '1888.00', NULL, 3, 23, 7, '2025-02-06 15:47:50', '2025-02-06 15:48:17'),
(28, 'order_PsOBnpX9Gknno7', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 15:48:39', '2025-02-06 15:48:57'),
(29, 'order_PsODctDskqCOke', 'complate', '2832.00', 'Payment was unsuccessful due to a temporary issue. If amount got deducted, it will be refunded within 5-7 working days.', 3, 23, 7, '2025-02-06 15:50:22', '2025-02-06 15:51:23'),
(30, 'order_PsOFe6xmLc4938', 'fail', '4720.00', 'Your payment didn\'t go through as it was declined by the bank. Try another payment method or contact your bank.', 3, 23, 7, '2025-02-06 15:52:17', '2025-02-06 15:52:26'),
(31, 'order_PsOG1AM11lMahH', 'complate', '4720.00', NULL, 3, 23, 7, '2025-02-06 15:52:38', '2025-02-06 15:52:57'),
(32, 'order_PsOHkR2YM0sY9O', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 15:54:16', '2025-02-06 15:54:35'),
(33, 'order_PsOJcelS9X84l4', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 15:56:03', '2025-02-06 15:56:22'),
(34, 'order_PsOM6g10KmLGdi', 'complate', '5664.00', NULL, 3, 23, 7, '2025-02-06 15:58:24', '2025-02-06 15:58:45'),
(35, 'order_PsOeA0SorjMxwU', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 16:15:29', '2025-02-06 16:15:53'),
(36, 'order_PsOgAi4jy6K8im', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 16:17:24', '2025-02-06 16:17:48'),
(37, 'order_PsOhYN4WJY4khD', 'complate', '1180.00', NULL, 3, 25, 7, '2025-02-06 16:18:42', '2025-02-06 16:19:05'),
(38, 'order_PsOix18q1s8YA8', 'complate', '1180.00', NULL, 3, 25, 7, '2025-02-06 16:20:01', '2025-02-06 16:20:23'),
(39, 'order_PsOjfNT6A7Mgec', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 16:20:42', '2025-02-06 16:21:20'),
(40, 'order_PsPKRRxPKOavha', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 16:55:31', '2025-02-06 16:55:51'),
(41, 'order_PsPLGeh9lxTPYe', 'complate', '7080.00', NULL, 3, 25, 7, '2025-02-06 16:56:18', '2025-02-06 16:56:41'),
(42, 'order_PsPsKBSbGQeIId', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 17:27:35', '2025-02-06 17:27:56'),
(43, 'order_PsPtTOitVQeaQF', 'complate', '1062.00', NULL, 6, 26, 7, '2025-02-06 17:28:41', '2025-02-06 17:29:02'),
(44, 'order_PsQumsNiQDcRuu', 'complate', '944.00', NULL, 3, 23, 7, '2025-02-06 18:28:37', '2025-02-06 18:28:59'),
(45, 'order_PsR5CI81G9XKZr', 'complate', '1062.00', NULL, 6, 26, 7, '2025-02-06 18:38:28', '2025-02-06 18:38:47'),
(46, 'order_PsRByuWM2u4vZj', 'complate', '4720.00', NULL, 3, 25, 7, '2025-02-06 18:44:54', '2025-02-06 18:45:19'),
(47, 'order_PsijGZw8UbN5aE', 'complate', '1888.00', 'Payment was unsuccessful due to a temporary issue. If amount got deducted, it will be refunded within 5-7 working days.', 3, 23, 7, '2025-02-07 11:54:11', '2025-02-07 11:54:50'),
(48, 'order_Psiql1w86scrEp', 'complate', '8260.00', NULL, 3, 25, 7, '2025-02-07 12:01:16', '2025-02-07 12:01:35'),
(49, 'order_PspIa7c9AzcZMy', 'complate', '1062.00', NULL, 6, 26, 7, '2025-02-07 18:19:46', '2025-02-07 18:20:09'),
(50, 'order_PspL6zI8zbvbHQ', 'complate', '2832.00', NULL, 3, 23, 7, '2025-02-07 18:22:10', '2025-02-07 18:22:36'),
(51, 'order_PspOK3BQQ886In', 'complate', '8260.00', NULL, 3, 25, 7, '2025-02-07 18:25:12', '2025-02-07 18:25:31'),
(52, 'order_PspY0aIMJEhNHO', 'complate', '5900.00', NULL, 3, 25, 7, '2025-02-07 18:34:23', '2025-02-07 18:34:47'),
(53, 'order_PspYz0HVRpMXJQ', 'complate', '8260.00', NULL, 3, 25, 7, '2025-02-07 18:35:18', '2025-02-07 18:35:37'),
(54, 'order_PspZgcRgolv5ED', 'complate', '3186.00', NULL, 6, 26, 7, '2025-02-07 18:35:58', '2025-02-07 18:36:18'),
(55, 'order_PsppV2IT1pMVUD', 'complate', '4720.00', NULL, 3, 25, 7, '2025-02-07 18:50:56', '2025-02-07 18:51:18'),
(56, 'order_PsptXxuBjWsxtx', 'complate', '3186.00', NULL, 6, 26, 7, '2025-02-07 18:54:46', '2025-02-07 18:55:04'),
(57, 'order_PsqbYIPznUfMVu', 'complate', '2124.00', NULL, 6, 26, 7, '2025-02-07 19:36:25', '2025-02-07 19:36:44'),
(58, 'order_PsvpNWtEsiSthT', 'complate', '7080.00', NULL, 3, 25, 7, '2025-02-08 00:43:00', '2025-02-08 00:43:23'),
(59, 'order_PsvwoKkz4nT6C9', 'complate', '7080.00', NULL, 3, 25, 7, '2025-02-08 00:50:02', '2025-02-08 00:50:23');

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Table structure for table `tbl_slot`
--

DROP TABLE IF EXISTS `tbl_slot`;
CREATE TABLE IF NOT EXISTS `tbl_slot` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `box_id` int DEFAULT NULL,
  `slot_name` varchar(50) NOT NULL,
  `slot_media` json DEFAULT NULL,
  `width` varchar(100) NOT NULL,
  `heigth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `length` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `user_id` (`user_id`),
  KEY `box_id` (`box_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_slot`
--

INSERT INTO `tbl_slot` (`slot_id`, `user_id`, `box_id`, `slot_name`, `slot_media`, `width`, `heigth`, `length`, `price`) VALUES
(17, 1, 2, 'No 1', '[\"http://harshad.com:8000/Uploads/1737022165845-c77b98e5-eda4-4047-9b5d-c11ddeb1588c.jpeg\", \"http://harshad.com:8000/Uploads/1737022165849-52feabc2-873e-4242-8398-93755eb51e46.jpeg\", \"http://harshad.com:8000/Uploads/1737022165850-0e4de3fe-a8fc-46c0-89c4-17764cad6e93.jpg\", \"http://harshad.com:8000/Uploads/1737022165850-5f4cc45b-d85e-4ae9-be12-54662feefe49.jpg\", \"http://harshad.com:8000/Uploads/1737022165851-16ebfe63-3047-4ec4-a0b9-d9b05a0ea0b6.jpg\"]', '500', '400', '600', '500'),
(23, 2, 3, 'No 1', '[\"http://harshad.com:8000/Uploads/1737108955843-1eac753d-3a6d-4a21-b74d-d3b12770df6f.jpg\", \"http://harshad.com:8000/Uploads/1737108955846-d13d3f17-4eea-4e37-8a76-4b3c4acf9d50.jpg\"]', '700', '600', '900', '800'),
(25, 2, 3, 'No 2', '[\"http://harshad.com:8000/Uploads/1737108955836-9545d04b-ac3a-47b3-a188-6eaa1f19a0c9.png\", \"http://harshad.com:8000/Uploads/1737108955837-005ff6f9-c04c-40d3-b932-89b0f3786d0d.png\", \"http://harshad.com:8000/Uploads/1737108955843-661c902f-8ce5-4625-939d-236aff3864cf.jpg\", \"http://harshad.com:8000/Uploads/1737108955843-1eac753d-3a6d-4a21-b74d-d3b12770df6f.jpg\", \"http://harshad.com:8000/Uploads/1737108955846-d13d3f17-4eea-4e37-8a76-4b3c4acf9d50.jpg\"]', '700', '600', '900', '1000'),
(26, 3, 6, 'No 1', '[\"http://harshad.com:8000/Uploads/1737108955837-005ff6f9-c04c-40d3-b932-89b0f3786d0d.png\", \"http://harshad.com:8000/Uploads/1737108955836-9545d04b-ac3a-47b3-a188-6eaa1f19a0c9.png\", \"http://harshad.com:8000/Uploads/1737108955843-661c902f-8ce5-4625-939d-236aff3864cf.jpg\", \"http://harshad.com:8000/Uploads/1737108955843-1eac753d-3a6d-4a21-b74d-d3b12770df6f.jpg\", \"http://harshad.com:8000/Uploads/1737108955846-d13d3f17-4eea-4e37-8a76-4b3c4acf9d50.jpg\"]', '700', '600', '900', '900');

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
-- Table structure for table `tbl_transaction`
--

DROP TABLE IF EXISTS `tbl_transaction`;
CREATE TABLE IF NOT EXISTS `tbl_transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `transaction_amount` varchar(255) NOT NULL,
  `transaction_type` enum('credit','debit') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `box_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `date_and_time` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  KEY `box_id` (`box_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`transaction_id`, `transaction_amount`, `transaction_type`, `box_id`, `user_id`, `date_and_time`, `created_on`) VALUES
(17, '6000.00', 'credit', 3, 2, '08-02-2025 1:00 AM\r\n', '2025-02-08 00:59:19'),
(18, '5000.00', 'debit', 3, 2, '08-02-2025 12:59:37 AM', '2025-02-08 00:59:37'),
(19, '500.00', 'debit', 3, 2, '08-02-2025 01:02:07 AM', '2025-02-08 01:02:07'),
(20, '10.00', 'debit', 3, 2, '08-02-2025 01:02:44 AM', '2025-02-08 01:02:44'),
(21, '400.00', 'debit', 3, 2, '08-02-2025 01:02:51 AM', '2025-02-08 01:02:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(500) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'Jalpesh Pipaliya', 'jalpeshpipaliya.hq@gmail.com', '$2a$10$kxhspTpqke.MNiB9002MJOXhTnI4nrujnFUzN.8pc/R1FjCG5Zzru'),
(2, 'Test Demo', 'harshad243@gmail.com', '$2a$10$cPCRT21urv3862zE50EwjuuslQnLscadjAglsw.XfwhZl2lsrwiWy'),
(3, 'Test User', 'tijosas717@luxyss.com', '$2a$10$IrgNj8ULGMvLNsJP9acwmuedzahMnZQbNe8awyl7kSShxprQ/hdi2'),
(4, 'Test 1', 'khushalambaliya8@gmail.com', '$2a$10$ISZMA92QssbP3mL./pWWh.kVyAnf4/b2u1hYcn.YGW.7ruN/sAMbe'),
(5, 'Test User 1', 'abc@gmail.com', '$2a$10$U6.rqO04t9GaMPdUnG3i5ujLDePNxBv/yOkLbdSsLrcz05vlw3RpK'),
(6, 'Gaurav ambaliya', 'gauravambaliya77@gmail.com', '$2a$10$nP/yf6mjWLovNN2tkRxyeOGHI4997MarBJ/7GiR8qfqa6irWSW.Wu'),
(7, 'Demo User', 'harshad2043@gmail.com', '$2a$10$aNHgGpVWvUkCSZ3Fohac3OHHEk1tGQTq5xlLvwWRa.9eWxX4YzKbe');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_booking`
--
ALTER TABLE `tbl_booking`
  ADD CONSTRAINT `tbl_booking_ibfk_1` FOREIGN KEY (`box_id`) REFERENCES `tbl_box` (`box_id`),
  ADD CONSTRAINT `tbl_booking_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`),
  ADD CONSTRAINT `tbl_booking_ibfk_3` FOREIGN KEY (`slot_id`) REFERENCES `tbl_slot` (`slot_id`);

--
-- Constraints for table `tbl_box`
--
ALTER TABLE `tbl_box`
  ADD CONSTRAINT `tbl_box_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_box_amenities`
--
ALTER TABLE `tbl_box_amenities`
  ADD CONSTRAINT `tbl_box_amenities_ibfk_1` FOREIGN KEY (`amenities_id`) REFERENCES `tbl_amenities` (`amenities_id`),
  ADD CONSTRAINT `tbl_box_amenities_ibfk_2` FOREIGN KEY (`box_id`) REFERENCES `tbl_box` (`box_id`),
  ADD CONSTRAINT `tbl_box_amenities_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_box_media`
--

--
-- Constraints for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD CONSTRAINT `tbl_payment_ibfk_1` FOREIGN KEY (`box_id`) REFERENCES `tbl_box` (`box_id`),
  ADD CONSTRAINT `tbl_payment_ibfk_2` FOREIGN KEY (`slot_id`) REFERENCES `tbl_slot` (`slot_id`),
  ADD CONSTRAINT `tbl_payment_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_refund`
--


--
-- Constraints for table `tbl_slot`
--
ALTER TABLE `tbl_slot`
  ADD CONSTRAINT `tbl_slot_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`),
  ADD CONSTRAINT `tbl_slot_ibfk_2` FOREIGN KEY (`box_id`) REFERENCES `tbl_box` (`box_id`);

--
-- Constraints for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD CONSTRAINT `tbl_transaction_ibfk_1` FOREIGN KEY (`box_id`) REFERENCES `tbl_box` (`box_id`),
  ADD CONSTRAINT `tbl_transaction_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
