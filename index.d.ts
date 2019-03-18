declare module 'js-data-model' {
  export const DataModel: DataModelBase
}

interface parserTypes {
  Array: ArrayConstructor
  Object: ObjectConstructor
  String: StringConstructor
  Number: NumberConstructor
  Boolean: BooleanConstructor
  [key: string]: any
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

declare class DataModelBase {
  constructor(model: OptionsMap)

  model: OptionsMap

  parse(data: Record<string, any>, helperData?: any): Record<string, any>
}

declare type parser = (val: any, model: OptionsMap, helperData?: any) => any
