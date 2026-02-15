const FNS = ['debug', 'info', 'warn', 'error', 'log'];

const LEVELS = {};
FNS.forEach((val, key) => {
  LEVELS[val] = key;
});

function maybeExecLevel(level, current, fn) {
  if (level >= current) {
    fn();
  }
}

function isValidLogObject(logObject) {
  if (!logObject) return false;
  for (const val of FNS) {
    if (typeof logObject[val] !== 'function') return false;
  }
  return true;
}

export { FNS, LEVELS, maybeExecLevel, isValidLogObject };

export class Logger {
  constructor($log) {
    if (!$log) throw new Error('internalLogger undefined');
    if (!isValidLogObject($log)) throw new Error('@$log is invalid');

    this.$log = $log;
    this.doLog = true;
    this.LEVELS = LEVELS;
    this.currentLevel = LEVELS.error;

    for (const level of FNS) {
      this[level] = (...args) => {
        if (this.doLog) {
          maybeExecLevel(LEVELS[level], this.currentLevel, () => {
            this.$log[level](...args);
          });
        }
      };
    }
  }

  spawn(newInternalLogger) {
    if (typeof newInternalLogger === 'string') {
      if (!isValidLogObject(this.$log)) throw new Error('@$log is invalid');
      if (!this._wrapDebug) {
        throw new Error(
          'nemDebug is undefined this is probably the light version of this library sep debug loggers is not supported!'
        );
      }
      return this._wrapDebug(newInternalLogger, this.$log);
    }
    return new Logger(newInternalLogger || this.$log);
  }
}
