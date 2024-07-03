# Weather Anomaly Viewer

Frontend for visualizing weather anomaly data.

## Documentation

- [Functionality](docs/functionality.md)
- [Installation](docs/installation.md)
- [Configuration](docs/configuration.md)
- [Production](docs/production.md)
- [User documentation](docs/user-doc.md)
- [Development notes](docs/dev-notes.md)

## Releasing

To create a release version:

1. Increment `version` in `package.json`
2. Summarize the changes from the last version in `NEWS.md`
3. Commit these changes, then tag the release:

```bash
git add package.json NEWS.md
git commit -m"Bump to version x.x.x"
git tag -a -m"x.x.x" x.x.x
git push --follow-tags
```
