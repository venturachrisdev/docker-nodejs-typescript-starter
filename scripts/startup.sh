#!/bin/bash

case $NODE_ENV in
  development)
    echo "Running Example API in development mode."
    cp .env.example .env
    yarn build
    yarn migrate
    yarn seed
    yarn watch-debug
    ;;
  production)
    echo "Running Example API in production mode."
    cp .env.production .env
    yarn build
    yarn migrate
    yarn serve
    ;;
  *)
    echo "Running Example API in staging mode (default)."
    cp .env.staging .env
    yarn build
    yarn migrate
    yarn seed
    yarn serve
    ;;
esac
