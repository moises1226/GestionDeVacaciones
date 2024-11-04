CREATE DATABASE vacaciones;
USE vacaciones;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    gmail VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL
    -- antiguedad VARCHAR(50) NOT NULL
);

CREATE TABLE Formulario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(15) NOT NULL UNIQUE,
    gmail VARCHAR(100) NOT NULL UNIQUE,
    fecha_inicio DATE NOT NULL

);

CREATE TABLE Administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    gmail VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(50) NOT NULL

);
