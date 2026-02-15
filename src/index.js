import angular from 'angular';
import Debug from 'debug';
import './module';
import { Logger, FNS, LEVELS } from './logger';

const _debugCache = {};

function wrapDebug(nemDebug, namespace, logObject) {
  if (!_debugCache[namespace]) {
    _debugCache[namespace] = nemDebug(namespace);
  }
  const debugInstance = _debugCache[namespace];
  const newLogger = {};
  for (const val of FNS) {
    newLogger[val] = val === 'debug' ? debugInstance : logObject[val];
  }
  return newLogger;
}

angular.module('nemLogging').provider('nemDebug', function nemDebugProvider() {
  this.debug = Debug;

  this.$get = function () {
    return Debug;
  };
});

angular.module('nemLogging').provider('nemSimpleLogger', [
  'nemDebugProvider',
  function nemSimpleLoggerProvider(nemDebugProvider) {
    const nemDebug = nemDebugProvider.debug;

    this.decorator = [
      '$log',
      function ($delegate) {
        const log = new Logger($delegate);
        log.currentLevel = LEVELS.debug;
        log._wrapDebug = (ns, logObj) => wrapDebug(nemDebug, ns, logObj);
        return log;
      },
    ];

    this.$get = [
      '$log',
      function ($log) {
        const logger = new Logger($log);
        logger._wrapDebug = (ns, logObj) => wrapDebug(nemDebug, ns, logObj);
        return logger;
      },
    ];
  },
]);

export { Logger, LEVELS, FNS };
export default 'nemLogging';
