#
# Docker NodeJS Typescript Starter
# Example Dockerfile
#
FROM node:10.15-alpine AS build

# Intall missing dependencies
RUN apk add --update \
  bash \
  python \
  python-dev \
  build-base

# Create App dir
RUN mkdir -p /app

# Set working directory to App dir
WORKDIR /app

# Copy project files
COPY . .

# Create environment file
RUN cp .env.example .env

# Install dependencies
RUN yarn install

CMD [ "/app/scripts/run.sh" ]
