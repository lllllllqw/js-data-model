const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const { builds } = require('./build.config')

function build({ inputOptions, outputOptions }) {
  let bundle = null
  rollup
    .rollup(inputOptions)
    .then(b => {
      bundle = b
      return bundle.generate(outputOptions)
    })
    .then(() => {
      return bundle.write({
        ...outputOptions,
        plugins: [
          babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
          })
        ]
      })
    })
    .then(() => {
      process.exit(0)
    })
}

for (const option of builds) {
  build(option)
}
