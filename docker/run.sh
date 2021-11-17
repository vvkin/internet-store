#!/bin/bash

directory=$(dirname "$0")
services=("main" "first" "second")
docker_env=""

for service in "${services[@]}"; do
  env_file="$directory/../$service/.env"
  prefix=${service^^}

  while read -r line; do
    if [[ (! $line =~ ^#.*) && (-n "$line") ]]; then
      docker_env+="${prefix}_${line}\n"
    fi
  done < "$env_file"

done

cat db.env > .env
echo -e "$docker_env" >> .env

docker-compose up
docker-compose down
