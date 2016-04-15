#! /bin/sh

docker build -f Dockerfile.build -t zenika/liquid-democracy-build .
docker run --rm -v $PWD/dist:/dist zenika/liquid-democracy-build
docker build -t zenika/liquid-democracy .
