# News / Release Notes

## 2.2.0

_2025-Mar-19

Summary:

- Bumping versions primarily of internal packages and how the app starts.
- Significant boost in frontend start up speed.
- Consumers will need to move ENV variables into the new config.js to be mounted in the docker container.

Includes these PRs:
- [Fast startup and code quality updates](https://github.com/pacificclimate/weather-anomaly-tool/pull/113)

## 2.1.0

_2024-Jul-09_

Summary:
- This is mainly an infrastructure improvement release, but the changes result in a more responsive UI, due to local caching by React Query.
- Brings all dependencies to latest versions, specifically moves to React 18, React Leaflet 4, Leaflet 1.9.
- Mediate backend requests with React Query.
- Add version number display and prevent map from crashing at high zoom

Includes these PRs:
 - [Upgrade packages #100](https://github.com/pacificclimate/weather-anomaly-tool/pull/100)
 - [Install and use Prettier #104](https://github.com/pacificclimate/weather-anomaly-tool/pull/104)
 - [Mediate backend requests with React Query #106](https://github.com/pacificclimate/weather-anomaly-tool/pull/106)
 - [Misc fixes #107](https://github.com/pacificclimate/weather-anomaly-tool/pull/nnn/107). Resolves issues:
   - [App crashes when map is zoomed in too far #83](https://github.com/pacificclimate/weather-anomaly-tool/issues/88)
   - [Update and improve README #88](https://github.com/pacificclimate/weather-anomaly-tool/issues/88)
   - [Display version number #87](https://github.com/pacificclimate/weather-anomaly-tool/issues/87)
   - [Clean up errors and warnings #93](https://github.com/pacificclimate/weather-anomaly-tool/issues/93)
 - [Fix markers #110](https://github.com/pacificclimate/weather-anomaly-tool/pull/110)
 - [Stabilize marker layer selection #112](https://github.com/pacificclimate/weather-anomaly-tool/pull/112)

## 2.0.0

_2023-Oct-11_

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

_2020-Sep-10_

This release primarily fixes problems with date selection.
Also includes DevOps improvements.

- [Set default date to latest with data](https://github.com/pacificclimate/weather-anomaly-tool/pull/55)
- [Enable deployment to an arbitrary URI ](https://github.com/pacificclimate/weather-anomaly-tool/pull/59)
- [Add GitHub actions for CI and Docker](https://github.com/pacificclimate/weather-anomaly-tool/pull/57)

## 0.1.0

_2017 - 2018_

Initial release(s).
