FROM node:14-alpine

ENV TZ=America/Bogota

RUN mkdir -p /user/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

ADD . .

COPY /src ./src

EXPOSE 8080

CMD [ "yarn", "start" ]
