#! /bin/sh

docker build -f Dockerfile.build -t zenika/liquid-democracy-build .
docker run --rm -v $PWD/build:/dist zenika/liquid-democracy-build
docker build -t zenika/liquid-democracy .
docker rm -f liquid-democracy-front
docker run -d --name liquid-democracy-front -p 80:80 zenika/liquid-democracy
