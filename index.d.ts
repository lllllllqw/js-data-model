declare module 'js-data-model' {
  export const DataModel: DataModelConstructor
}

declare interface parserTypes {
  Array: ArrayConstructor
  Object: ObjectConstructor
  String: StringConstructor
  Number: NumberConstructor
  Boolean: BooleanConstructor
}

type customParser = (
  val: any,
  options: { data: any; model: OptionsMap; option: Options; helperData: any }
) => any

declare type OptionsMap = Record<string, Options | customParser>

declare interface Options {
  type?: ArrayConstructor | Object | Number | String | undefined | null
  subModel?: OptionsMap
  default?: any
  parser?: customParser
  fromKey?: string
}

declare type parser = (val: any, model: OptionsMap, helperData?: any) => any

declare interface DataModelInterface {
  /** 转换数据为 model 对应结构 */
  parse(data: Record<string, any>, helperData?: any): Record<string, any>
}

declare interface DataModelConstructor {
  new (model: OptionsMap): DataModelInterface

  /** 添加 parserTypes 的枚举*/
  addParserTypes(types: Record<string, any>): void

  addParser(type: any, parser: parser): void

  use(plugin: DataModelPlugin, options?: any): void
}

declare interface DataModelPluginFunction {
  (DataModel: DataModelConstructor, options?: any): void
}

declare type DataModelPlugin = DataModelPluginFunction | { install: DataModelPluginFunction }