-- MariaDB dump 10.17  Distrib 10.5.6-MariaDB, for osx10.13 (x86_64)
--
-- Host: localhost    Database: adminbengkelbinus
-- ------------------------------------------------------
-- Server version	10.5.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customer_id` int(255) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) DEFAULT NULL,
  `customer_address` text DEFAULT NULL,
  `customer_phone` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10033 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (10000,'Init Customer','Init Address','080012345'),(10001,'Testing 1',NULL,NULL),(10002,'Andi','nvre','9939083503'),(10003,'Andidssaxsa','nvre','9939083503'),(10004,'Andidssaxsa1','nvre23','99390835033'),(10005,'andi1','kembangsari','0988938939'),(10006,'Andi 2','eojfowpfwe','093905043'),(10007,'Andi 3','jkkeifewifejwoif','994030394029'),(10008,'Aan Kristanto Nugroho','iejrp','+6282234725445'),(10009,'Aan Kristanto Nugroho','luguh','+6282234725445'),(10010,'Aan Kristanto Nugroho',';jijipj','+6282234725445'),(10011,'ijfewfepw','efnwiofiewj','443549032'),(10012,'icejwovkowe','vk nkv','90439493'),(10013,'Aan Kristanto Nugroho 2','8u','+6282234725445'),(10014,'andi 4','abdfhiwoqa','98438483'),(10015,'andi 4 5','abdfhiwoqa','98438483'),(10016,'andi 44','abdfhiwoqa','98438483'),(10017,'andi 45','abdfhiwoqa','98438483'),(10018,'andi 46','abdfhiwoqa','98438483'),(10019,'andi 47','abdfhiwoqa','98438483'),(10020,'andi 48','abdfhiwoqa','98438483'),(10021,'andii 48','abdfhiwoqa','98438483'),(10022,'andii 49','abdfhiwoqa','98438483'),(10023,'andii 497','abdfhiwoqa','98438483kk'),(10024,'andii 497','abdfhiwoqa','98438483kk'),(10025,'andii 495555','abdfhiwoqa','9843848990'),(10026,'andii 495555','abdfhiwoqa','9843848990'),(10027,'andii 495599','abdfhiwoqa','9843848990'),(10028,'ojoo','nnjkm ','7978989'),(10029,'ojoo 555','nnjkm ','7978989'),(10030,'ojoo 5551','nnjkm ','7978989'),(10031,'ojoo 553','nnjkm ','7978989'),(10032,'ojoo 5535','nnjkm ','7978989');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_services`
--

DROP TABLE IF EXISTS `log_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_services` (
  `id_log` int(255) NOT NULL AUTO_INCREMENT,
  `id_service` int(255) DEFAULT NULL,
  PRIMARY KEY (`id_log`),
  KEY `log_services_FK` (`id_service`),
  CONSTRAINT `log_services_FK` FOREIGN KEY (`id_service`) REFERENCES `services` (`id_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_services`
--

LOCK TABLES `log_services` WRITE;
/*!40000 ALTER TABLE `log_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id_service` int(255) NOT NULL AUTO_INCREMENT,
  `customer_id` int(255) DEFAULT NULL,
  `jeniskendaraan` varchar(255) DEFAULT NULL,
  `nopol` varchar(255) DEFAULT NULL,
  `tahunkendaraan` int(10) DEFAULT NULL,
  `norangka` varchar(255) DEFAULT NULL,
  `nomesin` varchar(255) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `id_payment` int(255) DEFAULT NULL,
  `technician` varchar(255) DEFAULT NULL,
  `id_users` int(255) DEFAULT NULL,
  `date_in` datetime DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `merkhonda` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_service`),
  KEY `services_FK` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_users` int(255) NOT NULL AUTO_INCREMENT,
  `usernames` varchar(255) DEFAULT NULL,
  `passwords` varchar(255) DEFAULT NULL,
  `names` varchar(255) DEFAULT NULL,
  `level` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_users`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-06 11:36:27
