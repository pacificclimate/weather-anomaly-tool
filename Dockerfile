FROM node:latest

MAINTAINER Rod Glover <rglover@uvic.ca>

ADD . /app
WORKDIR /app

RUN npm install --quiet

EXPOSE 3000

CMD npm start
