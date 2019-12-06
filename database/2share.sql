CREATE DATABASE toshare;

USE toshare;

DROP TABLE if exists family;
DROP TABLE if exists calendar;

CREATE TABLE family 
(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR (100)
);

CREATE TABLE event
(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
date_start DATETIME,
date_end DATETIME,
family_id INT NOT NULL,
FOREIGN KEY (family_id) REFERENCES family (id)
);