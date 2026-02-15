import angular from 'angular';
import './module';
import { Logger, FNS, LEVELS } from './logger';

angular.module('nemLogging').provider('nemDebug', function nemDebugProvider() {
  this.debug = null;

  this.$get = function () {
    return null;
  };
});

angular.module('nemLogging').provider('nemSimpleLogger', [
  'nemDebugProvider',
  function nemSimpleLoggerProvider() {
    this.decorator = [
      '$log',
      function ($delegate) {
        const log = new Logger($delegate);
        log.currentLevel = LEVELS.debug;
        return log;
      },
    ];

    this.$get = [
      '$log',
      function ($log) {
        return new Logger($log);
      },
    ];
  },
]);

export { Logger, LEVELS, FNS };
export default 'nemLogging';
