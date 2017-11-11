FROM node:latest
# Should probably base on a specific version, not :latest

MAINTAINER Rod Glover <rglover@uvic.ca>

COPY . .
# Consider alternative:
# COPY . /app
# WORKDIR /app

# Install the app dependencies
RUN npm install --quiet

# Build production version of app
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Start the node server
CMD serve -s build

EXPOSE 5000
