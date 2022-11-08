-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: betsmart.c4vgirc2flsl.us-east-1.rds.amazonaws.com    Database: BetSmart
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `USERPICKS`
--

DROP TABLE IF EXISTS `USERPICKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERPICKS` (
  `username` varchar(30) NOT NULL,
  `week` int NOT NULL,
  `pickteam` varchar(45) NOT NULL,
  `betamount` int DEFAULT NULL,
  `hit` int DEFAULT NULL,
  `gain` int DEFAULT NULL,
  `balance` int DEFAULT NULL,
  PRIMARY KEY (`username`,`week`,`pickteam`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERPICKS`
--

LOCK TABLES `USERPICKS` WRITE;
/*!40000 ALTER TABLE `USERPICKS` DISABLE KEYS */;
INSERT INTO `USERPICKS` VALUES ('firstacc',1,'Kansas City Chiefs',100,1,50,150),('firstacc',2,'Kansas City Chiefs',150,1,75,225),('firstacc',3,'Kansas City Chiefs',200,0,-100,125),('firstacc',4,'Kansas City Chiefs',120,1,60,185),('firstacc',5,'Kansas City Chiefs',150,1,75,260),('firstacc',6,'Kansas City Chiefs',260,0,-130,130),('firstacc',7,'Kansas City Chiefs',130,1,70,200);
/*!40000 ALTER TABLE `USERPICKS` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-08 13:49:13
