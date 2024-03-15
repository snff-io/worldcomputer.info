docker load -i twc.tar
docker stop $(docker ps -a -q)
docker run --rm -d -p 80:80 -p 443:443 twc:latest
