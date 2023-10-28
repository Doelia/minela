#!/bin/bash

export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker login
docker build . -f .cloud/Dockerfile -t doelia/minelia:main
docker push doelia/minelia:main

