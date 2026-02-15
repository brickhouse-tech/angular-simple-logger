const { Logger, LEVELS, FNS, isValidLogObject } = require('../src/logger');

describe('Logger (unit)', () => {
  function makeMockLog() {
    return {
      log: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  }

  describe('constructor', () => {
    it('throws if no $log', () => {
      expect(() => new Logger()).toThrow('internalLogger undefined');
    });

    it('throws if $log is invalid', () => {
      expect(() => new Logger({})).toThrow('@$log is invalid');
    });

    it('creates with valid $log', () => {
      const logger = new Logger(makeMockLog());
      expect(logger.doLog).toBe(true);
      expect(logger.currentLevel).toBe(LEVELS.error);
    });
  });

  describe('LEVELS', () => {
    it('debug < info < warn < error < log', () => {
      expect(LEVELS.debug).toBeLessThan(LEVELS.info);
      expect(LEVELS.info).toBeLessThan(LEVELS.warn);
      expect(LEVELS.warn).toBeLessThan(LEVELS.error);
      expect(LEVELS.error).toBeLessThan(LEVELS.log);
    });
  });

  describe('FNS', () => {
    it('has all 5 methods', () => {
      expect(FNS).toEqual(['debug', 'info', 'warn', 'error', 'log']);
    });
  });

  describe('isValidLogObject', () => {
    it('returns false for null', () => {
      expect(isValidLogObject(null)).toBe(false);
    });

    it('returns false for partial', () => {
      expect(isValidLogObject({ log: () => {} })).toBe(false);
    });

    it('returns true for complete', () => {
      expect(isValidLogObject(makeMockLog())).toBe(true);
    });
  });

  describe('level filtering', () => {
    it('at error level, only error and log fire', () => {
      const mock = makeMockLog();
      const logger = new Logger(mock);
      logger.currentLevel = LEVELS.error;

      logger.debug('x');
      logger.info('x');
      logger.warn('x');
      logger.error('x');
      logger.log('x');

      expect(mock.debug).not.toHaveBeenCalled();
      expect(mock.info).not.toHaveBeenCalled();
      expect(mock.warn).not.toHaveBeenCalled();
      expect(mock.error).toHaveBeenCalled();
      expect(mock.log).toHaveBeenCalled();
    });

    it('at debug level, all fire', () => {
      const mock = makeMockLog();
      const logger = new Logger(mock);
      logger.currentLevel = LEVELS.debug;

      FNS.forEach((fn) => logger[fn]('x'));
      FNS.forEach((fn) => expect(mock[fn]).toHaveBeenCalled());
    });

    it('at log+1 level, none fire', () => {
      const mock = makeMockLog();
      const logger = new Logger(mock);
      logger.currentLevel = LEVELS.log + 1;

      FNS.forEach((fn) => logger[fn]('x'));
      FNS.forEach((fn) => expect(mock[fn]).not.toHaveBeenCalled());
    });
  });

  describe('doLog', () => {
    it('when false, nothing fires', () => {
      const mock = makeMockLog();
      const logger = new Logger(mock);
      logger.currentLevel = LEVELS.debug;
      logger.doLog = false;

      FNS.forEach((fn) => logger[fn]('x'));
      FNS.forEach((fn) => expect(mock[fn]).not.toHaveBeenCalled());
    });
  });

  describe('spawn', () => {
    it('creates independent logger', () => {
      const mock = makeMockLog();
      const logger = new Logger(mock);
      const child = logger.spawn();
      expect(child).not.toBe(logger);
      expect(child.$log).toBe(mock);
    });

    it('creates with new internal logger', () => {
      const mock1 = makeMockLog();
      const mock2 = makeMockLog();
      const logger = new Logger(mock1);
      const child = logger.spawn(mock2);
      expect(child.$log).toBe(mock2);
    });

    it('throws for string without _wrapDebug', () => {
      const mock = makeMockLog();
      const logger = new Logger(mock);
      expect(() => logger.spawn('test:ns')).toThrow('light version');
    });
  });
});
