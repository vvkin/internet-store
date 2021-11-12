#!/bin/sh

directory="$(dirname $0)"

docker-compose -f "$directory/docker-compose.yml" --env --project-directory "$directory/.." down
docker-compose -f "$directory/docker-compose.yml" --env --project-directory "$directory/.." up
