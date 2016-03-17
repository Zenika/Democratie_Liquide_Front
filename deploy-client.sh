#! /bin/sh

docker build -f Dockerfile.build -t zenika/liquid-democracy-build .
docker run --rm -v $PWD/dist:/dist zenika/liquid-democracy-build
docker build -t zenika/liquid-democracy .
docker rm -f liquid-democracy-front
docker run -d --name liquid-democracy-front --link liquiddemocracyapi_liquidDemocracyApi_1:api -p 80:80 zenika/liquid-democracy
