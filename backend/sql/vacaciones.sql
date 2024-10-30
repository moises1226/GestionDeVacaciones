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
    usuario_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(15) NOT NULL UNIQUE,
    gmail VARCHAR(100) NOT NULL UNIQUE,
    fecha_inicio DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) 
);

CREATE TABLE Administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    gmail VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(50) NOT NULL
);

DELIMITER //

CREATE PROCEDURE insertar_usuario(
    IN nombre_usuario VARCHAR(50),
    IN gmail_usuario VARCHAR(100),
    IN contraseña_usuario VARCHAR(255)
)
BEGIN
    INSERT INTO Usuario (nombre, gmail, contrasenia)
    VALUES (nombre_usuario, gmail_usuario, contraseña_usuario);
END //

CREATE PROCEDURE insertar_formulario(
    IN id_usuario INT,
    IN nombre_formulario VARCHAR(50),
    IN apellido_formulario VARCHAR(50),
    IN dni_formulario VARCHAR(15),
    IN gmail_formulario VARCHAR(100),
    IN fecha_inicio_formulario DATE
)
BEGIN
    IF DAYOFWEEK(fecha_inicio_formulario) IN (1, 2) THEN
        INSERT INTO Formulario (usuario_id, nombre, apellido, dni, gmail, fecha_inicio)
        VALUES (id_usuario, nombre_formulario, apellido_formulario, dni_formulario, gmail_formulario, fecha_inicio_formulario);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La fecha de inicio solo puede ser domingo o lunes.';
    END IF;
END //

CREATE PROCEDURE insertar_administrador(
    IN nombre_admin VARCHAR(50),
    IN gmail_admin VARCHAR(100),
    IN contraseña_admin VARCHAR(255)
)
BEGIN
    INSERT INTO Administrador (nombre, gmail, contraseña)
    VALUES (nombre_admin, gmail_admin, contraseña_admin);
END //

DELIMITER ;
