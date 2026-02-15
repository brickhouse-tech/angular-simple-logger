import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const external = ['angular'];
const globals = { angular: 'angular' };

function makeConfig(input, outputBase, extraExternal = []) {
  const allExternal = [...external, ...extraExternal];
  const allGlobals = { ...globals };
  extraExternal.forEach((e) => (allGlobals[e] = e));

  return [
    {
      input,
      external: allExternal,
      output: [
        {
          file: `dist/${outputBase}.js`,
          format: 'umd',
          name: 'nemLogging',
          globals: allGlobals,
          exports: 'named',
        },
        {
          file: `dist/${outputBase}.esm.js`,
          format: 'es',
          globals: allGlobals,
          exports: 'named',
        },
      ],
      plugins: [resolve(), commonjs()],
    },
    {
      input,
      external: allExternal,
      output: {
        file: `dist/${outputBase}.min.js`,
        format: 'umd',
        name: 'nemLogging',
        globals: allGlobals,
        exports: 'named',
      },
      plugins: [resolve(), commonjs(), terser()],
    },
  ];
}

export default [
  ...makeConfig('src/index.js', 'angular-simple-logger', ['debug']),
  ...makeConfig('src/index.light.js', 'angular-simple-logger.light'),
];
