# Usamos una imagen base oficial de Node.js
FROM node:18-slim

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . ./

# Copiar el archivo .env (para las variables de entorno)
COPY .env ./

# Exponer el puerto en el que corre la aplicación
EXPOSE 8000

# Definir el comando para iniciar la aplicación
CMD ["node", "app.js"]
