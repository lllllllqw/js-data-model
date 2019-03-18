declare module 'js-data-model' {
  export const DataModel: DataModel
}

declare interface parserTypes extends Record<string, any> {
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

declare class DataModel {
  constructor(model: OptionsMap)

  private model: OptionsMap

  parse(data: Record<string, any>, helperData?: any): Record<string, any>
}

declare interface DataModelConstructor {
  addParserTypes(types: Record<string, any>): void

  addParser(type: any, parser: parser): void

  use(plugin: any, options?: any): void
}

declare type parser = (val: any, model: OptionsMap, helperData?: any) => any
