FROM node:18-alpine

# Instalamos openssl necesario para Prisma en Alpine
RUN apk add --no-cache openssl

WORKDIR /usr/src/app

# Solo copiamos los archivos de configuración primero para optimizar el caché
COPY package*.json ./
COPY prisma ./prisma/

# Instalamos dependencias (Esto genera node_modules nativos de Linux)
RUN npm install

# RECIÉN AQUÍ copiamos el resto de los archivos del código fuente
COPY . .

# --- SOLUCIÓN AL ERROR DE PRISMA ---
# Seteamos una variable temporal solo para que el build no falle.
# En ejecución, se usará la del panel de Hostinger.
ENV DATABASE_URL="mysql://root:root@localhost:3306/db"

# Generamos el cliente de Prisma
RUN npx prisma generate

# Exponemos el puerto del servidor
EXPOSE 5000

# Comando para arrancar la aplicación
CMD ["npm", "start"]





