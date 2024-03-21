# This is for testing purposes, your ports may vary - best to deploy the dockerfile.
docker run -v wwiv:/srv/wwiv -p 7777:2323 --name wwivd -d dockerimagewwiv:latest