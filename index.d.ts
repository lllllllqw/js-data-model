declare module 'js-data-model' {
  export const DataModel: Model.DataModelConstructor
  export const parserTypes: ParserTypes
}
declare interface ParserTypes {
  Array: ArrayConstructor
  Object: ObjectConstructor
  String: StringConstructor
  Number: NumberConstructor
  Boolean: BooleanConstructor
}

declare namespace Model {

  interface CustomParser {
    (
      val: any,
      options: {
      data: any
      model: OptionsMap
      option: Options
      helperData: any
      }
    ): any
  }

  type OptionsMap = Record<string, Options | CustomParser>

  interface Options {
    type?: ArrayConstructor | Object | Number | String | undefined | null
    subModel?: OptionsMap
    default?: any
    parser?: CustomParser
    fromKey?: string
  }

  type Parser = (val: any, model: OptionsMap, helperData?: any) => any

  interface DataModelInterface {
    /** 转换数据为 model 对应结构 */
    parse(data: Record<string, any>, helperData?: any): Record<string, any>
  }

  interface DataModelConstructor {
    new (model: OptionsMap): DataModelInterface

    /** 添加 parserTypes 的枚举*/
    addParserTypes(types: Record<string, any>): void

    addParser(type: any, parser: Parser): void

    use(plugin: DataModelPlugin, options?: any): void
  }

  interface DataModelPluginFunction {
    (DataModel: DataModelConstructor, options?: any): void
  }

  type DataModelPlugin =
    | DataModelPluginFunction
    | { install: DataModelPluginFunction }
}
