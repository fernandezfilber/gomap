# Etapa 1: Construcción (Build)
FROM node:22-alpine AS build
WORKDIR /app

# --- ESTO ES LO QUE FALTA ---
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install
COPY . .

# Ahora sí, Vite usará la URL de Render al construir los archivos
RUN npm run build

# Etapa 2: Servidor de producción (Nginx)
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]