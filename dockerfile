# Dockerfile
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY public/ /public/

EXPOSE 80
EXPOSE 443
EXPOSE 8080