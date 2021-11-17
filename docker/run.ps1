$directory = (Get-Item .).FullName
$services = "main","first","second"
$docker_env = ""

foreach ($service in $services) {
    $env_file = "$directory/../$service/.env"
    $prefix = $service.ToUpper() + "_"

    foreach ($line in Get-Content $env_file) {
        if (-not $line.StartsWith("#") -and -not [string]::IsNullOrEmpty($line)) {
             $docker_env += $prefix + $line + "`n"
        }
    }
}

write-output $(cat db.env) | out-file -encoding utf8 ".env"
write-output $docker_env | out-file -append -encoding utf8 ".env"

docker-compose down
docker-compose up
