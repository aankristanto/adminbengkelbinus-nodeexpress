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
) ENGINE=InnoDB AUTO_INCREMENT=10054 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (10000,'Init Customer','Init Address','080012345'),(10001,'Testing 1',NULL,NULL),(10002,'Andi','nvre','9939083503'),(10003,'Andidssaxsa','nvre','9939083503'),(10004,'Andidssaxsa1','nvre23','99390835033'),(10005,'andi1','kembangsari','0988938939'),(10006,'Andi 2','eojfowpfwe','093905043'),(10007,'Andi 3','jkkeifewifejwoif','994030394029'),(10008,'Aan Kristanto Nugroho','iejrp','+6282234725445'),(10009,'Aan Kristanto Nugroho','luguh','+6282234725445'),(10010,'Aan Kristanto Nugroho',';jijipj','+6282234725445'),(10011,'ijfewfepw','efnwiofiewj','443549032'),(10012,'icejwovkowe','vk nkv','90439493'),(10013,'Aan Kristanto Nugroho 2','8u','+6282234725445'),(10014,'andi 4','abdfhiwoqa','98438483'),(10015,'andi 4 5','abdfhiwoqa','98438483'),(10016,'andi 44','abdfhiwoqa','98438483'),(10017,'andi 45','abdfhiwoqa','98438483'),(10018,'andi 46','abdfhiwoqa','98438483'),(10019,'andi 47','abdfhiwoqa','98438483'),(10020,'andi 48','abdfhiwoqa','98438483'),(10021,'andii 48','abdfhiwoqa','98438483'),(10022,'andii 49','abdfhiwoqa','98438483'),(10023,'andii 497','abdfhiwoqa','98438483kk'),(10024,'andii 497','abdfhiwoqa','98438483kk'),(10025,'andii 495555','abdfhiwoqa','9843848990'),(10026,'andii 495555','abdfhiwoqa','9843848990'),(10027,'andii 495599','abdfhiwoqa','9843848990'),(10028,'ojoo','nnjkm ','7978989'),(10029,'ojoo 555','nnjkm ','7978989'),(10030,'ojoo 5551','nnjkm ','7978989'),(10031,'ojoo 553','nnjkm ','7978989'),(10032,'ojoo 5535','nnjkm ','7978989'),(10033,'ojoo 55','nnjkm ','7978989'),(10034,'ojoo 553','nnjkm ','797898944'),(10035,'ojoo 553432434','nnjkm lmv em e','797898944'),(10036,'ojoo 5534324','nnjkm lmv em444fref e','7978989444'),(10037,'Andika Pratama','Semarang','082234349090'),(10038,'Andika Pratama Mulyana','Semarang, Banjar','08223434909044'),(10039,'Andika Pratam Mulyana','Semarang, Banjarsari','0822343409044'),(10040,'Grace','Jl. Siliwangi Semarang','082233234545'),(10041,'Grace','Jl. Siliwangi Semarang','082233234545'),(10042,'Grace','Jl. Siliwangi Semarang','082233234545'),(10043,'Debora Putri Pratama','Ungaran, Semarang','082234328989'),(10044,'Debora Putri Pratama','Ungaran, Semarang','082234328989'),(10045,'Debora Putri Pratama','Ungaran, Semarang','082234328989'),(10046,'Debora Putri Pratama','Ungaran, Semarang','082234328989'),(10047,'Debora Putri Pratama','Ungaran, Semarang','082234328989'),(10048,'Debora Putri Pratama','Ungaran, Semarang','082234328989'),(10049,'Aan Kristanto Nugroho','Bawen, Kab Semarang','+6282234725445'),(10050,'Aan Kristanto Nugroho','bawen','+6282234725445'),(10051,'Andika','Siliwangi, Semarang','08233445566'),(10052,'Aan Kristanto Nugroho','Bawen','+6282234725445'),(10053,'Andi','Semarang','083444333222');
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
-- Table structure for table `payments_data`
--

DROP TABLE IF EXISTS `payments_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments_data` (
  `id_payment` varchar(255) DEFAULT NULL,
  `id_service` int(255) DEFAULT NULL,
  `barangjasa1` varchar(255) DEFAULT NULL,
  `barangjasa2` varchar(255) DEFAULT NULL,
  `barangjasa3` varchar(255) DEFAULT NULL,
  `barangjasa4` varchar(255) DEFAULT NULL,
  `barangjasa5` varchar(255) DEFAULT NULL,
  `biaya1` int(255) DEFAULT NULL,
  `biaya2` int(255) DEFAULT NULL,
  `biaya3` int(255) DEFAULT NULL,
  `biaya4` int(255) DEFAULT NULL,
  `biaya5` int(255) DEFAULT NULL,
  `totalbiaya` int(255) DEFAULT NULL,
  `totalbayar` int(255) DEFAULT NULL,
  `totalkembalian` int(11) DEFAULT NULL,
  `trx_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments_data`
--

LOCK TABLES `payments_data` WRITE;
/*!40000 ALTER TABLE `payments_data` DISABLE KEYS */;
INSERT INTO `payments_data` VALUES ('61605062472403',6,'Service Full','Ganti Kampas','-','-','-',120000,50000,0,0,0,NULL,175000,NULL,'2020-11-11 09:41:12'),('61605062542325',6,'Service Full','Ganti Kampas','-','-','-',120000,50000,0,0,0,NULL,175000,NULL,'2020-11-11 09:42:22'),('51605062784453',5,'Service Full','-','-','-','-',150000,0,0,0,0,150000,1600000,1450000,'2020-11-11 09:46:24'),('71605063415549',7,'Service CVT','Ganti Oli','-','-','-',100000,50000,0,0,0,150000,150000,0,'2020-11-11 09:56:55'),('81605067181656',8,'Service CVT','Ganti Oli','Jasa Service','-','-',150000,50000,60000,0,0,260000,300000,40000,'2020-11-11 10:59:41'),('101605157131564',10,'Service Full','Ganti Oli','','','',750000,50000,0,0,0,800000,900000,100000,'2020-11-12 11:58:51');
/*!40000 ALTER TABLE `payments_data` ENABLE KEYS */;
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
  `id_payment` varchar(255) DEFAULT NULL,
  `technician` varchar(255) DEFAULT NULL,
  `id_users` int(255) DEFAULT NULL,
  `date_in` datetime DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `merkhonda` tinyint(1) DEFAULT NULL,
  `resolving_detail` varchar(255) DEFAULT NULL,
  `date_close` datetime DEFAULT NULL,
  PRIMARY KEY (`id_service`),
  KEY `services_FK` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (5,10043,'Honda Vario Techno','H 8789 GH',2019,'0434934304540034','490340394343','mesin ngadat','51605062784453','JAMALUDIN',NULL,'2020-11-10 00:00:00','CLOSE',1,'penggantian mesin utama',NULL),(6,10049,'Honda Revo','K 8765 MM',2020,'7687008','676798','rantai putus','61605062542325','dody',NULL,'2020-11-10 00:00:00','CLOSE',1,'penggantian rantai','2020-11-10 00:00:00'),(7,10050,'Honda Beat','H 8879 MN',2017,'30840395-3','48934830','cvt jebol','71605063415549','dody',NULL,'2020-11-11 09:54:16','CLOSE',1,'penggantia cvt','2020-11-11 09:55:14'),(8,10051,'Honda Beat','H 7788 CK',2016,'4993843','7589483043','CVT error / rusak','81605067181656','Aris',NULL,'2020-11-11 10:56:14','CLOSE',1,'Ganti Busi & CVT','2020-11-11 10:57:38'),(9,10050,'Honda Vario Techno','H 8322',2019,'49034803','4039043','ganti oli',NULL,'JAMAL',NULL,'2020-11-11 11:12:43','CLOSE',1,'ganti oli\r\n','2020-11-11 11:12:58'),(10,10053,'Honda Vario','H 7788',2018,'73949-2943','4394300943','Mesin ngadat','101605157131564','Dody',NULL,'2020-11-12 11:56:45','CLOSE',1,'Penggantian Mesin','2020-11-12 11:57:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','96437dc4f761a4d065d2940926b3f2cf','Administrator',NULL);
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

-- Dump completed on 2020-11-18 12:00:21
