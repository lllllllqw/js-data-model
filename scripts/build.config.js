const defaultInputOptions = {
  input: 'src/index.js',
}

module.exports.builds = [
  // commonjs
  {
    inputOptions: defaultInputOptions,
    outputOptions: {
      file: 'dist/js-data-model.csm.js',
      format: 'cjs',
    },
  },
  // es6 module
  {
    inputOptions: defaultInputOptions,
    outputOptions: {
      file: 'dist/js-data-model.esm.js',
      format: 'es',
    },
  },
  // 通过 script 引入
  {
    inputOptions: defaultInputOptions,
    outputOptions: {
      file: 'dist/js-data-model.js',
      format: 'iife',
      output: {
        name: 'JsDataModel',
      },
    },
  },
]
