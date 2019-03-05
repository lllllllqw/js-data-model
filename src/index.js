import * as utils from './utils'

const parser = new Map([
  [Array, (val, option, helperData) => {
    if (utils.noVal(val)) {
      return option.default
    }

    if (!option.subModel || Object.prototype.toString.call(val) !== '[object Array]') {
      return [...val]
    }

    return val.map((item) => parse(item, option.subModel), helperData)
  }],
  [String, (val, option) => utils.noVal(val) ? option.default : `${val}`],
  [Number, (val, option) => utils.noVal(val) ? option.default : +val],
])

const parse = (data, model, helperData) => {
  const result = {}
  for (const [key, option] of Object.entries(model)) {
    if (!option) {
      continue
    }

    const val = option.fromKey ? utils.get(data, option.fromKey) : data[key]

    if (option.parse) {
      result[key] = option.parse(val, { data, model, option, helperData })
      continue
    }

    if (option.type) {
      const newVal = parser.get(option.type)(val, option, helperData)
      if (!utils.noVal(newVal)) {
        result[key] = newVal
      }
    }
  }

  return result
}

export class DataModel {
  /**
   * @typedef Options
   * @prop {any} type
   * @prop {Options} subModel
   * @prop {any} default
   * @prop {Function} parse
   * @prop {string} fromKey
   */
  /**
   * @param {{[key: string]: Options}} options
   */
  constructor (options) {
    this.options = options
  }

  parse (data, helperData) {
    return parse(data, this.options, helperData)
  }
}
