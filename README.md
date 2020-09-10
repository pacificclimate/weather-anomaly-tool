# Weather Anomaly Tool

Visualization tool for weather anomaly data

## Configuration

Wx Files is configured using  
environment variables (for basic configuration such as backend URLs).

### Environment variables

In a Create React App app, [environment variables are managed carefully](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables).
Therefore, most of the environment variables below begin with `REACT_APP_`, as required by CRA.

CRA also provides a convenient system for setting default values of environment variables
in various contexts (development, production, etc.).

Brief summary:

* `.env`: Global default settings
* `.env.development`: Development-specific settings (`npm start`)
* `.env.production`: Production-specific settings (`npm run build`)

For more details, see the
[CRA documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)).

Environment variables for configuring the app are:

`PUBLIC_URL`
* Base URL for for Weather Anomaly Tool frontend app.
* For production, set this to the URL for Weather Anomaly Tool configured in 
our proxy server.

`REACT_APP_VERSION`
* Version of the app.
* This value should be set using `generate-commitish.sh` when the Docker image 
is built (see below).
* It is _not_ recommended to manually override the automatically generated 
value when the image is run.
* No default value for this variable is provided in any `.env` file.

`REACT_APP_TILECACHE_URL`
* Tilecache URL for basemap layers.

`NODE_ENV`
* [**Automatically set; cannot be overridden manually.**](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)

## Docker

We use Docker for dev/staging/test and production deployments.

### Manual processes

In general, PCIC DevOps automates Docker image building in our repositories,
and PCIC IT manages production deployment (using `docker-compose`).  
However, it can be useful to manually build and run a production Docker image.

### Build docker image

```bash
docker build -t weather-anomaly-tool \
    --build-arg REACT_APP_VERSION="$(./generate-commitish.sh)" .
```

**IMPORTANT**: Setting the build arg `REACT_APP_VERSION` as above is the most reliable
way to inject an accurate version id into the final app. This value can be overridden
when the image is run (by specifying the environment variable of the same name),
but it is not recommended, as it invites error.

### Run docker image

As described above, environment variables configure the app.
All are given default development and production values in the files
`.env`, `.env.development`, and `.env.production`.

These can be overridden at run time by providing them in the `docker run` 
command (`-e` option), or, equivalently, in the appropriate 
`docker-compose.yaml` element.

Typical run:

```bash
docker run --restart=unless-stopped -d \
  -p <external port>:8080 \
  --name weather-anomaly-tool \
  weather-anomaly-tool:<tag>
```

## [Project initialization](docs/Project-initialization.md)

## Problems enountered

This documents for posterity the problems encountered by a relative 
React and Docker noob in getting this working.

### Resource limitations when running React dev server

Initial attempt at Dockerizing this app cribbed directly from climate-explorer-frontend, which runs a React dev server
in the Docker container:

```dockerfile
FROM node:latest

MAINTAINER Rod Glover <rglover@uvic.ca>

ADD . /app
WORKDIR /app

# RUN echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
RUN npm install --quiet

EXPOSE 3000

CMD npm start
```

Unfortunately, while it can be run on a dev laptop, that image errors on startup when run on `docker-dev01` 
(and presumably `docker-prod`). The log contains:

```text
> weather-anomaly-tool@0.1.0 start /app
> react-scripts start

Starting the development server...

events.js:193
      throw er; // Unhandled 'error' event
      ^

Error: watch /app/public ENOSPC
    at _errnoException (util.js:1031:13)
    at FSWatcher.start (fs.js:1397:19)
    at Object.fs.watch (fs.js:1423:11)
    at createFsWatchInstance (/app/node_modules/chokidar/lib/nodefs-handler.js:37:15)
    at setFsWatchListener (/app/node_modules/chokidar/lib/nodefs-handler.js:80:15)
    at FSWatcher.NodeFsHandler._watchWithNodeFs (/app/node_modules/chokidar/lib/nodefs-handler.js:228:14)
    at FSWatcher.NodeFsHandler._handleDir (/app/node_modules/chokidar/lib/nodefs-handler.js:407:19)
    at FSWatcher.<anonymous> (/app/node_modules/chokidar/lib/nodefs-handler.js:455:19)
    at FSWatcher.<anonymous> (/app/node_modules/chokidar/lib/nodefs-handler.js:460:16)
    at FSReqWrap.oncomplete (fs.js:167:5)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! weather-anomaly-tool@0.1.0 start: `react-scripts start`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the weather-anomaly-tool@0.1.0 start script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /root/.npm/_logs/2017-11-10T18_45_32_828Z-debug.log
```

This error is caused by the file watcher (which the dev server uses for hot updating). 
It seems likely to be related to these bugs:

* [Watch mode on Linux causes a ENOSPC Node.js error](https://github.com/facebook/jest/issues/3254), 
which contains a fix in the responses, which is really the following.

* [Node.JS Error: ENOSPC](http://stackoverflow.com/a/32600959)

Alternatives for fixing:

* Apply fix above in Dockerfile and continue running dev server
    * Nice idea, but foundered on the (apparent) fact that you 
    [can't run `sysctl` in a Docker image build](https://stackoverflow.com/a/23571422/1858846).
    * Interesting question of why climate-explorer-frontend can run the React dev server in a Docker container; 
    possibly there are fewer files to watch, or a different version of React consumes fewer resources for some reason.

* Create and run a production build in the Dockerfile
    * Basing initial effort on a Medium article, 
    [Dockerizing a React application](https://medium.com/ai2-blog/dockerizing-a-react-application-3563688a2378). 
    * Note: NOT ejecting the application as advised in the article! And if you don't follow their whole recipe,
    you must add the line `RUN npm install` to the Dockerfile.
    * ADD vs COPY in Dockerfile: Use COPY.
        * [From the horse's mouth](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#env)
        * [Dockerfile: ADD vs COPY](https://www.ctl.io/developers/blog/post/dockerfile-add-vs-copy/)
        
**Solution**: Create and run a production build in the Dockerfile
