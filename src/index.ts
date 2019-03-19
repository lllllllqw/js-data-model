import * as utils from './utils'

export const parserTypes: parserTypes = {
  Array: Array,
  Object: Object,
  String: String,
  Number: Number,
  Boolean: Boolean,
}

const parserMap = new Map<any, parser>([
  [
    parserTypes.Array,
    (val, option: Options, helperData) => {
      const isArray = Object.prototype.toString.call(val) === '[object Array]'

      // 没有值 | 值类型不是 Array, 返回默认的空数组
      if (utils.isNoVal(val) || !isArray) {
        return utils.getDefaultValue(option.default) || []
      }

      // 定义 model 且 类型值是 Array, 按 model 返回
      if (option.subModel) {
        return val.map((item: any) => parse(item, option.subModel as Options, helperData))
      }

      // 返回浅拷贝的数组
      return [...val]
    },
  ],
  [
    parserTypes.Object,
    (val, option: Options, helperData) => {
      // 如果定义了 model, 按 model 返回
      if (option.subModel) {
        return parse(val, option.subModel, helperData)
      }

      // 没有值且默认值不为 undefined, 返回默认值
      if (utils.isNoVal(val)) {
        const defaultValue = utils.getDefaultValue(option.default)
        if (defaultValue !== undefined) {
          return defaultValue
        }
      }

      // 有值且不为 Object 类型, 返回 {}
      if (Object.prototype.toString.call(val) !== '[object Object]') {
        return {}
      }

      // 返回浅拷贝的原值
      return { ...val }
    },
  ],
  // Object & Array => JSON.stringify(val) any -> any.toString()
  [
    parserTypes.String,
    (val, option) => {
      if (utils.isNoVal(val)) {
        return utils.getDefaultValue(option.default)
      }

      if (
        ['[object Object]', '[object Array]'].includes(
          Object.prototype.toString.call(val)
        )
      ) {
        return JSON.stringify(val)
      }

      return val.toString()
    },
  ],
  // [undefined, null, false] -> 0, true -> 1, String -> [number, NaN]
  [
    parserTypes.Number,
    (val, option) =>
      utils.isNoVal(val) ? utils.getDefaultValue(option.default) : +val,
  ],
  [
    parserTypes.Boolean,
    (val) => {
      return !!val
    },
  ],
])

/**
 * 根据 model 解析出对应结构的 data
 * @author lqw
 * @date 2019-03-07
 */
const parse = (data: Record<string, any>, model: Options, helperData: any = {}): Record<string, any> => {
  const result: Record<string, any> = {}
  // 遍历 model, 对每一个 model 进行解析
  for (const [key, option] of Object.entries(model)) {
    // 优先从 fromKey 字段获取原值
    const val = option.fromKey
      ? utils.get(data, option.fromKey)
      : utils.get(data, key)

    // 如果存在 parser, 优先使用 parser 解析
    if (typeof option === 'function') {
      result[key] = option(val, { data, model, option, helperData })
    }
    if (option.parser) {
      result[key] = option.parser(val, { data, model, option, helperData })
      continue
    }

    // 不存在 parser, 则采取 type 对应的默认 parser 解析
    if (option.type) {
      const parser = parserMap.get(option.type)
      const newVal = parser ? parser(val, option, helperData) : undefined
      if (!utils.isNoVal(newVal)) {
        result[key] = newVal
      }
    }
  }

  return result
} 

export class DataModel {
  private model: OptionsMap

  constructor(model: OptionsMap) {
    this.model = model
  }

  /**
   * 转换 data 为 model 对应的数据格式
   * @author lqw
   * @date 2019-03-07
   */
  public parse(data: Record<string, any>, helperData?: any): Record<string, any> {
    return parse(data, this.model, helperData)
  }

  static addParserTypes(types: Record<string, any>) {
    for(const [key, val] of Object.entries(types)) {
      if(key in parserTypes) {
        return console.warn('已存在相同的 key, 跳过添加')
      }
      parserTypes[key] = val
    }
  }

  static addParser(type: any, parser: parser) {
    if(parserMap.has(type)) {
      return console.warn('已存在相同的 type, 跳过添加')
    }
    parserMap.set(type, parser)
  }

  static use(plugin: any, options?: any) {
    if(typeof plugin === 'function') {
      return plugin(DataModel, options)
    }
    if(typeof plugin.install === 'function') {
      return plugin.install(DataModel, options)
    }
  }
}
