# require# require

A simple, synchronous `require` implementation for JavaScript environments that don't natively support CommonJS modules, such as some web workers or custom scripting environments.

## Features

- **Synchronous Loading**: Implements a synchronous `require` function.
- **Worker Support**: Designed to work in environments where `XMLHttpRequest` or `UrlFetchApp` is available.
- **Caching**: Caches loaded modules to ensure they are only fetched once.
- **Remote Module Fetching**: Fetches modules from a specified remote endpoint (`commonjs.jsx-bet.workers.dev`).

## Usage

```javascript
// The require function is automatically added to the global scope
const myModule = require('some-module');
```

## Implementation Details

The core logic is in `require.js`. It attempts to fetch the module source code synchronously using `XMLHttpRequest` (in browser/worker environments) or `UrlFetchApp` (in Google Apps Script environments). Once fetched, it wraps the source in a function to provide the `exports` and `module` objects, then executes it and returns the exported content.
