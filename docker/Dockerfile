FROM node:8.8.1-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i --registry=https://registry.npm.taobao.org

COPY . .

RUN npm run build

FROM nginx:1.10.1-alpine

COPY --from=build /app/build /tianrang

# nginx conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/conf.d/* /etc/nginx/sites-enabled/*
COPY docker/site.conf /etc/nginx/conf.d/

WORKDIR /tianrang

# #是作为 sed 的分隔符，避免 / 需要转义
CMD ["sh", "-c", "([ -z \"$SERVICE_URL\" ] && echo \"SERVICE_URL environment not exist\" || sed -i \"s#var SERVICE_URL =.*;#var SERVICE_URL = '$SERVICE_URL';#g\" index.html) && ([ -z \"$DATA_URL\" ] && echo \"DATA_URL environment not exist\" || sed -i \"s#var DATA_URL =.*;#var DATA_URL = '$DATA_URL';#g\" index.html) && nginx -g \"daemon off;\"" ]