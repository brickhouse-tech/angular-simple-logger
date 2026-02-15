// angular-mocks checks (window.jasmine || window.mocha) to expose module/inject
// Set a truthy value so angular-mocks registers them
window.jasmine = true;

require('angular');
require('angular-mocks');
require('../src/index');

const ngModule = window.angular.mock.module;
const ngInject = window.angular.mock.inject;

module.exports = { ngModule, ngInject };
