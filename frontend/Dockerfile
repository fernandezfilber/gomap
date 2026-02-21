# Etapa 1: Construcción (Build)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Generamos los archivos listos para producción
RUN npm run build

# Etapa 2: Servidor de producción (Nginx)
FROM nginx:stable-alpine
# Copiamos los archivos construidos a la carpeta que sirve Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Exponemos el puerto estándar de la web
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]