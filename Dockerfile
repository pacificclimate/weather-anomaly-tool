FROM node:latest

MAINTAINER Rod Glover <rglover@uvic.ca>

ADD . /app
WORKDIR /app

RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
RUN npm install --quiet

EXPOSE 3000

CMD npm start
