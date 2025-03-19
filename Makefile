# These variables are set to make it convenient to run the docker image locally.
tag = $(shell git rev-parse --abbrev-ref HEAD)
# make sure this port matches that configured in the config.js file
port = 30010

image:
	npm run build
	@SDP_TAG=$(tag) SDP_PORT=$(port) docker-compose -f docker/docker-compose.yaml build

up:
	@SDP_TAG=$(tag) SDP_PORT=$(port) docker-compose -f docker/docker-compose.yaml up -d
	@docker logs -f weather-anomaly-tool

down:
	@SDP_TAG=$(tag) SDP_PORT=$(port) docker-compose -f docker/docker-compose.yaml down
