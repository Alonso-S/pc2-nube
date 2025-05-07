# Etapa 1: Base de Node.js para ejecutar Vite
FROM node:18 AS build


# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json (o yarn.lock si usas Yarn)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código de tu proyecto
COPY . .

# Exponemos el puerto 4000 para que sea accesible desde fuera del contenedor
EXPOSE 4000

# Comando para correr Vite en modo desarrollo
CMD ["npm", "run", "dev"]