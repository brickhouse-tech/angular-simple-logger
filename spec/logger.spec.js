const { ngModule, ngInject } = require('./helpers');

describe('nemLogging.nemSimpleLogger', () => {
  let subject, mockLog;

  function createSpyLogger() {
    return {
      log: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  }

  beforeEach(() => {
    mockLog = createSpyLogger();

    ngModule('nemLogging');
    ngModule(($provide) => {
      $provide.value('$log', mockLog);
    });

    ngInject((nemSimpleLogger) => {
      subject = nemSimpleLogger;
    });
  });

  it('exists', () => {
    expect(subject).toBeDefined();
  });

  describe('default level (error)', () => {
    it('does not call debug', () => {
      subject.debug('blah');
      expect(mockLog.debug).not.toHaveBeenCalled();
    });

    it('does not call info', () => {
      subject.info('blah');
      expect(mockLog.info).not.toHaveBeenCalled();
    });

    it('does not call warn', () => {
      subject.warn('blah');
      expect(mockLog.warn).not.toHaveBeenCalled();
    });

    it('calls error', () => {
      subject.error('blah');
      expect(mockLog.error).toHaveBeenCalledWith('blah');
    });

    it('calls log', () => {
      subject.log('blah');
      expect(mockLog.log).toHaveBeenCalledWith('blah');
    });
  });

  describe('all levels on (debug)', () => {
    beforeEach(() => {
      subject.currentLevel = subject.LEVELS.debug;
    });

    ['debug', 'info', 'warn', 'error', 'log'].forEach((level) => {
      it(`calls ${level} with single arg`, () => {
        subject[level]('blah');
        expect(mockLog[level]).toHaveBeenCalledWith('blah');
      });

      it(`calls ${level} with multiple args`, () => {
        subject[level]('blah', 'HI');
        expect(mockLog[level]).toHaveBeenCalledWith('blah', 'HI');
      });
    });
  });

  describe('all levels off', () => {
    describe('by LEVELS + 1', () => {
      beforeEach(() => {
        subject.currentLevel = subject.LEVELS.log + 1;
      });

      ['debug', 'info', 'warn', 'error', 'log'].forEach((level) => {
        it(`does not call ${level}`, () => {
          subject[level]('blah');
          expect(mockLog[level]).not.toHaveBeenCalled();
        });
      });
    });

    describe('by doLog = false', () => {
      beforeEach(() => {
        subject.doLog = false;
      });

      ['debug', 'info', 'warn', 'error', 'log'].forEach((level) => {
        it(`does not call ${level}`, () => {
          subject[level]('blah');
          expect(mockLog[level]).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('spawn', () => {
    it('can create a new logger', () => {
      const newLogger = subject.spawn();
      expect(newLogger.debug).toBeDefined();
      expect(newLogger).not.toBe(subject);
    });

    it('underlying logger is still $log', () => {
      const newLogger = subject.spawn();
      expect(newLogger.$log).toBe(mockLog);
    });

    it('throws on bad logger', () => {
      expect(() => subject.spawn({})).toThrow('@$log is invalid');
    });

    it('throws on partial logger', () => {
      expect(() =>
        subject.spawn({ log: () => {}, debug: () => {}, error: () => {} })
      ).toThrow('@$log is invalid');
    });

    it('throws on undefined internal logger', () => {
      subject.$log = undefined;
      expect(() => subject.spawn()).toThrow('internalLogger undefined');
    });

    it('has independent log levels', () => {
      const newLogger = subject.spawn();
      newLogger.currentLevel = newLogger.LEVELS.debug;
      expect(newLogger.currentLevel).not.toBe(subject.currentLevel);
      newLogger.debug('blah');
      expect(mockLog.debug).toHaveBeenCalled();
    });
  });

  describe('LEVELS', () => {
    it('has correct level values', () => {
      expect(subject.LEVELS.debug).toBe(0);
      expect(subject.LEVELS.info).toBe(1);
      expect(subject.LEVELS.warn).toBe(2);
      expect(subject.LEVELS.error).toBe(3);
      expect(subject.LEVELS.log).toBe(4);
    });
  });

  describe('Array.prototype extensions (bad practice)', () => {
    beforeEach(() => {
      Array.prototype.contains = function () {};
    });

    afterEach(() => {
      delete Array.prototype.contains;
    });

    it('does not leak into LEVELS', () => {
      for (const key in subject.LEVELS) {
        expect(typeof key).toBe('string');
      }
    });
  });
});

describe('nemLogging.nemSimpleLogger decorator', () => {
  let mockLog, decorated;

  function createSpyLogger() {
    return {
      log: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  }

  beforeEach(() => {
    mockLog = createSpyLogger();

    ngModule('nemLogging');
    ngModule(($provide) => {
      $provide.value('$log', mockLog);
    });
    ngModule((nemSimpleLoggerProvider, $provide) => {
      $provide.decorator(...nemSimpleLoggerProvider.decorator);
    });

    ngInject(($log) => {
      decorated = $log;
    });
  });

  ['debug', 'info', 'warn', 'error', 'log'].forEach((level) => {
    it(`${level} works`, () => {
      decorated[level]('blah');
      expect(mockLog[level]).toHaveBeenCalled();
    });
  });
});
