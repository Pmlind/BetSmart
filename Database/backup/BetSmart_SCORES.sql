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
-- Table structure for table `SCORES`
--

DROP TABLE IF EXISTS `SCORES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SCORES` (
  `week` int NOT NULL,
  `team1` varchar(40) NOT NULL,
  `team1scores` int DEFAULT NULL,
  `team2` varchar(40) NOT NULL,
  `team2scores` int DEFAULT NULL,
  PRIMARY KEY (`week`,`team1`,`team2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SCORES`
--

LOCK TABLES `SCORES` WRITE;
/*!40000 ALTER TABLE `SCORES` DISABLE KEYS */;
INSERT INTO `SCORES` VALUES (1,'Baltimore Ravens',24,'New York Jets',9),(1,'Buffalo Bills',31,'Los Angeles Rams',10),(1,'Chicago Bears',19,'San Francisco 49ers',10),(1,'Cleveland Browns',26,'Carolina Panthers',24),(1,'Indianapolis Colts',20,'Houston Texans',20),(1,'Kansas City Chiefs',44,'Arizona Cardinals',21),(1,'Los Angeles Chargers',24,'Las Vegas Raiders',19),(1,'Miami Dolphins',20,'New England Patriots',7),(1,'Minnesota Vikings',23,'Green Bay Packers',7),(1,'New Orleans Saints',27,'Atlanta Falcons',26),(1,'New York Giants',21,'Tennessee Titans',20),(1,'Philadelphia Eagles',38,'Detroit Lions',35),(1,'Pittsburgh Steelers',23,'Cincinnati Bengals',20),(1,'Seattle Seahawks',17,'Denver Broncos',16),(1,'Tampa Bay Buccaneers',19,'Dallas Cowboys',3),(1,'Washington Commanders',28,'Jacksonville Jaguars',22),(2,'Arizona Cardinals',29,'Las Vegas Raiders',23),(2,'Buffalo Bills',41,'Tennessee Titans',7),(2,'Dallas Cowboys',20,'Cincinnati Bengals',17),(2,'Denver Broncos',16,'Houston Texans',9),(2,'Detroit Lions',36,'Washington Commanders',27),(2,'Green Bay Packers',27,'Chicago Bears',10),(2,'Jacksonville Jaguars',24,'Indianapolis Colts',0),(2,'Kansas City Chiefs',27,'Los Angeles Chargers',24),(2,'Los Angeles Rams',31,'Atlanta Falcons',27),(2,'Miami Dolphins',42,'Baltimore Ravens',38),(2,'New England Patriots',17,'Pittsburgh Steelers',14),(2,'New York Giants',19,'Carolina Panthers',16),(2,'New York Jets',31,'Cleveland Browns',30),(2,'Philadelphia Eagles',24,'Minnesota Vikings',7),(2,'San Francisco 49ers',27,'Seattle Seahawks',7),(2,'Tampa Bay Buccaneers',20,'New Orleans Saints',10),(3,'Atlanta Falcons',27,'Seattle Seahawks',23),(3,'Baltimore Ravens',37,'New England Patriots',26),(3,'Carolina Panthers',22,'New Orleans Saints',14),(3,'Chicago Bears',23,'Houston Texans',20),(3,'Cincinnati Bengals',27,'New York Jets',12),(3,'Cleveland Browns',29,'Pittsburgh Steelers',17),(3,'Dallas Cowboys',23,'New York Giants',16),(3,'Denver Broncos',11,'San Francisco 49ers',10),(3,'Green Bay Packers',14,'Tampa Bay Buccaneers',12),(3,'Indianapolis Colts',20,'Kansas City Chiefs',17),(3,'Jacksonville Jaguars',38,'Los Angeles Chargers',10),(3,'Los Angeles Rams',20,'Arizona Cardinals',12),(3,'Miami Dolphins',21,'Buffalo Bills',19),(3,'Minnesota Vikings',28,'Detroit Lions',24),(3,'Philadelphia Eagles',24,'Washington Commanders',8),(3,'Tennessee Titans',24,'Las Vegas Raiders',22),(4,'Arizona Cardinals',26,'Carolina Panthers',16),(4,'Atlanta Falcons',23,'Cleveland Browns',20),(4,'Buffalo Bills',23,'Baltimore Ravens',20),(4,'Cincinnati Bengals',27,'Miami Dolphins',15),(4,'Dallas Cowboys',25,'Washington Commanders',10),(4,'Green Bay Packers',27,'New England Patriots',24),(4,'Kansas City Chiefs',41,'Tampa Bay Buccaneers',31),(4,'Las Vegas Raiders',32,'Denver Broncos',23),(4,'Los Angeles Chargers',34,'Houston Texans',24),(4,'Minnesota Vikings',28,'New Orleans Saints',25),(4,'New York Giants',20,'Chicago Bears',12),(4,'New York Jets',24,'Pittsburgh Steelers',20),(4,'Philadelphia Eagles',29,'Jacksonville Jaguars',21),(4,'San Francisco 49ers',24,'Los Angeles Rams',9),(4,'Seattle Seahawks',48,'Detroit Lions',45),(4,'Tennessee Titans',24,'Indianapolis Colts',17),(5,'Baltimore Ravens',19,'Cincinnati Bengals',17),(5,'Buffalo Bills',38,'Pittsburgh Steeler',3),(5,'Dallas Cowboys',22,'Los Angeles Rams',10),(5,'Houston Texans',13,'Jacksonville Jaguars',6),(5,'Indianapolis Colts',12,'Denver Broncos',9),(5,'Kansas City Chiefs',30,'Las Vegas Raiders',29),(5,'Los Angeles Chargers',30,'Cleveland Browns',28),(5,'Minnesota Vikings',29,'Chicago Bears',22),(5,'New England Patriots',29,'Detroit Lions',0),(5,'New Orleans Saints',39,'Seattle Seahawks',32),(5,'New York Giants',27,'Green Bay Packers',22),(5,'New York Jets',40,'Miami Dolphins',17),(5,'Philadelphia Eagles',20,'Arizona Cardinals',17),(5,'San Francisco 49ers',37,'Carolina Panthers',15),(5,'Tampa Bay Buccaneers',21,'Atlanta Falcons',15),(5,'Tennessee Titans',21,'Washington Commanders',17),(6,'Atlanta Falcons',28,'San Francisco 49ers',14),(6,'Buffalo Bills',24,'Kansas City Chiefs',20),(6,'Cincinnati Bengals',30,'New Orleans Saints',26),(6,'Indianapolis Colts',34,'Jacksonville Jaguars',27),(6,'Los Angeles Chargers',19,'Denver Broncos',16),(6,'Los Angeles Rams',24,'Carolina Panthers',10),(6,'Minnesota Vikings',24,'Miami Dolphins',16),(6,'New England Patriots',38,'Cleveland Browns',15),(6,'New York Giants',24,'Baltimore Ravens',20),(6,'New York Jets',27,'Green Bay Packers',10),(6,'Philadelphia Eagles',26,'Dallas Cowboys',17),(6,'Pittsburgh Steelers',20,'Tampa Bay Buccaneers',18),(6,'Seattle Seahawks',19,'Arizona Cardinals',9),(6,'Washington Commanders',12,'Chicago Bears',7),(7,'Arizona Cardinals',42,'New Orleans Saints',34),(7,'Baltimore Ravens',23,'Cleveland Browns',20),(7,'Carolina Panthers',21,'Tampa Bay Buccaneers',3),(7,'Chicago Bears',33,'New England Patriots',14),(7,'Cincinnati Bengals',35,'Atlanta Falcons',17),(7,'Dallas Cowboys',24,'Detroit Lions',6),(7,'Kansas City Chiefs',44,'San Francisco 49ers',23),(7,'Las Vegas Raiders',38,'Houston Texans',20),(7,'Miami Dolphins',16,'Pittsburgh Steelers',10),(7,'New York Giants',23,'Jacksonville Jaguars',17),(7,'New York Jets',16,'Denver Broncos',9),(7,'Seattle Seahawks',37,'Los Angeles Chargers',23),(7,'Tennessee Titans',19,'Indianapolis Colts',10),(7,'Washington Commanders',23,'Green Bay Packers',21),(8,'Atlanta Falcons',37,'Carolina Panthers',34),(8,'Baltimore Ravens',27,'Tampa Bay Buccaneers',22),(8,'Buffalo Bills',27,'Green Bay Packers',17),(8,'Cleveland Browns',32,'Cincinnati Bengals',13),(8,'Dallas Cowboys',49,'Chicago Bears',29),(8,'Denver Broncos',21,'Jacksonville Jaguars',17),(8,'Miami Dolphins',31,'Detroit Lions',27),(8,'Minnesota Vikings',34,'Arizona Cardinals',26),(8,'New England Patriots',22,'New York Jets',17),(8,'New Orleans Saints',24,'Las Vegas Raiders',0),(8,'Philadelphia Eagles',35,'Pittsburgh Steelers',13),(8,'San Francisco 49ers',31,'Los Angeles Rams',14),(8,'Seattle Seahawks',27,'New York Giants',13),(8,'Tennessee Titans',17,'Houston Texans',10),(8,'Washington Commanders',17,'Indianapolis Colts',16);
/*!40000 ALTER TABLE `SCORES` ENABLE KEYS */;
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

-- Dump completed on 2022-11-08 13:49:18
