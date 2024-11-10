CREATE DATABASE vacaciones;
USE vacaciones;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) not null,
    gmail VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    antiguedad INT NOT NULL,
    permisos varchar(50) NOT NULL
);

CREATE TABLE Formulario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni INT NOT NULL UNIQUE,
    gmail VARCHAR(100) NOT NULL UNIQUE,
    fecha_inicio DATE NOT NULL

);

CREATE TABLE Administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    gmail VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(50) NOT NULL,
    permisos varchar(50) NOT NULL

);

CREATE TABLE Sesion (
  session_id VARCHAR(255) NOT NULL PRIMARY KEY,
  expires DATETIME NOT NULL,
  data TEXT NOT NULL
);
