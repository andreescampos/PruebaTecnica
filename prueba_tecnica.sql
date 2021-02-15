/*
 Navicat Premium Data Transfer

 Source Server         : MySQL Ubuntu
 Source Server Type    : MySQL
 Source Server Version : 50173
 Source Host           : localhost:2407
 Source Schema         : prueba_tecnica

 Target Server Type    : MySQL
 Target Server Version : 50173
 File Encoding         : 65001

 Date: 15/02/2021 14:26:56
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for detalle_pedido
-- ----------------------------
DROP TABLE IF EXISTS `detalle_pedido`;
CREATE TABLE `detalle_pedido`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NULL DEFAULT NULL,
  `id_taza` int(11) NULL DEFAULT NULL,
  `cantidad` tinyint(4) NULL DEFAULT NULL,
  `precio` double NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_pedido`(`id_pedido`) USING BTREE,
  INDEX `id_taza`(`id_taza`) USING BTREE,
  CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_taza`) REFERENCES `taza` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of detalle_pedido
-- ----------------------------
INSERT INTO `detalle_pedido` VALUES (1, 28, 1, 1, 14.22);
INSERT INTO `detalle_pedido` VALUES (2, 28, 3, 10, 8.54);
INSERT INTO `detalle_pedido` VALUES (3, 28, 4, 3, 0);
INSERT INTO `detalle_pedido` VALUES (10, 31, 1, 1, 14.22);
INSERT INTO `detalle_pedido` VALUES (11, 31, 3, 9, 8.54);
INSERT INTO `detalle_pedido` VALUES (12, 31, 2, 2, 0);
INSERT INTO `detalle_pedido` VALUES (13, 31, 8, 1, 0);
INSERT INTO `detalle_pedido` VALUES (16, 32, 3, 10, 8.54);
INSERT INTO `detalle_pedido` VALUES (17, 32, 2, 1, 0);
INSERT INTO `detalle_pedido` VALUES (18, 32, 4, 1, 0);
INSERT INTO `detalle_pedido` VALUES (19, 32, 6, 1, 0);
INSERT INTO `detalle_pedido` VALUES (34, 35, 1, 1, 14.22);
INSERT INTO `detalle_pedido` VALUES (35, 35, 2, 2, 13.12);
INSERT INTO `detalle_pedido` VALUES (36, 35, 3, 10, 8.54);
INSERT INTO `detalle_pedido` VALUES (37, 35, 8, 3, 0);
INSERT INTO `detalle_pedido` VALUES (38, 36, 2, 1, 13.12);
INSERT INTO `detalle_pedido` VALUES (39, 36, 3, 10, 8.54);
INSERT INTO `detalle_pedido` VALUES (40, 36, 2, 3, 0);

-- ----------------------------
-- Table structure for historial_inventario
-- ----------------------------
DROP TABLE IF EXISTS `historial_inventario`;
CREATE TABLE `historial_inventario`  (
  `id_taza` int(11) NULL DEFAULT NULL,
  `unidades_ingresadas` int(11) NULL DEFAULT NULL,
  `fecha` date NULL DEFAULT NULL,
  `hora` time NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of historial_inventario
-- ----------------------------
INSERT INTO `historial_inventario` VALUES (2, 40, '2021-02-15', '14:26:33');

-- ----------------------------
-- Table structure for inventario
-- ----------------------------
DROP TABLE IF EXISTS `inventario`;
CREATE TABLE `inventario`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_taza` int(11) NOT NULL,
  `piezas` int(11) NOT NULL,
  `ultima_modificacion` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_taza`(`id_taza`) USING BTREE,
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_taza`) REFERENCES `taza` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of inventario
-- ----------------------------
INSERT INTO `inventario` VALUES (1, 1, 10, '2021-02-14 13:29:24');
INSERT INTO `inventario` VALUES (2, 2, 590, '2021-02-14 13:40:59');
INSERT INTO `inventario` VALUES (3, 3, 30, '2021-02-14 13:42:14');
INSERT INTO `inventario` VALUES (4, 4, 100, '2021-02-14 14:02:43');
INSERT INTO `inventario` VALUES (5, 6, 300, '2021-02-14 21:07:25');
INSERT INTO `inventario` VALUES (6, 7, 200, '2021-02-14 21:07:56');
INSERT INTO `inventario` VALUES (7, 8, 40, '2021-02-14 21:08:34');
INSERT INTO `inventario` VALUES (15, 9, 120, '2021-02-15 09:22:22');

-- ----------------------------
-- Table structure for pedido
-- ----------------------------
DROP TABLE IF EXISTS `pedido`;
CREATE TABLE `pedido`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NULL DEFAULT NULL,
  `hora` time NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id`) REFERENCES `detalle_pedido` (`id_pedido`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pedido
-- ----------------------------
INSERT INTO `pedido` VALUES (28, '2021-02-15', '07:17:31');
INSERT INTO `pedido` VALUES (31, '2021-02-15', '07:35:57');
INSERT INTO `pedido` VALUES (32, '2021-02-15', '07:37:30');
INSERT INTO `pedido` VALUES (35, '2021-02-15', '07:56:31');
INSERT INTO `pedido` VALUES (36, '2021-02-15', '07:58:54');

-- ----------------------------
-- Table structure for taza
-- ----------------------------
DROP TABLE IF EXISTS `taza`;
CREATE TABLE `taza`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` int(11) NOT NULL,
  `color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dimensiones` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `capacidad` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `modelo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `material` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `precio` double NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `modelo`(`modelo`) USING BTREE,
  INDEX `id_tipo`(`id_tipo`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of taza
-- ----------------------------
INSERT INTO `taza` VALUES (1, 1, 'Roja', '145', '500', 'EFTF-2', 'Aluminio', 14.22);
INSERT INTO `taza` VALUES (2, 2, 'Roja', '145', '500', 'FGFT-1', 'Cerámica', 13.12);
INSERT INTO `taza` VALUES (3, 1, 'Azul marino', '160', '500', 'THYU-3', 'Vidrio borosilicatado', 8.54);
INSERT INTO `taza` VALUES (4, 2, 'Verde', '165', '800', 'ERTG-2', 'Plástico', 15);
INSERT INTO `taza` VALUES (6, 2, 'Rosa', '165', '800', 'ERFF-8', 'Cerámica', 16.78);
INSERT INTO `taza` VALUES (7, 2, 'Morada', '120', '400', 'MNBH-7', 'Cerámica', 9.5);
INSERT INTO `taza` VALUES (8, 2, 'Verde', '150', '500', 'AAGY-3', 'Vidrio', 16.24);
INSERT INTO `taza` VALUES (9, 2, 'Café', '180', '350', 'GVBH-2', 'Plástico', 12.33);

-- ----------------------------
-- Table structure for tipo_taza
-- ----------------------------
DROP TABLE IF EXISTS `tipo_taza`;
CREATE TABLE `tipo_taza`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `tipo_taza_ibfk_1` FOREIGN KEY (`id`) REFERENCES `taza` (`id_tipo`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tipo_taza
-- ----------------------------
INSERT INTO `tipo_taza` VALUES (1, 'Calidad alta');
INSERT INTO `tipo_taza` VALUES (2, 'Calidad baja');

SET FOREIGN_KEY_CHECKS = 1;
