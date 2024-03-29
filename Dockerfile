### Fase 1
FROM node:lts-bullseye as build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

### Fase 2
FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app/
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]