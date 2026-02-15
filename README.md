# angular-simple-logger

[![Tests](https://github.com/brickhouse-tech/angular-simple-logger/actions/workflows/tests.yml/badge.svg)](https://github.com/brickhouse-tech/angular-simple-logger/actions/workflows/tests.yml)
[![npm](https://img.shields.io/npm/v/angular-simple-logger.svg)](https://www.npmjs.com/package/angular-simple-logger)
[![npm](https://img.shields.io/npm/dm/angular-simple-logger.svg)](https://www.npmjs.com/package/angular-simple-logger)

A simple logger for AngularJS 1.x with configurable log levels and optional [debug](https://github.com/visionmedia/debug) integration.

## Why does this still exist?

Good question. AngularJS hit end-of-life in 2022 and yet this package still pulls **~7,000 downloads per week** (365k+ per year). That's because the real world doesn't care about deprecation notices — enterprise apps built on AngularJS are still running in production, and they still need their dependencies maintained.

This library is a dependency of [angular-google-maps](https://www.npmjs.com/package/angular-google-maps) and other AngularJS packages that are, for better or worse, still in active use. As long as people are downloading it, we'll keep the lights on: modern builds, working CI, and security patches.

### What about Angular 2+?

No plans. Modern Angular (2+) doesn't need this — you can use [debug-fabulous](https://github.com/brickhouse-tech/debug-fabulous) directly via ES6 imports, or any other logging library. The AngularJS module wrapper (`nemLogging`) only makes sense in the AngularJS DI world. If you've migrated to modern Angular, you've already outgrown this package. Congratulations. 🎓

## Installation

```bash
npm install angular-simple-logger
```

### Light version (no `debug` dependency)

If you don't need the `debug` module integration:

```js
import 'angular-simple-logger/light';
// or
require('angular-simple-logger/light');
```

## Usage

### As a module dependency

```js
import angular from 'angular';
import 'angular-simple-logger';

angular.module('myApp', ['nemLogging']);
```

### Basic logging

```js
angular.module('myApp').controller('MyCtrl', ['nemSimpleLogger', function(nemSimpleLogger) {
  // Default level is 'error' — only error and log will output
  nemSimpleLogger.error('This will show');
  nemSimpleLogger.debug('This will NOT show');

  // Enable all levels
  nemSimpleLogger.currentLevel = nemSimpleLogger.LEVELS.debug;
  nemSimpleLogger.debug('Now this shows!');
}]);
```

### Log levels

Levels are ordered: `debug` (0) < `info` (1) < `warn` (2) < `error` (3) < `log` (4).

Setting `currentLevel` to a value means that level and all higher levels will output.

```js
nemSimpleLogger.currentLevel = nemSimpleLogger.LEVELS.warn;
// warn, error, and log will output. debug and info will not.
```

### Disable all logging

```js
nemSimpleLogger.doLog = false;
```

### Spawn independent loggers

```js
// From an existing logger object
const childLogger = nemSimpleLogger.spawn();
childLogger.currentLevel = childLogger.LEVELS.debug; // independent level

// With debug namespace (full version only)
const dbgLogger = nemSimpleLogger.spawn('myApp:worker');
dbgLogger.debug('colored debug output via visionmedia/debug');
```

### Decorate `$log`

```js
angular.module('myApp').config(function($provide, nemSimpleLoggerProvider) {
  $provide.decorator(...nemSimpleLoggerProvider.decorator);
});

// Now $log has level filtering:
angular.module('myApp').run(function($log) {
  $log.debug('works with levels!');
});
```

### Enable debug namespaces

```js
angular.module('myApp').config(function(nemDebugProvider) {
  nemDebugProvider.debug.enable('myApp:*');
});
```

## API

### `nemSimpleLogger`

| Property/Method | Description |
|---|---|
| `debug(...)` | Log at debug level |
| `info(...)` | Log at info level |
| `warn(...)` | Log at warn level |
| `error(...)` | Log at error level |
| `log(...)` | Log at log level |
| `currentLevel` | Current minimum log level (default: `LEVELS.error`) |
| `doLog` | Boolean to enable/disable all logging (default: `true`) |
| `LEVELS` | Object with level constants: `{ debug: 0, info: 1, warn: 2, error: 3, log: 4 }` |
| `spawn([logger\|namespace])` | Create a child logger. Pass a string for debug namespace (full version). |

### `nemDebug` (full version only)

The `debug` module, available as both a service and provider.

## Migrating from 0.1.x

- Source converted from CoffeeScript to ES6
- Build system changed from Gulp to Rollup
- Now provides UMD + ESM bundles
- `debug` upgraded to v4
- Public API is unchanged

## Sponsor

If you find this useful, consider [sponsoring @nmccready](https://github.com/sponsors/nmccready).

## License

MIT
