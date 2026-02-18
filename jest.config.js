module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/spec/**/*.spec.js'],
  // Integration tests (logger.spec.js, debug.spec.js) require @brickhouse-tech/angular-lts
  // to ship built files. Skipped until angular-lts PR #6 is merged + published.
  // See: https://github.com/brickhouse-tech/angular.js/pull/6
  testPathIgnorePatterns: [
    '/spec/logger\\.spec\\.js$',
    '/spec/debug\\.spec\\.js$',
  ],
};
