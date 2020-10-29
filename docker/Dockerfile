#-- stage build --#
FROM node:10.18-alpine3.10 AS build

ENV GIT_SSL_NO_VERIFY=true

# change to cnpm registry
RUN yarn config set registry https://registry.npm.taobao.org/

# install dependences
COPY package.json yarn.lock /source/
RUN cd /source && yarn install

# copy source
COPY ./ /source

# source build
RUN cd /source && yarn build

#-- stage run --#
FROM nginx:1.17.3-alpine

RUN rm -rf /usr/share/nginx/html/*

# nginx conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/conf.d/* /etc/nginx/sites-enabled/*
COPY docker/site.conf /etc/nginx/conf.d/

# copy souce after pack
COPY --from=build /source/build /usr/share/nginx/html

# run nginx
CMD ["nginx", "-g", "daemon off;"]

