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
-- Table structure for table `TEAMS`
--

DROP TABLE IF EXISTS `TEAMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TEAMS` (
  `games` int NOT NULL,
  `scores` float NOT NULL,
  `weightedscore` decimal(5,3) DEFAULT NULL,
  `ats` float DEFAULT NULL,
  `mascot` varchar(20) DEFAULT NULL,
  `names` varchar(40) NOT NULL,
  PRIMARY KEY (`names`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TEAMS`
--

LOCK TABLES `TEAMS` WRITE;
/*!40000 ALTER TABLE `TEAMS` DISABLE KEYS */;
INSERT INTO `TEAMS` VALUES (8,-28,20.473,-8.5,'Cardinals','Arizona Cardinals'),(8,-5,-14.395,29.5,'Falcons','Atlanta Falcons'),(8,25,12.943,1.5,'Ravens','Baltimore Ravens'),(7,105,5.862,58.5,'Bills','Buffalo Bills'),(8,-28,-17.137,6,'Panthers','Carolina Panthers'),(8,-26,-34.707,15.5,'Bears','Chicago Bears'),(8,22,-9.163,-10.5,'Bengals','Cincinnati Bengals'),(8,1,-14.505,-0.5,'Browns','Cleveland Browns'),(8,50,50.974,51.5,'Cowboys','Dallas Cowboys'),(8,-11,-13.920,-20,'Broncos','Denver Broncos'),(7,-52,-47.154,-31.5,'Lions','Detroit Lions'),(8,-28,16.222,-57.5,'Packers','Green Bay Packers'),(7,-38,-25.733,2.5,'Texans','Houston Texans'),(8,-28,2.729,-35.5,'Colts','Indianapolis Colts'),(8,14,-23.414,21,'Jaguars','Jacksonville Jaguars'),(7,51,10.983,31.5,'Chiefs','Kansas City Chiefs'),(7,-11,-32.421,-17.5,'Raiders','Las Vegas Raiders'),(7,-25,13.633,-45,'Chargers','Los Angeles Chargers'),(7,-39,2.364,-65,'Rams','Los Angeles Rams'),(8,-14,-2.762,-16,'Dolphins','Miami Dolphins'),(7,29,-4.074,8,'Vikings','Minnesota Vikings'),(8,14,47.874,15,'Patriots','New England Patriots'),(8,-1,32.972,-0.5,'Saints','New Orleans Saints'),(8,6,-5.336,30,'Giants','New York Giants'),(8,17,46.577,53,'Jets','New York Jets'),(7,78,50.216,35.5,'Eagles','Philadelphia Eagles'),(7,-42,-43.700,-7,'Steelers','Pittsburgh Steelers'),(8,29,6.086,0,'49ers','San Francisco 49ers'),(8,11,22.419,36.5,'Seahawks','Seattle Seahawks'),(8,-5,-51.143,-44,'Buccaneers','Tampa Bay Buccaneers'),(7,-6,28.400,-2,'Titans','Tennessee Titans'),(8,-30,-14.163,-13,'Commanders','Washington Commanders');
/*!40000 ALTER TABLE `TEAMS` ENABLE KEYS */;
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

-- Dump completed on 2022-11-08 13:49:10
