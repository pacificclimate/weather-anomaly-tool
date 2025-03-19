# Configuration

Most configuration of the Climate Anomaly Viewer frontend is done via a YAML
file, `public/config.yaml`. For details, see below.

For technical reasons, a few configuration parameters must be supplied via
environment variables.

## `public/config.yaml`

This [file](../public/config.yaml) is largely self-documenting, via comments and naming.


## Environment variables (Build Time)

CRA also provides a convenient system for setting default values of  
environment variables in various contexts (development, production, etc.).

Brief summary:

- `.env`: Global default settings
- `.env.development`: Development-specific settings (`npm start`)
- `.env.production`: Production-specific settings (`npm run build`)

In a Create React App app, [environment variables are managed carefully](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables).
Therefore, most of the environment variables below begin with
`REACT_APP_`, as required by CRA.

For more details, see the
[CRA documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)).

`REACT_APP_VERSION`

- Version of the app.
- This value should be set using `generate-commitish.sh` when the Docker image
  is built (see below).
- It is _not_ recommended to manually override the automatically generated
  value when the image is run.
- No default value for this variable is provided in any `.env` file.

`NODE_ENV`

- [**Automatically set; cannot be overridden manually.**](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)

## Configuration via `public/config.js`

This file must be a key-value map. It overrides the default configuration
values, which are given below. Certain keys do not have default values and
_must_ be specified in `public/config.js` during development. This file
contains general defaults for getting started.

Configuration values in `config.js`:

`PUBLIC_URL`

- Base URL for for Climate Anomaly Tool frontend app.
- For production, set this to the URL for Climate Anomaly Tool configured in our proxy
  server.

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
