const { ngModule, ngInject } = require('./helpers');

describe('nemLogging.nemDebug', () => {
  let subject, $log;

  beforeEach(() => {
    ngModule('nemLogging');
    ngInject((nemDebug, _$log_) => {
      subject = nemDebug;
      $log = _$log_;
    });
  });

  describe('as a service', () => {
    it('exists', () => {
      expect(subject).toBeDefined();
    });

    it('is a function', () => {
      expect(typeof subject).toBe('function');
    });

    it('has debug API', () => {
      ['disable', 'enable'].forEach((fnName) => {
        expect(typeof subject[fnName]).toBe('function');
      });
    });
  });
});

describe('nemLogging.nemDebug as a provider', () => {
  let providerDebug, simpleLogger;

  beforeEach(() => {
    ngModule('nemLogging');
    ngModule((nemDebugProvider) => {
      providerDebug = nemDebugProvider.debug;
    });

    ngInject((nemSimpleLogger) => {
      simpleLogger = nemSimpleLogger;
    });
  });

  it('exists', () => {
    expect(providerDebug).toBeDefined();
  });

  it('is a function', () => {
    expect(typeof providerDebug).toBe('function');
  });

  describe('spawn a debug level', () => {
    it('creates disabled logger', () => {
      const newLogger = simpleLogger.spawn('worker:a');
      expect(newLogger.debug).toBeDefined();
      expect(newLogger.debug.namespace).toBe('worker:a');
      ['debug', 'info', 'warn', 'error', 'log'].forEach((fnName) => {
        expect(typeof newLogger[fnName]).toBe('function');
      });
    });

    it('creates enabled logger', () => {
      providerDebug.enable('worker:*');
      const newLogger = simpleLogger.spawn('worker:a');
      expect(newLogger.debug.namespace).toBe('worker:a');
    });

    it('underlying logger is not $log (wrapped)', () => {
      const newLogger = simpleLogger.spawn('worker:b');
      expect(newLogger.$log).toBeUndefined();
    });
  });
});
