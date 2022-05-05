drop database  if exists bolsonVerde_db; 
create database bolsonVerde_db;
use bolsonVerde_db;


--
-- Table structure for table `roles`
--

drop table if exists `roles`;
create table `roles` (
`id` int(10) unsigned not null auto_increment,
`name`varchar(50) not null,
primary key (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES  
 (1,'comprador'),
 (2,'vendedor'),
 (3,'administrador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `users`
--

drop table if exists `users`; 
create table `users`(
`id` int(10) unsigned not null auto_increment,
`fullName` varchar(50) collate utf8_unicode_ci not null,
`username` varchar(50) collate utf8_unicode_ci not null,
`email` varchar(255) collate utf8_unicode_ci unique not null,
`brithdate` datetime not null,
`adress` varchar(50) collate utf8_unicode_ci not null,
`postalcode` int not null,
`phone` char(15) not null,
`password` varchar(255) not null,
`userfile` varchar(50) not null,
`create_date` timestamp null default null,
`update_date` timestamp null default null,
`role_id` int(10) unsigned not null,
primary key (`id`),
key `users_role_id_foreign` (`role_id`),
constraint `users_role_id_foreign` FOREIGN key (`role_id`) references `roles` (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */; 
INSERT INTO `users` VALUES  
(1, 'Virginia Goss', 'vgoss0', 'vgoss0@paginegialle.it', '2021-10-22', '7 Swallow Drive', '1416', '304-864-5192', '6q8WzAvtyz', 'Sed.jpeg', '2021-10-27', '2022-03-05', 3),
(2, 'Zaneta Leverington', 'zleverington1', 'zleverington1@zdnet.com', '2022-02-03', '4 Shelley Way', '10272', '370-299-8382', 'EWAwob4yqOb', 'AmetCursus.tiff', '2021-04-28', '2022-02-09', 1),
(3, 'Idalia Calender', 'icalender2', 'icalender2@amazon.co.uk', '2021-06-22', '17502 Becker Street', '7', '857-120-3433', 'GVCl8Qm', 'SuspendissePotentiNullam.doc', '2022-02-23', '2022-02-11', 3),
(4, 'Dianemarie Pears', 'dpears3', 'dpears3@github.com', '2022-01-27', '6 Summerview Plaza', '52', '194-493-7198', 'Btz7T8Am', 'EtEros.avi', '2021-08-17', '2021-07-13', 2),
(5, 'Nerti Lambrecht', 'nlambrecht4', 'nlambrecht4@bbc.co.uk', '2022-01-03', '201 Ridge Oak Park', '767', '726-958-1104', 'nQ60hKJ', 'Posuere.mp3', '2021-11-19', '2021-10-14', 3),
(6, 'Gualterio Mulderrig', 'gmulderrig5', 'gmulderrig5@prnewswire.com', '2021-07-25', '5 Maywood Parkway', '5593', '106-445-8421', '2ZogSZz', 'DapibusAugue.png', '2022-03-26', '2021-08-30', 1),
(7, 'Sean Fessby', 'sfessby6', 'sfessby6@nps.gov', '2021-12-22', '21 Moose Street', '682', '490-112-0175', 'G29TJkmp', 'IdNisl.tiff', '2021-12-06', '2022-03-20', 1),
(8, 'Dore Wernher', 'dwernher7', 'dwernher7@1688.com', '2021-09-14', '71 Aberg Junction', '19', '213-955-3078', 'HAWlBVAGdv3O', 'Donec.mp3', '2021-09-06', '2021-08-18', 2),
(9, 'Gloriane Kienzle', 'gkienzle8', 'gkienzle8@blogspot.com', '2022-03-15', '643 Clemons Court', '376', '144-813-9131', 'hFcFmF', 'NullaJusto.ppt', '2022-01-02', '2021-06-01', 1),
(10, 'Mallorie Mandrier', 'mmandrier9', 'mmandrier9@com.com', '2022-02-02', '816 Stoughton Street', '8784', '682-912-1980', '1bVksZ', 'CurabiturAt.doc', '2021-06-30', '2022-01-17', 3),
(11, 'Adolph Gadeaux', 'agadeauxa', 'agadeauxa@spotify.com', '2021-07-30', '29254 Lighthouse Bay Court', '4065', '712-888-9498', 'LE30Otvf1gLH', 'VelNullaEget.ppt', '2022-01-25', '2021-07-24', 1),
(12, 'Jan Wisher', 'jwisherb', 'jwisherb@mozilla.org', '2021-08-24', '0 Magdeline Lane', '53', '973-311-0933', 'B7436nwLsxt', 'PosuereCubilia.mp3', '2021-09-22', '2021-06-29', 1),
(13, 'Hester Birtwistle', 'hbirtwistlec', 'hbirtwistlec@yahoo.com', '2021-07-24', '47 Katie Hill', '90014', '558-701-0026', 'T1z8cB', 'IdLuctusNec.avi', '2021-12-23', '2022-03-21', 1),
(14, 'Michell Solleme', 'msollemed', 'msollemed@printfriendly.com', '2022-02-23', '701 Fallview Terrace', '65', '859-995-0599', '5mRILudo7fY', 'Justo.xls', '2022-03-07', '2021-05-26', 3),
(15, 'Tarrance Flooks', 'tflookse', 'tflookse@mozilla.com', '2021-10-06', '83 Del Sol Road', '437', '268-990-4596', '1s41GN8cmIw7', 'EleifendQuam.doc', '2021-08-15', '2021-09-25', 2),
(16, 'Raven Anan', 'rananf', 'rananf@usa.gov', '2022-04-16', '57 Hintze Road', '34149', '883-228-8656', 'VH1Fl9', 'Sit.avi', '2021-09-04', '2021-08-01', 2),
(17, 'Darb Cardall', 'dcardallg', 'dcardallg@blinklist.com', '2021-10-17', '27218 Springview Center', '597', '498-892-1451', 'V40EnIRyr3n', 'AcEstLacinia.ppt', '2022-04-16', '2022-03-11', 2),
(18, 'Mara Galiford', 'mgalifordh', 'mgalifordh@npr.org', '2022-03-31', '9 Swallow Center', '192', '376-321-1644', 'ruNT9sBz1d', 'TempusSitAmet.ppt', '2021-09-30', '2022-02-16', 2),
(19, 'Elnora Britney', 'ebritneyi', 'ebritneyi@amazon.co.uk', '2022-02-21', '862 Caliangt Terrace', '056', '612-903-3719', '212ec7Iw6Ax', 'Eu.xls', '2021-10-24', '2021-11-06', 2),
(20, 'Olin Mityushin', 'omityushinj', 'omityushinj@sciencedaily.com', '2021-08-11', '060 Evergreen Avenue', '76856', '786-354-9825', 'kgfDiyT', 'ElementumEuInterdum.ppt', '2021-08-14', '2021-12-22', 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expositions`
--

drop table if exists `expositions`;
create table `expositions` (
`id` int(10) unsigned not null auto_increment,
`type`varchar(50) not null,
primary key (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `expositions`
--

LOCK TABLES `expositions` WRITE;
/*!40000 ALTER TABLE `expositions` DISABLE KEYS */;
INSERT INTO `expositions` VALUES  
 (1,'oferta'),
 (2,'premium'),
 (3,'estandar');
/*!40000 ALTER TABLE `expositions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units_mensures`
--

drop table if exists `units_mensures`;
create table `units_mensures` (
`id` int(10) unsigned not null auto_increment,
`type`varchar(50) not null,
primary key (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `units_mensures`
--

LOCK TABLES `units_mensures` WRITE;
/*!40000 ALTER TABLE `units_mensures` DISABLE KEYS */;
INSERT INTO `units_mensures` VALUES  
 (1,'kg'),
 (2,'gr'),
 (3,'unidad'),
 (4,'ramo'),
 (5,'bandeja');
/*!40000 ALTER TABLE `units_mensures` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `categories`
--

drop table if exists `categories`;
create table `categories` (
`id` int(10) unsigned not null auto_increment,
`name`varchar(50) not null,
primary key (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES  
 (1,'frutas'),
 (2,'verduras'),
 (3,'hierbas'),
 (4,'secos');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;




--
-- Table structure for table `products`
--

drop table if exists `products`;
create table `products` (
`id` int(10) unsigned not null auto_increment,
`name`varchar(100) collate utf8_unicode_ci not null,
`create_date` timestamp null default null,
`update_date` timestamp null default null,
`mensure_value` int not null,
`price` decimal(10,2) not null,
`discount` int not null,
`description` text not null,
`image` varchar(50) collate utf8_unicode_ci not null,
`stock` int not null,
`exposition_id` int(10) unsigned not null,
`unit_mensure_id` int(10) unsigned not null,
`category_id` int(10) unsigned not null,
primary key (`id`),
key `products_exposition_id_foreign` (`exposition_id`),
key `products_unit_mensure_id_foreign` (`unit_mensure_id`),
key `products_category_id_foreign` (`category_id`),
constraint `products_exposition_id_foreign` FOREIGN key (`exposition_id`) references `expositions` (`id`),
constraint `products_unit_mensure_id_foreign` FOREIGN key (`unit_mensure_id`) references `units_mensures` (`id`),
constraint `products_category_id_foreign` FOREIGN key (`category_id`) references `categories` (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES  
(1, 'Rum - Coconut, Malibu', '2021-06-23', '2021-04-29', 7, 382.64, 16, 'enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus', 'OdioOdioElementum.tiff', 253, 2, 2, 4),
(2, 'Danishes - Mini Cheese', '2021-11-24', '2021-07-22', 21, 937.76, 9, 'proin eu mi nulla ac enim in tempor turpis nec', 'MorbiAIpsum.mp3', 646, 1, 5, 4),
(3, 'Seedlings - Clamshell', '2022-02-23', '2021-08-21', 7, 198.14, 15, 'quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at', 'ScelerisqueMaurisSit.pdf', 625, 3, 1, 3),
(4, 'Clam Nectar', '2022-01-12', '2021-11-20', 24, 275.16, 49, 'ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at', 'AnteIpsumPrimis.avi', 730, 3, 1, 3),
(5, 'Breadfruit', '2022-04-05', '2022-01-17', 8, 236.93, 45, 'quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a', 'AcConsequat.tiff', 386, 3, 5, 4),
(6, 'Pork - Back, Short Cut, Boneless', '2022-01-09', '2021-08-04', 12, 270.24, 32, 'ut mauris eget massa tempor convallis nulla neque libero convallis', 'SedTristique.avi', 394, 3, 5, 3),
(7, 'Bar - Granola Trail Mix Fruit Nut', '2022-03-23', '2022-03-21', 25, 643.75, 25, 'lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui', 'Ut.mp3', 232, 3, 2, 4),
(8, 'Iced Tea Concentrate', '2021-10-21', '2021-05-15', 27, 981.03, 24, 'vel nulla eget eros elementum pellentesque quisque porta volutpat erat', 'Interdum.ppt', 215, 3, 5, 3),
(9, 'Yogurt - Banana, 175 Gr', '2021-06-13', '2021-12-06', 2, 393.1, 29, 'elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi', 'Ultrices.tiff', 422, 3, 2, 2),
(10, 'Bread Foccacia Whole', '2022-02-27', '2022-03-23', 9, 220.07, 43, 'sit amet eleifend pede libero quis orci nullam molestie nibh in lectus', 'Magna.gif', 201, 2, 4, 3),
(11, 'Glass Clear 8 Oz', '2021-06-26', '2021-11-11', 22, 282.2, 28, 'ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'NuncDonecQuis.mpeg', 743, 2, 2, 2),
(12, 'Oil - Olive, Extra Virgin', '2022-01-17', '2021-09-06', 31, 1.07, 23, 'orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec', 'PellentesqueEget.avi', 626, 1, 2, 3),
(13, 'Beef - Ox Tail, Frozen', '2021-10-30', '2022-02-08', 34, 862.13, 35, 'in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut', 'DolorMorbiVel.ppt', 842, 3, 5, 1),
(14, 'Lamb - Sausage Casings', '2021-11-13', '2021-11-30', 43, 45.51, 3, 'dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est', 'VelAccumsanTellus.xls', 55, 3, 1, 2),
(15, 'Garlic - Primerba, Paste', '2021-06-07', '2021-05-04', 31, 970.5, 48, 'in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices', 'TempusSit.png', 404, 2, 1, 4),
(16, 'Garlic Powder', '2021-06-03', '2021-06-09', 33, 841.8, 35, 'hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec', 'EratId.mov', 742, 2, 1, 1),
(17, 'Bread Base - Toscano', '2022-01-14', '2021-12-05', 37, 194.26, 8, 'eleifend donec ut dolor morbi vel lectus in quam fringilla', 'AnteIpsum.jpeg', 377, 2, 3, 3),
(18, 'Mayonnaise - Individual Pkg', '2022-02-03', '2021-10-17', 38, 33.42, 16, 'id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien', 'OrciLuctus.jpeg', 753, 1, 3, 1),
(19, 'Cranberries - Frozen', '2021-10-10', '2022-03-11', 40, 973.7, 41, 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et', 'AuctorSedTristique.jpeg', 559, 1, 3, 2),
(20, 'Pears - Anjou', '2022-02-08', '2021-11-29', 10, 240.1, 41, 'mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu', 'SemperRutrumNulla.xls', 846, 1, 3, 3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `payments`
--

drop table if exists `payments`;
create table `payments` (
`id` int(10) unsigned not null auto_increment,
`method` varchar(50) not null,
primary key (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES  
 (1,'tarjeta de credito'),
 (2,'tarjeta de débito'),
 (3,'transferencia bancaria'),
 (4,'efectivo');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

drop table if exists `statuss`;
create table `statuss` (
`id` int(10) unsigned not null auto_increment,
`name`varchar(50) not null,
primary key (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `statuss`
--

LOCK TABLES `statuss` WRITE;
/*!40000 ALTER TABLE `statuss` DISABLE KEYS */;
INSERT INTO `statuss` VALUES  
 (1,'pendiente'),
 (2,'confirmada'),
 (3,'cancelada');
/*!40000 ALTER TABLE `statuss` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `carts_orders`
--

drop table if exists `carts_orders`;
create table `carts_orders` (
`id` int(10) unsigned not null auto_increment,
`create_date`timestamp null default null,
`update_date`timestamp null default null,
`cancel_date`timestamp null default null,
`confirm_date`timestamp null default null,
`total` decimal(10,2) not null,
`user_id` int(10) unsigned not null,
`payment_id` int(10) unsigned not null,
`status_id` int(10) unsigned not null,
primary key (`id`),
key `carts_orders_user_id_foreign` (`user_id`),
key `carts_orders_payment_id_foreign` (`payment_id`),
key `carts_orders_status_id_foreign` (`status_id`),
constraint `carts_orders_user_id_foreign` FOREIGN key (`user_id`) references `users` (`id`),
constraint `carts_orders_payment_id_foreign` FOREIGN key (`payment_id`) references `payments` (`id`),
constraint `carts_orders_status_id_foreign` FOREIGN key (`status_id`) references `statuss` (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `carts_orders`
--

LOCK TABLES `carts_orders` WRITE;
/*!40000 ALTER TABLE `carts_orders` DISABLE KEYS */;
INSERT INTO `carts_orders` VALUES  
(1, '2022-03-08', '2021-09-04', '2021-08-13', '2022-02-08', 2944.3, 3, 4, 3),
(2, '2021-05-17', '2021-05-12', '2022-01-09', '2022-02-19', 1371.68, 18, 4, 1),
(3, '2022-02-01', '2021-07-11', '2021-11-27', '2021-09-22', 2316.4, 9, 3, 2),
(4, '2022-04-05', '2021-09-09', '2022-03-02', '2021-07-18', 3947.26, 8, 2, 3),
(5, '2021-05-15', '2021-08-09', '2021-08-11', '2021-10-07', 3570.06, 16, 3, 3),
(6, '2021-10-27', '2021-06-05', '2021-09-20', '2021-12-14', 4731.51, 1, 1, 2),
(7, '2022-01-13', '2021-10-21', '2021-09-17', '2021-08-26', 1674.88, 6, 4, 3),
(8, '2022-02-28', '2022-04-13', '2021-12-25', '2022-03-25', 2907.13, 17, 4, 3),
(9, '2022-01-22', '2021-09-17', '2021-06-28', '2021-09-16', 3915.41, 11, 2, 2),
(10, '2021-10-25', '2022-04-09', '2021-09-21', '2021-05-06', 3782.21, 11, 4, 2),
(11, '2021-07-24', '2021-06-17', '2022-02-17', '2021-11-29', 2573.53, 12, 2, 2),
(12, '2021-05-21', '2021-11-12', '2021-09-16', '2021-09-07', 4228.08, 8, 4, 1),
(13, '2021-10-29', '2021-08-10', '2021-06-14', '2021-04-27', 4968.83, 5, 2, 2),
(14, '2021-05-01', '2022-04-05', '2021-05-11', '2022-03-13', 3897.7, 2, 1, 1),
(15, '2022-02-01', '2022-01-20', '2022-03-21', '2022-01-18', 1191.34, 8, 4, 1),
(16, '2022-04-12', '2022-02-04', '2022-01-25', '2022-03-31', 1174.07, 18, 2, 2),
(17, '2021-05-01', '2021-05-19', '2022-04-18', '2022-02-27', 1824.63, 18, 3, 2),
(18, '2021-06-06', '2021-12-02', '2021-08-22', '2022-01-17', 4042.57, 4, 2, 3),
(19, '2021-10-28', '2021-09-18', '2022-04-19', '2022-02-19', 1954.28, 12, 4, 1),
(20, '2022-03-29', '2021-12-29', '2022-03-18', '2021-05-14', 1363.48, 8, 1, 1);

/*!40000 ALTER TABLE `carts_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

drop table if exists `orders`;
create table `orders` (
`id` int(10) unsigned not null auto_increment,
`create_date`timestamp null default null,
`update_date`timestamp null default null,
`cancel_date`timestamp null default null,
`product_quantity`int not null, 
`total` decimal(10,2) not null,
`cart_order_id` int(10) unsigned not null,
`product_id` int(10) unsigned not null, 
primary key (`id`),
key `orders_cart_order_id_foreign` (`cart_order_id`),
key `orders_product_id_foreign` (`product_id`),
constraint `orders_cart_order_id_foreign` FOREIGN key (`cart_order_id`) references `carts_orders` (`id`),
constraint `orders_product_id_foreign` FOREIGN key (`product_id`) references `products` (`id`) 
)ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES  
 (1, '2022-04-16', '2021-11-23', '2021-06-12', 51, 703.38, 14, 20),
 (2, '2022-01-03', '2022-03-13', '2021-04-23', 1, 455.62, 19, 12),
 (3, '2021-05-15', '2021-11-26', '2021-12-28', 67, 809.97, 14, 3),
 (4, '2021-10-23', '2021-09-13', '2022-04-14', 90, 600.46, 15, 7),
 (5, '2021-11-12', '2021-09-28', '2021-11-08', 8, 844.82, 6, 11),
 (6, '2021-10-20', '2021-05-02', '2022-02-14', 31, 238.14, 2, 9),
 (7, '2021-04-29', '2021-05-16', '2022-04-05', 11, 268.84, 11, 13),
 (8, '2022-04-19', '2021-05-26', '2021-05-09', 93, 945.46, 12, 12),
 (9, '2022-04-06', '2021-10-01', '2021-09-21', 95, 506.99, 11, 4),
 (10, '2021-08-04', '2021-07-03', '2021-12-14', 98, 794.82, 9, 14),
 (11, '2022-03-19', '2022-01-02', '2021-10-13', 11, 52.03, 1, 10),
 (12, '2022-03-17', '2021-06-15', '2021-05-12', 42, 398.87, 13, 5),
 (13, '2021-12-15', '2022-02-19', '2021-05-08', 75, 994.91, 11, 2),
 (14, '2022-03-26', '2021-11-23', '2022-03-13', 82, 152.18, 6, 17),
 (15, '2021-10-16', '2022-03-14', '2021-12-16', 51, 324.18, 18, 5),
 (16, '2021-05-25', '2021-07-09', '2021-06-10', 93, 58.97, 2, 19),
 (17, '2022-01-08', '2021-06-02', '2021-05-22', 73, 708.61, 11, 6),
 (18, '2022-02-14', '2022-01-17', '2021-10-05', 41, 831.15, 19, 7),
 (19, '2022-01-16', '2022-03-11', '2022-02-09', 4, 713.05, 5, 17),
 (20, '2022-03-01', '2021-07-27', '2022-04-02', 82, 84.43, 7, 9);

/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


 