# Configuration

Most configuration of the Weather Anomaly Viewer frontend is done via a YAML
file, `public/config.yaml`. For details, see below.

For technical reasons, a few configuration parameters must be supplied via
environment variables.

## `public/config.yaml`

This [file](../public/config.yaml) is largely self-documenting, via comments and naming.

## Environment variables

A small number of configuration parameters must be provided via environment
variables.

In a Create React App app, [environment variables are managed carefully](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables).
Therefore, most of the environment variables below begin with `REACT_APP_`,
as required by CRA.

For development runs of the app launched with `npm start`, the files
`.env` and `.env.development` provide environment variable values.
For more details, see the
[CRA documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables).

For production runs, environment variables are provided by
`docker-compose.yaml`.

### Deployment

`PUBLIC_URL`

- Base URL for Station Data Portal frontend.
- Type: string.
- For production, set this to the URL configured in our proxy server.
- Required.

`REACT_APP_APP_VERSION` (TBD)

- Current version of the app.
- Type: string.
- This value should be set using `generate-commitish.sh` when the Docker image is built.
- It is not recommended to manually override the automatically generated value when the image is run.
- Note doubled `APP_` in name.

`REACT_APP_BASE_MAP`

- String, 'BC' | 'YNWT'
- Selects basemap

`REACT_APP_BC_BASE_MAP_TILES_URL`

- URL template (includes x, y, z) for BC base map tiles.
- Type: string.
- Required if YAML config.baseMap === "BC"

`REACT_APP_YNWT_BASE_MAP_TILES_URL`

- URL template (includes x, y, z) for YNWT base map tiles.
- Type: string.
- Required if YAML config.baseMap === "YNWT"
