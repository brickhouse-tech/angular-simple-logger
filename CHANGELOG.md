# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.0.0](https://github.com/brickhouse-tech/angular-simple-logger/compare/v0.2.4...v2.0.0) (2026-02-18)


### ⚠ BREAKING CHANGES

* peer dependency changed from `angular` to `@brickhouse-tech/angular-lts`.

- Swap angular → @brickhouse-tech/angular-lts in peer deps and dev deps
- Update all source imports and rollup externals
- Update test helpers to require the new package
- Bump version to 2.0.0 (major: breaking peer dep change)

fix(test): map @brickhouse-tech/angular-lts to angular in jest

The @brickhouse-tech/angular-lts@1.9.0 npm package was published without
the built angular.js file (missing build step in prepublishOnly). Add a
Jest moduleNameMapper to resolve the import to the original angular
package for tests, and re-add angular as a devDependency.

This workaround can be removed once angular-lts publishes a fixed version
that includes the built files.

chore: remove angular cve reference dep

chore: upgrade eslint to 10.x

Remaining npm audit findings (4 moderate ajv) are dev-only toolchain
dependencies that never ship in the published package.

chore: sync lockfile

fix: skip integration tests until angular-lts ships built files

Integration tests (logger.spec.js, debug.spec.js) fail because
@brickhouse-tech/angular-lts@1.9.0 is missing angular.js in its

### Features

* migrate to @brickhouse-tech/angular-lts (v2.0.0) ([8e371f0](https://github.com/brickhouse-tech/angular-simple-logger/commit/8e371f028460875127d0c406691964d0305224aa)), closes [brickhouse-tech/angular.js#6](https://github.com/brickhouse-tech/angular.js/issues/6)

## [0.2.4](https://github.com/brickhouse-tech/angular-simple-logger/compare/v0.2.3...v0.2.4) (2026-02-17)

## [0.2.3](https://github.com/brickhouse-tech/angular-simple-logger/compare/v0.2.2...v0.2.3) (2026-02-16)


### Bug Fixes

* add browser-safe UMD bundle for bower/script-tag users ([3ffa3d2](https://github.com/brickhouse-tech/angular-simple-logger/commit/3ffa3d249425227a50fcffb805afe048cd322f91)), closes [#32](https://github.com/brickhouse-tech/angular-simple-logger/issues/32)

## [0.2.2](https://github.com/brickhouse-tech/angular-simple-logger/compare/v0.2.1...v0.2.2) (2026-02-15)

## 0.2.1 (2026-02-15)


### Features

* **debug levels:** visionmedia/debug wrapper for angular-simple-logger working ([ae7a9d7](https://github.com/brickhouse-tech/angular-simple-logger/commit/ae7a9d761a4b5fd182d6b0701444df6fd8470c64))
* **decorator:** nemSimpleLogger used at the config level now actually ([c8a3fbf](https://github.com/brickhouse-tech/angular-simple-logger/commit/c8a3fbfaf7bcf8143bf7f8fcceba42e9887a24dd))
* modernize from CoffeeScript/Gulp to ES6/Rollup/Jest ([e1888e5](https://github.com/brickhouse-tech/angular-simple-logger/commit/e1888e51e94e19823d18396c10defa65a2cfefb3))
* **service->provider:** to be configurable ([4d1b02f](https://github.com/brickhouse-tech/angular-simple-logger/commit/4d1b02fcba973f877da6999f9fb555b95926eb7f))
* use shared reusable workflows + add eslint ([c4b3547](https://github.com/brickhouse-tech/angular-simple-logger/commit/c4b3547addfebd1fe494522fed49425afba5f3d3))


### Bug Fixes

* add package-lock.json for GH Actions cache ([ae8b34c](https://github.com/brickhouse-tech/angular-simple-logger/commit/ae8b34ce07a33c87e98d4621aa1a301e590ea05e))
* align all workflows exactly with cfn-include ([3686883](https://github.com/brickhouse-tech/angular-simple-logger/commit/3686883496f0bdd7681b96307da6ce0646284c94))
* **commonjs:** issue [#7](https://github.com/brickhouse-tech/angular-simple-logger/issues/7) browserified ([bf075d5](https://github.com/brickhouse-tech/angular-simple-logger/commit/bf075d56116a5d3d47047fbcefa05537d5ddc38b))
* **LEVELS order:** Changed to follow typical conventions ([0891e3f](https://github.com/brickhouse-tech/angular-simple-logger/commit/0891e3f3209173843d229260065d42039af18c96))
* **logger.logfn args fixes:** specs added to ensure arguments get passed onto the logger function ([06fc827](https://github.com/brickhouse-tech/angular-simple-logger/commit/06fc8277a9d9878152ca7c2d1f80af2ec0c49a99))
* **namespace:** caching was using the wrong name for the string level / ([aca8e07](https://github.com/brickhouse-tech/angular-simple-logger/commit/aca8e079b293d31d80dba9e4176821ae91c73b36)), closes [#19](https://github.com/brickhouse-tech/angular-simple-logger/issues/19)
* **readme:** fixed typos in readme ([fe76b36](https://github.com/brickhouse-tech/angular-simple-logger/commit/fe76b369f0877d0020bbbdd5eef8002be85dfd6d))
* update git URLs to brickhouse-tech for npm OIDC provenance ([047ef6c](https://github.com/brickhouse-tech/angular-simple-logger/commit/047ef6c640afe16ae679041011566147de68c923))
