#! /bin/sh

docker build -f Dockerfile.build -t zenika/agora-front-build .
docker run --rm -v $PWD/dist:/dist zenika/agora-front-build
docker build -t zenika/agora-front .
