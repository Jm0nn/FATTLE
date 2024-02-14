DROP DATABASE IF EXISTS `fattle`;

CREATE DATABASE `fattle`;

USE `fattle`;

-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fattle
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

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
-- Table structure for table `avatar_tb`
--

DROP TABLE IF EXISTS `avatar_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar_tb` (
  `avatar_cd` char(3) NOT NULL,
  `level` int NOT NULL,
  `info` varchar(50) NOT NULL,
  `img_path` varchar(200) NOT NULL,
  PRIMARY KEY (`avatar_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar_tb`
--

LOCK TABLES `avatar_tb` WRITE;
/*!40000 ALTER TABLE `avatar_tb` DISABLE KEYS */;
INSERT INTO `avatar_tb` VALUES ('PK1',1,'귀여운 알입니다.','src/img1.png'),('PK2',2,'귀여운 살덩이입니다.','src/img2.png'),('PK3',3,'귀여운 팬더입니다.','src/img3.png'),('PK4',4,'귀여운 빅팬더입니다.','src/img4.png'),('PK5',5,'사나운 빅빅팬더입니다.','src/img5.png');
/*!40000 ALTER TABLE `avatar_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battle_betting_tb`
--

DROP TABLE IF EXISTS `battle_betting_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battle_betting_tb` (
  `betting_cd` int NOT NULL AUTO_INCREMENT,
  `battle_cd` char(6) NOT NULL,
  `content` varchar(50) NOT NULL,
  PRIMARY KEY (`betting_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battle_betting_tb`
--

LOCK TABLES `battle_betting_tb` WRITE;
/*!40000 ALTER TABLE `battle_betting_tb` DISABLE KEYS */;
INSERT INTO `battle_betting_tb` VALUES (2,'XEYTVT','밥 사기');
/*!40000 ALTER TABLE `battle_betting_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battle_player_tb`
--

DROP TABLE IF EXISTS `battle_player_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battle_player_tb` (
  `battle_cd` char(6) NOT NULL,
  `user_cd` bigint NOT NULL,
  `before_weight` float DEFAULT '0',
  `after_weight` float DEFAULT '0',
  `goal_weight` float DEFAULT '0',
  `live_pt` int DEFAULT '0',
  `food_pt` int DEFAULT '0',
  `live_user_pt` int DEFAULT '0',
  `food_user_pt` int DEFAULT '0',
  `quest_pt` int DEFAULT '0',
  `goal_pt` int DEFAULT '0',
  PRIMARY KEY (`battle_cd`,`user_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battle_player_tb`
--

LOCK TABLES `battle_player_tb` WRITE;
/*!40000 ALTER TABLE `battle_player_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `battle_player_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battle_point_tb`
--

DROP TABLE IF EXISTS `battle_point_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battle_point_tb` (
  `point_cd` int NOT NULL AUTO_INCREMENT,
  `battle_cd` char(6) NOT NULL,
  `player_cd` bigint NOT NULL,
  `trigger_cd` bigint NOT NULL,
  `type` tinyint DEFAULT '0',
  `point` int DEFAULT '0',
  `rec_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`point_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battle_point_tb`
--

LOCK TABLES `battle_point_tb` WRITE;
/*!40000 ALTER TABLE `battle_point_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `battle_point_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battle_tb`
--

DROP TABLE IF EXISTS `battle_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battle_tb` (
  `battle_cd` char(6) NOT NULL,
  `creator_cd` bigint NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '배틀',
  `start_dt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_dt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint DEFAULT '0',
  PRIMARY KEY (`battle_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battle_tb`
--

LOCK TABLES `battle_tb` WRITE;
/*!40000 ALTER TABLE `battle_tb` DISABLE KEYS */;
INSERT INTO `battle_tb` VALUES ('CSPJDV',0,'배틀','2024-02-06 08:59:03','2024-02-28 07:00:00',0),('PMJBPC',3323676782,'배틀','2024-02-07 08:46:38','2024-02-07 08:46:38',0),('WQFMMH',3323676782,'배틀','2024-02-06 09:00:23','2024-02-28 07:00:00',0),('XEYTVT',1,'배틀1','2024-02-06 23:00:00','2024-02-28 07:00:00',0),('YUEAAH',1,'배틀','2024-02-06 07:32:36','2024-02-28 07:00:00',0),('ZPTYHX',0,'배틀','2024-02-06 08:59:42','2024-02-28 07:00:00',0);
/*!40000 ALTER TABLE `battle_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `battle_trigger_tb`
--

DROP TABLE IF EXISTS `battle_trigger_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battle_trigger_tb` (
  `battle_cd` char(6) NOT NULL,
  `user_cd` bigint NOT NULL,
  `live_pt` int DEFAULT '0',
  PRIMARY KEY (`battle_cd`,`user_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battle_trigger_tb`
--

LOCK TABLES `battle_trigger_tb` WRITE;
/*!40000 ALTER TABLE `battle_trigger_tb` DISABLE KEYS */;
INSERT INTO `battle_trigger_tb` VALUES ('PMJBPC',3323676782,0),('XEYTVT',1,0);
/*!40000 ALTER TABLE `battle_trigger_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_tb`
--

DROP TABLE IF EXISTS `exercise_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_tb` (
  `exercise_cd` int NOT NULL AUTO_INCREMENT,
  `user_cd` bigint NOT NULL,
  `type_cd` char(3) NOT NULL,
  `rec_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`exercise_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_tb`
--

LOCK TABLES `exercise_tb` WRITE;
/*!40000 ALTER TABLE `exercise_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_type_tb`
--

DROP TABLE IF EXISTS `exercise_type_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_type_tb` (
  `type_cd` char(3) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`type_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_type_tb`
--

LOCK TABLES `exercise_type_tb` WRITE;
/*!40000 ALTER TABLE `exercise_type_tb` DISABLE KEYS */;
INSERT INTO `exercise_type_tb` VALUES ('BUR','버피'),('PLA','플랭크'),('PUL','턱걸이'),('PUS','팔굽혀펴기'),('RUN','달리기'),('SQU','스쿼트');
/*!40000 ALTER TABLE `exercise_type_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exp_history_tb`
--

DROP TABLE IF EXISTS `exp_history_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exp_history_tb` (
  `exp_cd` int NOT NULL AUTO_INCREMENT,
  `user_cd` bigint NOT NULL,
  `rec_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(50) NOT NULL,
  `point` int DEFAULT '0',
  `content` varchar(50) NOT NULL,
  PRIMARY KEY (`exp_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exp_history_tb`
--

LOCK TABLES `exp_history_tb` WRITE;
/*!40000 ALTER TABLE `exp_history_tb` DISABLE KEYS */;
INSERT INTO `exp_history_tb` VALUES (1,3323676782,'2024-02-06 09:00:16','출석',2,'출석'),(2,3300113746,'2024-02-06 09:26:52','출석',2,'출석'),(3,3324144987,'2024-02-07 00:52:41','출석',2,'출석'),(4,3300113746,'2024-02-07 02:15:29','출석',2,'출석'),(5,3331199655,'2024-02-07 02:47:34','출석',2,'출석'),(6,3323676782,'2024-02-07 08:26:39','출석',2,'출석');
/*!40000 ALTER TABLE `exp_history_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow_tb`
--

DROP TABLE IF EXISTS `follow_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_tb` (
  `follow_cd` int NOT NULL,
  `to_user_cd` bigint NOT NULL,
  `from_user_cd` bigint NOT NULL,
  PRIMARY KEY (`follow_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_tb`
--

LOCK TABLES `follow_tb` WRITE;
/*!40000 ALTER TABLE `follow_tb` DISABLE KEYS */;
INSERT INTO `follow_tb` VALUES (1,1,2),(2,2,3),(3,4,3),(4,5,3),(5,6,4),(6,7,6);
/*!40000 ALTER TABLE `follow_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_board_tb`
--

DROP TABLE IF EXISTS `food_board_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_board_tb` (
  `food_board_cd` int NOT NULL,
  `battle_cd` char(6) NOT NULL,
  `player_cd` bigint NOT NULL,
  `rec_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `img_path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`food_board_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_board_tb`
--

LOCK TABLES `food_board_tb` WRITE;
/*!40000 ALTER TABLE `food_board_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_board_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_comment_tb`
--

DROP TABLE IF EXISTS `food_comment_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_comment_tb` (
  `food_comment_cd` int NOT NULL,
  `food_board_cd` int NOT NULL,
  `trigger_cd` bigint NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `rec_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`food_comment_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_comment_tb`
--

LOCK TABLES `food_comment_tb` WRITE;
/*!40000 ALTER TABLE `food_comment_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_comment_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_info_tb`
--

DROP TABLE IF EXISTS `food_info_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_info_tb` (
  `food_cd` varchar(8) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gram` float DEFAULT NULL,
  `calory` int DEFAULT NULL,
  `carbo` int DEFAULT NULL,
  `fat` int DEFAULT NULL,
  `protein` int DEFAULT NULL,
  PRIMARY KEY (`food_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_info_tb`
--

LOCK TABLES `food_info_tb` WRITE;
/*!40000 ALTER TABLE `food_info_tb` DISABLE KEYS */;
INSERT INTO `food_info_tb` VALUES ('01011001','쌀밥',210,334,73,0,5),('01012002','콩밥',200,322,65,1,8),('01012003','보리밥',200,316,70,0,5),('01012004','돌솥밥',350,528,101,8,10),('01013001','감자밥',200,308,68,0,5),('01013002','곤드레밥',350,506,108,8,14),('01014001','김치볶음밥',500,656,79,5,8),('01014002','주먹밥',150,209,36,3,6),('01014003','볶음밥',400,687,100,19,24),('01014004','일반비빔밥',500,702,95,25,22),('01014005','전주비빔밥',450,662,92,13,15),('01014006','삼선볶음밥',400,683,113,16,19),('01014007','새우볶음밥',400,634,91,17,24),('01014008','알밥',400,606,92,3,15),('01014010','오므라이스',450,684,101,19,23),('01014011','육회비빔밥',450,661,91,17,32),('01014012','해물볶음밥',400,659,85,23,22),('01014013','열무비빔밥',400,445,90,3,12),('01015002','불고기덮밥',500,699,92,21,29),('01015003','소고기국밥',700,331,54,4,16),('01015004','송이덮밥',600,600,103,14,16),('01015005','오징어덮밥',500,693,83,20,40),('01015006','자장밥',500,729,98,24,25),('01015007','잡채밥',650,851,125,28,21),('01015008','잡탕밥',750,737,100,22,29),('01015009','장어덮밥',400,671,103,19,26),('01015010','제육덮밥',500,796,95,27,37),('01015011','짬뽕밥',900,696,93,22,41),('01015012','순대국밥',900,690,34,16,17),('01015013','카레라이스',500,653,92,10,13),('01015014','전주콩나물국밥',900,432,88,3,12),('01015015','해물덮밥',700,837,100,29,51),('01015016','회덮밥',500,697,101,11,42),('01015017','소머리국밥',1100,891,77,40,48),('01015018','돼지국밥',1200,811,78,36,56),('01015019','하이라이스',360,477,84,9,7),('01016001','김치김밥',250,377,71,4,11),('01016002','농어초밥',250,414,74,2,19),('01016003','문어초밥',250,377,71,1,16),('01016004','새우초밥',250,395,69,1,22),('01016005','새우튀김롤',300,572,81,18,21),('01016006','샐러드김밥',250,422,75,7,12),('01016007','광어초밥',300,471,72,3,33),('01016008','소고기김밥',250,425,76,6,14),('01016009','갈비삼각김밥',100,183,32,2,6),('01016011','연어초밥',250,451,70,5,24),('01016012','유부초밥',250,463,78,11,12),('01016013','장어초밥',400,486,74,12,16),('01016014','참치김밥',250,401,47,14,19),('01016015','참치마요삼각김밥',100,189,31,2,8),('01016018','캘리포니아롤',300,468,81,9,12),('01016019','한치초밥',250,389,77,1,13),('01016020','일반김밥',200,348,63,5,10),('02011001','간자장',650,807,121,26,29),('02011002','굴짬뽕',900,640,115,7,37),('02011003','기스면',1000,645,98,11,43),('02011004','김치라면',650,512,80,20,12),('02011005','김치우동',800,512,99,4,16),('02011006','김치말이국수',600,310,60,2,10),('02011007','닭칼국수',900,643,70,19,39),('02011008','들깨칼국수',600,442,76,6,17),('02011009','떡라면',700,672,121,17,15),('02011010','라면',550,509,83,17,14),('02011011','막국수',550,566,111,5,26),('02011012','메밀국수',600,588,120,4,25),('02011013','물냉면',800,579,96,9,28),('02011014','비빔국수',550,577,114,9,16),('02011015','비빔냉면',550,594,91,9,23),('02011016','삼선우동',1000,692,89,10,56),('02011017','삼선자장면',700,787,111,24,38),('02011018','삼선짬뽕',900,629,89,13,39),('02011019','수제비',800,622,99,6,38),('02011020','쌀국수',600,321,46,5,21),('02011021','열무김치국수',800,488,81,8,21),('02011023','오일소스스파게티',400,626,99,16,14),('02011024','일식우동',700,420,81,1,16),('02011025','볶음우동',300,377,62,10,9),('02011027','자장면',650,760,134,23,15),('02011028','잔치국수',700,564,104,6,20),('02011029','짬뽕',1000,650,118,13,25),('02011030','짬뽕라면',750,633,88,24,31),('02011031','쫄면',450,622,110,6,12),('02011032','치즈라면',600,598,83,23,23),('02011033','콩국수',800,623,67,20,47),('02011034','크림소스스파게티',400,825,85,45,19),('02011035','토마토소스스파게티',500,642,102,17,20),('02011036','해물칼국수',900,621,124,4,24),('02011037','회냉면',550,638,131,8,20),('02011038','떡국',800,714,144,5,21),('02011039','떡만둣국',700,625,113,9,22),('02011040','짜장라면',250,409,63,14,12),('02012001','고기만두',250,454,55,18,18),('02012002','군만두',250,684,76,31,19),('02012003','김치만두',250,424,60,13,18),('02012004','물만두',120,158,20,5,5),('02012005','만둣국',700,432,53,14,19),('03011001','게살죽',800,554,103,7,18),('03011002','깨죽',800,505,71,18,13),('03011003','닭죽',1000,1181,92,48,75),('03011004','소고기버섯죽',800,573,102,6,20),('03011005','어죽',800,559,90,6,15),('03011006','잣죽',700,872,153,20,15),('03011007','전복죽',800,587,105,11,14),('03011008','참치죽',800,658,105,13,26),('03011009','채소죽',800,514,100,5,11),('03011010','팥죽',600,482,100,0,20),('03011011','호박죽',600,430,111,0,8),('03012001','콘스프',400,280,35,14,5),('03012002','토마토스프',400,382,12,25,18),('04011001','굴국',450,194,11,8,22),('04011002','김치국',450,85,13,3,6),('04011003','달걀국',450,193,5,11,16),('04011004','감자국',700,220,37,2,16),('04011005','미역국',500,50,4,4,2),('04011006','바지락조개국',550,159,8,1,25),('04011007','소고기무국',400,125,8,4,13),('04011008','소고기미역국',650,154,6,6,20),('04011009','소머리국밥',1100,891,77,40,48),('04011010','순대국',800,550,22,32,41),('04011011','어묵국',600,252,37,4,22),('04011012','오징어국',500,169,10,2,27),('04011013','토란국',250,462,85,7,23),('04011014','탕국',250,94,2,4,12),('04011015','홍합미역국',650,168,14,6,19),('04011016','황태해장국',600,184,6,7,25),('04012001','근대된장국',450,109,8,3,15),('04012002','미소된장국',150,37,1,1,4),('04012003','배추된장국',700,121,11,3,13),('04012005','선지(해장)국',1000,314,22,5,48),('04012006','콩나물국',400,22,1,1,1),('04012007','시금치된장국',400,121,9,3,16),('04012008','시래기된장국',450,99,10,2,10),('04012009','쑥된장국',450,117,17,2,13),('04012010','아욱된장국',450,103,9,2,11),('04012011','우거지된장국',450,85,13,1,6),('04012012','우거지해장국',600,158,14,5,14),('04012013','우렁된장국',500,245,21,7,24),('04013002','갈비탕',600,240,8,14,18),('04013003','감자탕',900,963,49,58,60),('04013004','곰탕',300,181,15,5,16),('04013005','매운탕',600,402,18,21,37),('04013006','꼬리곰탕',700,750,10,52,54),('04013007','꽃게탕',600,240,20,5,31),('04013008','낙지탕',600,186,11,2,29),('04013009','내장탕',700,549,13,31,56),('04013010','닭곰탕',650,527,15,24,58),('04013011','닭볶음탕',300,371,19,17,33),('04013012','지리탕',600,260,10,8,38),('04013013','도가니탕',800,563,5,34,54),('04013014','삼계탕',1000,881,44,40,76),('04013015','설렁탕',600,422,10,18,52),('04013017','알탕',700,424,49,6,49),('04013018','연포탕',1000,541,21,9,91),('04013019','오리탕',600,480,24,21,43),('04013020','추어탕',700,338,24,11,37),('04013021','해물탕',600,272,19,3,41),('04013022','닭개장',700,317,19,14,33),('04013023','육개장',440,137,11,5,13),('04013024','뼈해장국',1000,692,25,37,67),('04014001','미역오이냉국',450,77,19,1,5),('04015001','고등어찌개',600,605,32,28,59),('04015003','동태찌개',800,369,18,7,59),('04016001','부대찌개',600,525,46,28,27),('04017001','된장찌개',400,147,15,5,11),('04017002','청국장찌개',400,275,14,14,25),('04018001','두부전골',500,315,16,19,29),('04018002','곱창전골',600,532,26,34,38),('04018003','소고기전골',300,203,16,7,19),('04018004','국수전골',400,643,66,22,45),('04019001','돼지고기김치찌개',400,246,9,18,15),('04019002','버섯찌개',400,171,15,7,16),('04019003','참치김치찌개',400,193,13,10,16),('04019004','순두부찌개',400,198,8,14,14),('04019005','콩비지찌개',400,248,24,12,15),('04019006','햄김치찌개',300,190,15,10,11),('04019007','호박찌개',300,98,12,2,7),('04019008','고추장찌개',500,263,20,12,25),('05011001','대구찜',500,372,26,8,54),('05011002','도미찜',100,126,0,3,21),('05011004','문어숙회',80,67,0,0,14),('05011008','아귀찜',400,310,17,6,48),('05011010','조기찜',100,185,1,9,22),('05011011','참꼬막',80,89,4,2,12),('05011012','해물찜',500,397,36,8,50),('05012001','소갈비찜',250,500,11,29,42),('05012002','돼지갈비찜',170,249,8,14,20),('05012003','돼지고기수육',300,1218,8,99,61),('05012004','찜닭',1500,1358,140,36,114),('05012005','족발',150,381,32,16,26),('05013001','달걀찜',250,190,4,10,16),('06012001','닭갈비',300,562,24,28,52),('06012002','닭꼬치',70,177,12,7,12),('06012003','돼지갈비',100,248,7,14,19),('06012004','떡갈비',250,762,26,51,43),('06012005','불고기',150,386,13,21,32),('06012006','소곱창구이',150,639,6,51,35),('06012007','소양념갈비구이',300,986,27,66,61),('06012008','소불고기',200,174,19,4,14),('06012009','양념왕갈비',150,485,15,33,29),('06012010','햄버거스테이크',200,436,21,28,24),('06012011','훈제오리',250,789,11,64,38),('06012012','치킨데리야끼',340,692,50,32,47),('06012013','치킨윙',100,219,9,14,11),('06013001','더덕구이',100,183,31,5,5),('06013002','양배추구이',100,60,7,2,2),('06013003','두부구이',100,90,1,6,9),('06014001','삼치구이',200,355,8,18,37),('07011001','가자미전',150,220,6,7,29),('07011002','굴전',100,192,13,9,12),('07011003','동태전',150,265,11,16,19),('07011004','해물파전',150,267,27,12,12),('07012001','동그랑땡',150,312,14,18,19),('07012002','햄부침',100,232,9,15,13),('07012003','육전',100,197,6,9,19),('07013001','감자전',200,366,53,13,9),('07013002','고추전',150,261,17,14,13),('07013003','김치전',150,285,32,12,13),('07013004','깻잎전',150,357,16,24,18),('07013005','녹두빈대떡',100,200,18,8,9),('07013006','미나리전',150,215,30,8,6),('07013007','배추전',150,241,32,10,6),('07013008','버섯전',150,239,18,12,11),('07013009','부추전',150,241,32,9,7),('07013010','야채전',100,194,24,8,4),('07013011','파전',150,280,37,12,7),('07013012','호박부침개',100,130,8,9,3),('07013013','호박전',150,215,16,14,6),('07014001','달걀말이',100,172,4,11,12),('07014002','두부부침',100,134,4,8,9),('07014003','두부전',150,253,8,18,18),('08011001','건새우볶음',20,69,4,2,7),('08011002','낙지볶음',200,180,23,3,17),('08011003','멸치볶음',20,69,5,2,6),('08011004','어묵볶음',150,281,36,8,18),('08011005','오징어볶음',200,243,27,6,20),('08011006','오징어채볶음',20,55,7,0,5),('08011007','주꾸미볶음',200,211,21,6,20),('08011008','해물볶음',400,420,36,15,37),('08012001','감자볶음',50,57,8,2,1),('08012002','김치볶음',200,189,21,12,5),('08012003','깻잎나물볶음',200,212,17,16,8),('08012004','느타리버섯볶음',150,133,14,8,4),('08012005','두부김치',250,292,13,21,19),('08012006','머위나물볶음',150,102,7,7,4),('08012007','양송이버섯볶음',150,132,10,9,5),('08012008','표고버섯볶음',150,143,14,7,4),('08012009','고추잡채',200,264,22,12,12),('08012010','호박볶음',50,29,3,2,0),('08013001','돼지고기볶음',200,353,15,20,25),('08013002','돼지껍데기볶음',150,346,22,19,22),('08013003','소세지볶음',200,476,28,33,17),('08013004','순대볶음',400,579,70,25,17),('08013005','오리불고기',250,559,24,34,38),('08013006','오삼불고기',200,356,21,20,23),('08014001','떡볶이',200,300,58,2,8),('08014002','라볶이',200,266,41,9,7),('08014003','마파두부',200,226,10,12,16),('09011001','가자미조림',300,301,20,6,40),('09011002','갈치조림',100,99,5,3,10),('09011003','고등어조림',250,459,10,25,45),('09011004','꽁치조림',150,280,8,16,22),('09011005','동태조림',250,270,16,4,39),('09011006','북어조림',100,184,15,3,23),('09011007','조기조림',300,378,14,16,41),('09011008','코다리조림',100,146,4,5,18),('09012001','달걀장조림',100,133,10,6,8),('09012002','메추리알장조림',100,205,7,13,12),('09013001','돼지고기메추리알장조림',50,62,3,2,7),('09013002','소고기메추리알장조림',50,61,3,2,6),('09014001','고추조림',100,105,14,4,2),('09014002','감자조림',50,39,8,0,1),('09014003','우엉조림',30,68,15,0,1),('09014004','알감자조림',50,56,10,1,1),('09015001','(검은)콩조림',20,56,6,2,3),('09015002','콩조림',20,59,7,1,3),('09015003','두부고추장조림',50,67,4,3,5),('09016001','땅콩조림',20,80,6,5,2),('10011001','미꾸라지튀김',100,382,30,22,12),('10011002','새우튀김',100,311,21,19,11),('10011003','생선가스',200,646,57,37,24),('10011004','쥐포튀김',100,353,37,16,11),('10011005','오징어튀김',100,308,26,16,13),('10012001','닭강정',100,323,24,15,18),('10012002','닭튀김',300,909,45,52,54),('10012003','돈가스',200,620,36,39,27),('10012004','모래집튀김',150,457,31,25,22),('10012005','양념치킨',200,567,38,31,30),('10012006','치즈돈가스',250,758,45,46,36),('10012007','치킨가스',200,582,51,28,31),('10012008','탕수육',200,454,56,16,17),('10012009','깐풍기',200,585,43,33,27),('10014001','감자튀김',150,462,50,25,6),('10014002','고구마맛탕',200,490,90,13,3),('10014003','고구마튀김',100,241,34,10,3),('10014004','고추튀김',100,198,12,13,6),('10014005','김말이튀김',100,240,32,12,2),('10014006','채소튀김',100,311,36,18,3),('11011001','노각무침',150,81,16,2,3),('11011002','단무지무침',50,19,3,0,0),('11011003','달래나물무침',150,132,25,3,4),('11011004','더덕무침',150,220,48,2,4),('11011005','도라지생채',150,165,38,1,4),('11011006','도토리묵',100,43,9,0,0),('11011007','마늘쫑무침',30,38,9,0,0),('11011008','무생채',150,73,16,1,2),('11011009','무말랭이',30,39,9,0,1),('11011010','오이생채',50,23,4,0,0),('11011011','파무침',150,124,19,5,3),('11012001','상추겉절이',200,130,17,6,5),('11012002','쑥갓나물무침',150,94,8,6,5),('11012003','청포묵무침',250,157,19,4,2),('11012004','해파리냉채',150,87,13,1,6),('11013001','가지나물',50,21,3,1,0),('11013002','고사리나물',50,43,3,3,1),('11013003','도라지나물',50,54,5,3,0),('11013004','무나물',50,34,3,2,0),('11013005','미나리나물',50,28,2,2,0),('11013006','숙주나물',50,19,1,1,1),('11013007','시금치나물',50,37,3,2,2),('11013009','취나물',50,72,3,6,1),('11013010','콩나물',50,24,1,1,1),('11013011','고구마줄기나물',50,30,2,2,0),('11013012','우거지나물무침',150,126,10,8,5),('11014001','골뱅이무침',100,107,15,2,7),('11014002','김무침',30,81,12,4,4),('11014003','미역초무침',50,24,5,0,1),('11014004','북어채무침',150,332,31,5,37),('11014005','회무침',300,311,42,4,27),('11014006','쥐치채',20,53,10,0,2),('11014007','파래무침',30,31,5,0,2),('11014008','홍어무침',200,193,24,2,21),('11014009','골뱅이국수무침',230,256,39,7,10),('11014010','오징어무침',200,249,13,4,38),('11015001','잡채',150,198,37,4,2),('11015002','탕평채',100,101,10,3,3),('12011001','갓김치',50,27,5,0,1),('12011002','고들빼기',50,55,11,0,2),('12011003','깍두기',50,17,3,0,0),('12011004','깻잎김치',150,124,23,3,6),('12011005','나박김치',100,14,2,0,0),('12011006','동치미',400,57,14,0,2),('12011007','배추겉절이',50,21,4,0,0),('12011008','배추김치',50,18,4,0,1),('12011009','백김치',50,19,4,0,0),('12011010','부추김치',50,32,6,0,1),('12011011','열무김치',50,16,3,0,1),('12011012','열무얼갈이김치',50,16,3,0,1),('12011013','오이소박이',50,16,2,0,0),('12011014','총각김치',50,17,3,0,1),('12011015','파김치',50,28,5,0,1),('13011001','간장게장',250,292,13,2,32),('13011002','마늘쫑장아찌',50,28,6,0,1),('13011003','고추장아찌',30,22,4,0,0),('13011004','깻잎장아찌',30,33,7,0,2),('13011005','마늘장아찌',30,16,3,0,0),('13011006','무장아찌',30,27,5,0,0),('13011007','양념게장',200,275,46,2,20),('13011008','양파장아찌',50,19,3,0,0),('13011009','오이지',50,11,2,0,1),('13011010','무피클',50,17,4,0,0),('13011011','오이피클',50,54,14,0,0),('13011012','단무지',30,3,0,0,0),('13012001','오징어젓갈',10,6,0,0,1),('13012002','명란젓',10,12,0,0,2),('14011001','생연어',100,110,1,1,20),('14011002','생선물회',800,575,81,14,36),('14011005','훈제연어',100,169,9,6,19),('14012001','육회',150,236,15,8,25),('14012002','육사시미',150,203,6,6,29),('15011001','가래떡',100,205,45,0,3),('15011002','경단',100,303,67,0,6),('15011003','꿀떡',100,225,50,0,3),('15011004','시루떡',100,223,49,0,5),('15011005','메밀전병',100,166,24,5,5),('15011006','찰떡',100,216,44,1,5),('15011007','무지개떡',100,218,48,0,4),('15011008','백설기',100,218,48,0,4),('15011009','송편',100,234,46,2,4),('15011010','수수부꾸미',100,258,46,5,5),('15011011','수수팥떡',100,212,45,0,5),('15011012','쑥떡',100,238,54,0,4),('15011013','약식',100,232,48,2,3),('15011014','인절미',100,214,42,1,6),('15011015','절편',100,197,44,0,3),('15011016','증편',100,198,44,0,2),('15011017','찹쌀떡',100,264,62,0,3),('16011001','매작과',30,121,19,3,2),('16011002','다식',30,105,20,1,3),('16011003','약과',30,113,22,1,2),('16011004','유과',30,129,24,3,0),('16011005','산자',30,121,24,1,0),('16011006','깨강정',30,150,13,9,4);
/*!40000 ALTER TABLE `food_info_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_tb`
--

DROP TABLE IF EXISTS `food_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_tb` (
  `food_cd` int NOT NULL AUTO_INCREMENT,
  `user_cd` bigint NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` tinyint NOT NULL DEFAULT '0' COMMENT '아침: 0\r\n점심: 1\r\n저녁: 2',
  `calory` int NOT NULL DEFAULT '0',
  `protein` int NOT NULL DEFAULT '0',
  `carbo` int NOT NULL DEFAULT '0',
  `fat` int NOT NULL DEFAULT '0',
  `rec_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `img_path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`food_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_tb`
--

LOCK TABLES `food_tb` WRITE;
/*!40000 ALTER TABLE `food_tb` DISABLE KEYS */;
INSERT INTO `food_tb` VALUES (1,1,'치킨',1,500,20,300,500,'2024-02-06 02:06:50',NULL),(2,1,'밥',2,200,40,500,0,'2024-02-06 02:06:50',NULL),(3,1,'과자',3,300,20,100,20,'2024-02-06 02:06:50',NULL);
/*!40000 ALTER TABLE `food_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health_tb`
--

DROP TABLE IF EXISTS `health_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health_tb` (
  `health_cd` int NOT NULL AUTO_INCREMENT,
  `user_cd` bigint NOT NULL,
  `height` float DEFAULT '0',
  `weight` float DEFAULT '0',
  `rec_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`health_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health_tb`
--

LOCK TABLES `health_tb` WRITE;
/*!40000 ALTER TABLE `health_tb` DISABLE KEYS */;
INSERT INTO `health_tb` VALUES (1,1,175,67,'2024-02-01 07:57:15'),(2,2,175,67,'2024-02-01 07:57:21'),(3,3,175,67,'2024-02-01 07:57:26'),(4,4,175,67,'2024-02-01 07:57:30'),(5,5,175,67,'2024-02-01 07:57:34'),(6,6,175,67,'2024-02-01 07:57:38'),(7,7,175,67,'2024-02-01 07:57:43'),(8,8,175,67,'2024-02-01 08:53:57'),(9,3323676782,1234,1234,'2024-02-06 09:00:13'),(10,3300113746,180,77,'2024-02-06 09:26:50'),(11,3324144987,1,1,'2024-02-07 00:52:38'),(12,3331199655,180,180,'2024-02-07 02:47:30');
/*!40000 ALTER TABLE `health_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quest_tb`
--

DROP TABLE IF EXISTS `quest_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quest_tb` (
  `rec_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_cd` bigint NOT NULL,
  `day_chk` tinyint NOT NULL DEFAULT '1',
  `exercise_cnt` tinyint NOT NULL DEFAULT '0',
  `food_cnt` tinyint NOT NULL DEFAULT '0',
  `is_finish` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`rec_dt`,`user_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quest_tb`
--

LOCK TABLES `quest_tb` WRITE;
/*!40000 ALTER TABLE `quest_tb` DISABLE KEYS */;
INSERT INTO `quest_tb` VALUES ('2024-02-01 07:50:09',1,1,1,1,0),('2024-02-01 07:50:27',2,1,3,3,1),('2024-02-01 07:50:31',3,1,3,3,1),('2024-02-01 07:50:35',4,1,3,3,1),('2024-02-01 07:50:49',6,1,1,2,0),('2024-02-01 07:50:53',7,1,1,2,0),('2024-02-02 02:00:08',5,1,0,0,0),('2024-02-02 02:00:21',6,1,0,0,0),('2024-02-02 02:01:26',7,1,0,0,0),('2024-02-06 09:00:16',3323676782,1,0,0,0),('2024-02-06 09:26:52',3300113746,1,0,0,0),('2024-02-07 00:52:41',3324144987,1,0,0,0),('2024-02-07 02:15:29',3300113746,1,0,0,0),('2024-02-07 02:47:34',3331199655,1,0,0,0),('2024-02-07 08:26:39',3323676782,1,0,0,0);
/*!40000 ALTER TABLE `quest_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `ranking_vw`
--

DROP TABLE IF EXISTS `ranking_vw`;
/*!50001 DROP VIEW IF EXISTS `ranking_vw`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ranking_vw` AS SELECT
 1 AS `rank`,
 1 AS `user_cd`,
 1 AS `nickname`,
 1 AS `growth_exp`,
 1 AS `stack_exp`,
 1 AS `img_path`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_tb`
--

DROP TABLE IF EXISTS `user_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tb` (
  `user_cd` bigint NOT NULL,
  `avatar_cd` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'PK1',
  `nickname` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sex` char(1) DEFAULT 'M',
  `join_dt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `goal_weight` float DEFAULT '0',
  `goal_calory` int DEFAULT '0',
  `goal_carbo` int DEFAULT '0',
  `goal_protein` int DEFAULT '0',
  `goal_fat` int DEFAULT '0',
  `growth_exp` int DEFAULT '0',
  `stack_exp` int DEFAULT '0',
  `introduction` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_cd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tb`
--

LOCK TABLES `user_tb` WRITE;
/*!40000 ALTER TABLE `user_tb` DISABLE KEYS */;
INSERT INTO `user_tb` VALUES (1,'PK3','우주신 찬영','M','2024-01-31 15:00:00',75,1800,130,120,40,350,1000,'\'저는 우주신 찬영입니다.\''),(2,'PK1','초사이언2찬영','M','2024-02-01 15:00:00',58.5,1400,150,100,50,350,1000,'저는 초사이언2 찬영입니다.'),(3,'PK2','최대 해방 찬영','M','2024-02-02 15:00:00',58.5,1400,150,100,50,350,1000,'저는 최대 해방 찬영입니다.'),(4,'PK2','무의식의 극의 찬영','M','2024-02-03 15:00:00',58.5,1400,150,100,50,350,1000,'저는 무의식의 극의 찬영입니다.'),(5,'PK3','육도 선인 모드 찬영','M','2024-02-04 15:00:00',58.5,1400,150,100,50,350,1000,'저는 육도 선인 모드 찬영입니다.'),(6,'PK1','시조의 거인 찬영','M','2024-02-01 07:43:28',58.5,1400,150,100,50,350,1000,'저는 시조의 거인 찬영입니다.'),(7,'PK4','완전체 스사노오 찬영','M','2024-02-01 07:48:35',58.5,1400,150,100,50,350,1000,'저는 완전체 스사노오 찬영입니다.'),(8,'PK4','실험체 찬영','M','2024-02-01 08:53:39',58.5,1400,150,100,50,450,2000,'저는 실험체 찬영입니다.'),(3300113746,'PK1','싸탈','M','2024-02-06 09:26:50',70,1930,241,145,43,4,0,NULL),(3323676782,'PK1','asdf','M','2024-02-06 09:00:13',123,1930,241,145,43,4,0,NULL),(3324144987,'PK1','테스트','M','2024-02-07 00:52:38',1,1930,241,145,43,2,0,NULL),(3331199655,'PK1','im','M','2024-02-07 02:47:30',180,1931,193,193,43,2,0,NULL);
/*!40000 ALTER TABLE `user_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'fattle'
--

--
-- Final view structure for view `ranking_vw`
--

/*!50001 DROP VIEW IF EXISTS `ranking_vw`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `ranking_vw` AS select rank() OVER (ORDER BY (`user_tb`.`growth_exp` + `user_tb`.`stack_exp`) desc )  AS `rank`,`user_tb`.`user_cd` AS `user_cd`,`user_tb`.`nickname` AS `nickname`,`user_tb`.`growth_exp` AS `growth_exp`,`user_tb`.`stack_exp` AS `stack_exp`,`avatar_tb`.`img_path` AS `img_path` from (`user_tb` join `avatar_tb` on((`user_tb`.`avatar_cd` = `avatar_tb`.`avatar_cd`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-07 17:47:01
