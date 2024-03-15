docker save -o twc.tar twc:latest
sftp -oBatchMode=no aws <<EOF
cd deploy
put *
bye
EOF
ssh aws <<EOF
cd deploy
docker load -i twc.tar
docker container rm $(docker ps -a -q) -f
docker run --rm -d -p 80:80 -p 443:443 twc:latest
EOF