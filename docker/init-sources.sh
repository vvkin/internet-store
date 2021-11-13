#!/bin/sh

# psqlExec command user database password
psqlExec() {
  PGPASSWORD="${4:-$POSTGRES_PASSWORD}" psql\
    --set ON_ERROR_STOP=1\
    --echo-all\
    --username "${2:-$POSTGRES_USER}"\
    --dbname "${3:-$POSTGRES_DB}"\
    --command "$1"
}

# create users and databases
psqlExec "CREATE USER $PG_FIRST_USER WITH PASSWORD '$PG_FIRST_PASSWORD';"
psqlExec "CREATE DATABASE $PG_FIRST_DATABASE;" "$POSTGRES_DB"
psqlExec "GRANT ALL PRIVILEGES ON DATABASE $PG_FIRST_DATABASE TO $PG_FIRST_USER;"
psqlExec "CREATE USER $PG_SECOND_USER WITH PASSWORD '$PG_SECOND_PASSWORD';"
psqlExec "CREATE DATABASE $PG_SECOND_DATABASE;" "$POSTGRES_DB"
psqlExec "GRANT ALL PRIVILEGES ON DATABASE $PG_SECOND_DATABASE TO $PG_SECOND_USER;"

# fill sources
psqlExec "$(cat /seeds/first.sql)" "$PG_FIRST_USER" "$PG_FIRST_DATABASE" "$PG_FIRST_PASSWORD"
psqlExec "$(cat /seeds/second.sql)" "$PG_SECOND_USER" "$PG_SECOND_DATABASE" "$PG_SECOND_PASSWORD"
