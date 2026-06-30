# Etapa 1: Construcción
FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_PAYPAL_CLIENT_ID
ENV VITE_PAYPAL_CLIENT_ID=$VITE_PAYPAL_CLIENT_ID

# --- VOLVEMOS A LAS RUTAS SIMPLES ---
COPY package*.json ./
RUN npm install
COPY . . 

RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]