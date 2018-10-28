FROM node:10.9.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install

ENTRYPOINT sh startup.sh
