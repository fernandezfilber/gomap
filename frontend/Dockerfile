# Etapa 1: Construcción (Build)
FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# --- AJUSTE DE RUTAS PARA CONTEXTO RAÍZ ---
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ . 

# Ahora Vite encontrará el package.json y podrá construir
RUN npm run build

# Etapa 2: Servidor de producción (Nginx)
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]