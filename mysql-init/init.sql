-- Crear usuario 'usuario' si no existe
CREATE USER IF NOT EXISTS 'usuario'@'%' IDENTIFIED BY 'userpass';

-- Crear la base de datos con codificación adecuada
CREATE DATABASE IF NOT EXISTS pc2_dsn
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Darle todos los permisos sobre la base de datos
GRANT ALL PRIVILEGES ON pc2_dsn.* TO 'usuario'@'%';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Usar la base de datos
USE pc2_dsn;

-- Crear tabla CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    password VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear tabla PRODUCTOS
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    descripcion TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insertar productos iniciales
INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES
('Producto 1', 'Descripción del Producto 1', 10.99, 100),
('Producto 2', 'Descripción del Producto 2', 20.50, 50);
