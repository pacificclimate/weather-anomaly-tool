# Weather Anomaly Tool

Visualization tool for weather anomaly data

## [Project initialization](docs/Project-initialization.md)

## Deployment

This app is deployed in a Docker container.

TODO: Full instructions for build, push to local Docker repo, 
pull to docker-prod or docker-dev, and run on those servers.

To build a Docker image:

```bash
docker build -t weather-anomaly-tool .
```

To run the Docker image locally (at port 3001):

```bash
docker run -d -p 3001:3000 --name weather-anomaly-tool weather-anomaly-tool
```

Insignificant change to trigger a DockerHub build