-- MySQL dump 10.13  Distrib 9.0.1, for macos15.0 (arm64)
--
-- Host: 127.0.0.1    Database: nutech
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `balance` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `banner_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES ('4eb5877b-7b91-4d2d-b9f6-6d5c148d8623','https://nutech-integrasi.app/dummy.jpg','Banner 2','Lerem Ipsum Dolor sit amet'),('92fe5ca5-4e02-456a-b0c7-376e7dbd2441','https://nutech-integrasi.app/dummy.jpg','Banner 6','Lerem Ipsum Dolor sit amet'),('af89cf82-ce21-457d-a48e-316829f987ac','https://nutech-integrasi.app/dummy.jpg','Banner 5','Lerem Ipsum Dolor sit amet'),('c48311e8-91de-4dcc-88c4-4383d360dbfb','https://nutech-integrasi.app/dummy.jpg','Banner 1','Lerem Ipsum Dolor sit amet'),('d6736b12-04bc-449d-8ca3-0beeb8dd5fcf','https://nutech-integrasi.app/dummy.jpg','Banner 3','Lerem Ipsum Dolor sit amet'),('fdc4e02d-27da-4ff2-9810-f417367e5cc7','https://nutech-integrasi.app/dummy.jpg','Banner 4','Lerem Ipsum Dolor sit amet');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `service_code` varchar(255) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_icon` varchar(255) NOT NULL,
  `service_tariff` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_code` (`service_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES ('07428acc-2dc4-4bc3-a24d-1918e511b079','VOUCHER_GAME','Voucher Game','https://nutech-integrasi.app/dummy.jpg',100000),('0c4df3c5-b3bf-4a7b-85f7-b4898bdc6284','TV','TV Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),('10897455-830e-4fb2-90b7-403b19b10984','PLN','Listrik','https://nutech-integrasi.app/dummy.jpg',10000),('1c9ccde9-06fc-4886-9bce-7eeff9287e88','PDAM','PDAM Berlangganan','https://nutech-integrasi.app/dummy.jpg',40000),('3edc82d0-d7d7-437f-a73e-9023d1cda9f4','MUSIK','Musik Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),('43e3e584-6d7d-44cc-9742-28fa0608e5e7','PULSA','Pulsa','https://nutech-integrasi.app/dummy.jpg',40000),('707b9441-dfa1-43e8-a614-5ed263160c2a','PAKET_DATA','Paket data','https://nutech-integrasi.app/dummy.jpg',50000),('7cf207e7-4915-42de-8d15-0285e4fb817d','QURBAN','Qurban','https://nutech-integrasi.app/dummy.jpg',200000),('80e75c9c-b3d8-4209-b12e-abd389fe0642','VOUCHER_MAKANAN','Voucher Makanan','https://nutech-integrasi.app/dummy.jpg',100000),('abf3f1c0-a000-4c03-a80e-0037cd810002','ZAKAT','Zakat','https://nutech-integrasi.app/dummy.jpg',300000),('bea78dba-ee1c-4389-a21a-c99dc425a0c5','PGN','PGN Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),('fa198afd-25d9-4862-b22c-00e05fe00759','PAJAK','Pajak PBB','https://nutech-integrasi.app/dummy.jpg',40000);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `service_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `total_amount` float NOT NULL,
  `created_on` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`),
  KEY `user_id` (`user_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-25 21:23:40
