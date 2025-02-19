# Installation

## Tooling

Node.js tooling must satisfy the following version requirements:

- `npm` >= 8.1.0 (10+ Reccomended)
- `node` >= 16 (22+ Reccomended)

## Install

With the appropriate versions of `node`/`npm` in use:

```bash
npm install
```

If you need to start fresh after much messing about, the `reinstall` script
deletes `./node_modules/` and then installs:

```bash
npm run reinstall
```

## Notes

### React Leaflet 4.0.0

We are presently using [React Leaflet 4.0.0](https://react-leaflet.js.org/docs/start-introduction/). Note the hard pin to 4.0.0. This is because we have encountered problems with higher 4.x versions, specifically in `pcic-react-leaflet-components`. These may be solved shortly but currently we must pin to 4.0.0.
