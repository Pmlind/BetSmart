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
-- Table structure for table `PICKS`
--

DROP TABLE IF EXISTS `PICKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PICKS` (
  `week` int DEFAULT NULL,
  `picktype` text,
  `team` text,
  `spread` float DEFAULT NULL,
  `spreadby` float DEFAULT NULL,
  `inj` tinyint(1) DEFAULT NULL,
  `hit` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PICKS`
--

LOCK TABLES `PICKS` WRITE;
/*!40000 ALTER TABLE `PICKS` DISABLE KEYS */;
INSERT INTO `PICKS` VALUES (5,'ATS:','New York Giants',8.5,15.25,0,1),(5,'ATS:','Cleveland Browns',2.5,13,0,1),(5,'ATS:','Seattle Seahawks',4.5,15.5,0,0),(5,'ATS:','Atlanta Falcons',9.5,13.5,0,1),(5,'Regular:','Dallas Cowboys',5.5,13.75,0,1),(5,'Weighted:','Dallas Cowboys',5.5,11.4583,0,1),(5,'ATS:','Dallas Cowboys',5.5,13.75,0,1),(6,'ATS:','Chicago Bears',-0.5,12.1,0,0),(6,'Weighted:','New England Patriots',2.5,15.6833,0,1),(6,'ATS:','New York Jets',7.5,15.9,0,1),(6,'Regular:','Jacksonville Jaguars',1.5,12.7,0,0),(6,'ATS:','Jacksonville Jaguars',1.5,22.7,0,0),(6,'ATS:','New York Giants',5.5,16.3,0,1),(6,'Regular:','Carolina Panthers',10.5,11.9,0,0),(6,'ATS:','Buffalo Bills',-2.5,11.9,0,1),(7,'ATS:','Atlanta Falcons',6.5,15.3333,0,0),(7,'Weighted:','New York Jets',1.5,13.1222,0,1),(7,'ATS:','New York Jets',1.5,19.3333,0,1),(7,'ATS:','Seattle Seahawks',5.5,14.5,0,1),(7,'ATS:','Pittsburgh Steelers',7.5,13.3333,0,1),(7,'Weighted:','New England Patriots',-7.5,11.9222,0,0),(8,'ATS:','Atlanta Falcons',-4.5,10.6429,0,0),(8,'ATS:','Baltimore Ravens',1,11.5,0,1),(8,'ATS:','Buffalo Bills',-11.5,24.119,0,0),(8,'ATS:','Cincinnati Bengals',-3.5,11.8571,1,0),(8,'ATS:','Jacksonville Jaguars',-2.5,14.2857,0,0),(8,'ATS:','Las Vegas Raiders',-1.5,10.8929,0,0),(8,'ATS:','New York Jets',2.5,13,0,0),(8,'ATS:','San Francisco 49ers',-1.5,12.2619,0,1),(9,'ATS:','Atlanta Falcons',3,18.1161,0,NULL),(9,'ATS:','Carolina Panthers',7,10.0625,0,NULL),(9,'ATS:','Chicago Bears',5,11.9375,0,NULL),(9,'ATS:','Jacksonville Jaguars',1.5,13.125,0,NULL),(9,'ATS:','Kansas City Chiefs',-12.5,11.7857,0,NULL),(9,'ATS:','New England Patriots',-5.5,14.3125,0,NULL),(9,'Weighted:','New York Jets',12.5,17.4847,0,NULL),(9,'ATS:','Philadelphia Eagles',-13.5,11.7143,0,NULL),(9,'ATS:','Seattle Seahawks',2,13.625,0,NULL),(9,'ATS:','Tampa Bay Buccaneers',-3,11.7857,0,NULL),(9,'Weighted:','Tennessee Titans',12.5,14.9881,0,NULL);
/*!40000 ALTER TABLE `PICKS` ENABLE KEYS */;
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

-- Dump completed on 2022-11-08 13:49:20
