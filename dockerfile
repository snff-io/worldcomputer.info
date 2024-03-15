# Dockerfile
FROM nginx:latest

RUN apt-get update && apt-get install -y sudo certbot

COPY nginx.conf /etc/nginx/nginx.conf

COPY public/ /public/

RUN mkdir -p /certs/worldcomputer.info
COPY certs/worldcomputer.info/* /certs/worldcomputer.info

EXPOSE 80
EXPOSE 443
EXPOSE 8080