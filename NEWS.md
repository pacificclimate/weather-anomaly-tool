# News / Release Notes

## 2.0.0

*2023-Oct-11*

This release includes several major improvements to the UI:
- Improve appearance of station data markers and location markers.
- Add colour scales (graphic rendition of data-to-colour mapping) for each map.
- Add additional info to station popup; improve its presentation.
- Improve selector layout. App is now truly responsive and has a reasonable layout at all window sizes.
- Use BC Albers Lite basemap tiles. This basemap is in a better projection for our region, and makes the data markers easier to read.

It also includes a major improvement to deployment and configuration, namely that configuration is now done via an external file that allows significant alterations to app appearance and behaviour without changes to the app code.

PRs included:
- [Move hardcoded config into external config file](https://github.com/pacificclimate/weather-anomaly-tool/pull/95)
- [Reorganize code](https://github.com/pacificclimate/weather-anomaly-tool/pull/94)
- [Add info to station popup](https://github.com/pacificclimate/weather-anomaly-tool/pull/91)
- [Add colour scale to Anomaly map](https://github.com/pacificclimate/weather-anomaly-tool/pull/84)
- [Improve selector layout](https://github.com/pacificclimate/weather-anomaly-tool/pull/82)
- [Fix station marker rendering](https://github.com/pacificclimate/weather-anomaly-tool/pull/77)
- [Update to React latest, React Leaflet 3, etc.](https://github.com/pacificclimate/weather-anomaly-tool/pull/76)
- [Use BC Albers Lite basemap tiles](https://github.com/pacificclimate/weather-anomaly-tool/pull/73)
- Some DevOps updates that do not affect behaviour

## 1.0.0

*2020-Sep-10*

This release primarily fixes problems with date selection.
Also includes DevOps improvements.

- [Set default date to latest with data](https://github.com/pacificclimate/weather-anomaly-tool/pull/55)
- [Enable deployment to an arbitrary URI ](https://github.com/pacificclimate/weather-anomaly-tool/pull/59)
- [Add GitHub actions for CI and Docker](https://github.com/pacificclimate/weather-anomaly-tool/pull/57)

## 0.1.0
*2017 - 2018*

Initial release(s).