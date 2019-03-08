import * as utils from './utils'
/**
 * @typedef Options
 * @prop {any} type
 * @prop {{[key: string]: Options}} subModel
 * @prop {any} default
 * @prop {Function} parse
 * @prop {string} fromKey
 */

/** @type {Map<any, (val: any, option: Options, helperData: {}) => any>} */
const parser = new Map([
  [Array, (val, option, helperData) => {
    // 没有值
    if (utils.isNoVal(val)) {
      return utils.getDefaultValue(option.default)
    }

    // 没有定义模型 | 值类型不是 Array
    if (!option.subModel || Object.prototype.toString.call(val) !== '[object Array]') {
      return [...val]
    }

    // 值类型为 Array, 按 model 返回
    return val.map((item) => parse(item, option.subModel, helperData))
  }],
  [Object, (val, option, helperData) => {
    // 如果定义了 model, 按 model 返回
    if(option.subModel) {
      return parse(val, option.subModel, helperData)
    }
    
    // 没有值且默认值不为 undefined, 返回默认值
    if (utils.isNoVal(val)) {
      const defaultValue = utils.getDefaultValue(option.default)
      if(defaultValue !== undefined) {
        return defaultValue
      }
    }

    // 有值且不为 Object 类型, 返回 {}
    if (Object.prototype.toString.call(val) !== '[object Object]') {
      return {}
    }
    
    // 返回浅拷贝的原值
    return {...val}
  }],
  // Object & Array => JSON.stringify(val) any -> any.toString()
  [String, (val, option) => {
    if(utils.isNoVal(val)) {
      return utils.getDefaultValue(option.default)
    }

    if(['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(val))) {
      return JSON.stringify(val)
    }

    return val.toString()
  }],
  // [undefined, null, false] -> 0, true -> 1, String -> [number, NaN]
  [Number, (val, option) => utils.isNoVal(val) ? utils.getDefaultValue(option.default) : +val],
])

/**
 * 根据 model 解析出对应结构的 data
 * @author lqw
 * @date 2019-03-07
 * @param {{}} data 基础数据
 * @param {{[key: string]: Options}} model 结构模型
 * @param {{}} helperData 使用自定义 parser 时的自定义数据
 * @returns {{}}
 */
const parse = (data, model, helperData = {}) => {
  const result = {}
  // 遍历 model, 对每一个 model 进行解析
  for (const [key, option] of Object.entries(model)) {
    // 优先从 fromKey 字段获取原值
    const val = option.fromKey ? utils.get(data, option.fromKey) : utils.get(data, key)

    // 如果存在 parser, 优先使用 parser 解析
    if (option.parser) {
      result[key] = option.parser(val, { data, model, option, helperData })
      continue
    }

    // 不存在 parser, 则采取 type 对应的默认 parser 解析
    if (option.type) {
      const newVal = parser.get(option.type)(val, option, helperData)
      if (!utils.isNoVal(newVal)) {
        result[key] = newVal
      }
    }
  }

  return result
}

export class DataModel {
  /**
   * @param {{[key: string]: Options}} options
   */
  constructor (options) {
    this.options = options
  }

  /**
   * 描述
   * @author lqw
   * @date 2019-03-07
   * @param {{}} data 基础数据
   * @param {{}} helperData 使用自定义 parser 时的自定义数据
   * @returns {{}}
   */
  parse (data, helperData) {
    return parse(data, this.options, helperData)
  }
}
