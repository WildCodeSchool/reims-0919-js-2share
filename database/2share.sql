CREATE DATABASE toshare;

USE toshare;

DROP TABLE if exists family;
DROP TABLE if exists event;
DROP TABLE if exists user;
DROP TABLE if exists user_family;
DROP TABLE if exists todo;

CREATE TABLE family 
(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
name VARCHAR (100)
);

CREATE TABLE event
(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
date_start TEXT NOT NULL,
date_end TEXT,
family_id INT NOT NULL,
title VARCHAR(45) NOT NULL,
FOREIGN KEY (family_id) REFERENCES family (id)
);

CREATE TABLE user

(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname VARCHAR (30) NOT NULL,
  lastname VARCHAR (30) NOT NULL,
  birthdate DATE NOT NULL,
  email VARCHAR (320) NOT NULL UNIQUE,
  password VARCHAR (256) NOT NULL ,
  phone_number VARCHAR (15),
  profile_picture VARCHAR (255)
);

CREATE TABLE user_family
(
  email VARCHAR (320) NOT NULL,
  family_id INT NOT NULL,
  role VARCHAR (30) NOT NULL,
  FOREIGN KEY (family_id) REFERENCES family (id),
  PRIMARY KEY (email, family_id)
);

CREATE TABLE todo
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  description VARCHAR(50),
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (id),
  family_id INT NOT NULL,
  FOREIGN KEY (family_id) REFERENCES family (id)
);

CREATE TABLE child
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(30) NOT NULL,
  family_id INT NOT NULL,
  FOREIGN KEY (family_id) REFERENCES family(id)
);