# Usamos una versión ligera de Node.js
FROM node:18-alpine

# Creamos el directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Generamos el cliente de Prisma
RUN npx prisma generate

# Exponemos el puerto del servidor
EXPOSE 5000

# Comando para iniciar en modo desarrollo
CMD ["npm", "run", "dev"]