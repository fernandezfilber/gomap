# Etapa 1: Construcción
FROM node:22-alpine AS build
WORKDIR /app

# Traemos la URL del backend desde Render
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# --- LAS RUTAS DEBEN EMPEZAR CON frontend/ ---
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ . 

# Generamos los archivos (Vite usará la URL real aquí)
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]