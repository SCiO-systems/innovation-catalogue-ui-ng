FROM node:14.18.0 as build

WORKDIR /app

COPY .npmrc ./
COPY .env ./
COPY package*.json ./

RUN npm ci --production

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
