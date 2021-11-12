$directory=(Get-Item .).FullName

docker-compose -f "$directory/docker-compose.yml" --project-directory "$directory/.." down
docker-compose -f "$directory/docker-compose.yml" --project-directory "$directory/.." up
