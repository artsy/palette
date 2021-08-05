### Added package.json resolution for `docz-utils: 0.13.6`.

We are a few major versions behind, and need it for the
`playgroundRehypePlugin`. Current major version doesn't export `jsx`.

### Added package.json resolution for `react-live: 1.12.0`.

Current major version doesn't have a `mountStylesheet` prop, which allowed us
finer grained control over how our code snippets are formatted. Needs
investigation.
