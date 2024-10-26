CREATE DATABASE vacaciones;
USE vacaciones;
CREATE TABLE usuario (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre varchar(30) NOT NULL,
email varchar(50) NOT NULL UNIQUE,
contraseña varchar(50) NOT NULL CHECK (LENGTH(contraseña) > 8),
antiguedad varchar(50) NOT NULL
);

CREATE TABLE formulario (
id INT AUTO_INCREMENT PRIMARY KEY,
usuario_id INT NOT NULL,
nombre VARCHAR(50) NOT NULL,
apellido VARCHAR(50) NOT NULL,
dni VARCHAR(15) NOT NULL UNIQUE,
email varchar(50) NOT NULL UNIQUE,
fecha_inicio DATE NOT NULL,
FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
CHECK (DAYOFWEEK(fecha_inicio) IN (1, 2))
);

CREATE TABLE administrador (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
contraseña VARCHAR(8) NOT NULL CHECK (LENGTH(contraseña) > 8)
);

DELIMITER //
CREATE PROCEDURE insertar_usuario(IN nombre_usuario VARCHAR(50), IN email_usuario VARCHAR(100), IN contraseña_usuario VARCHAR(255))
BEGIN
    INSERT INTO usuarios (nombre, email, contraseña)
    VALUES (nombre_usuario, email_usuario, contraseña_usuario);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertar_formulario(IN id_usuario INT, IN nombre_formulario VARCHAR(50), IN apellido_formulario VARCHAR(50), IN dni_formulario VARCHAR(15), IN fecha_inicio_formulario DATE)
BEGIN
    IF DAYOFWEEK(fecha_inicio_formulario) IN (1, 2) THEN
        INSERT INTO formularios (usuario_id, nombre, apellido, dni, fecha_inicio)
        VALUES (id_usuario, nombre_formulario, apellido_formulario, dni_formulario, fecha_inicio_formulario);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La fecha de inicio solo puede ser domingo o lunes.';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertar_administrador(IN nombre_admin VARCHAR(50), IN email_admin VARCHAR(50), IN contraseña_admin VARCHAR(255))
BEGIN
    INSERT INTO administradores (nombre, email, contraseña)
    VALUES (nombre_admin, email_admin, contraseña_admin);
END //
DELIMITER ;