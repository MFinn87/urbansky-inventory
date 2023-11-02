#!/bin/bash

echo "Starting up..."

if [ "$SHOULD_RUN_DATABASE_MIGRATE" = "true" ]; then
  echo "Running database migrations..."
  yarn migrate
fi

if [ "$SHOULD_RUN_DATABASE_SEED" = "true" ]; then
  echo "Running database seeds..."
  yarn seed
fi


if [ "$NODE_ENV" = "debug" ]; then
  echo "Running in debug mode..."
  yarn start:debug
fi

if [ "$NODE_ENV" = "local" ]; then
  echo "Running in local mode..."
  yarn start:local
fi

if [ "$NODE_ENV" = "dev" ]; then
  echo "Running in dev mode..."
  yarn start
fi

if [ "$NODE_ENV" = "stg" ]; then
  echo "Running in stg mode..."
  yarn start
fi

if [ "$NODE_ENV" = "prod" ]; then
  echo "Running in prod mode..."
  yarn start
fi
