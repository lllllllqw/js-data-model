declare interface Options {
  type?: ArrayConstructor | Object | Number | String | undefined | null
  subModel?: {[key: string]: Options}
  default?: any
  parser?: (val: any, options: {data: any, model: OptionsMap, option: Options, helperData: any} ) => any
  fromKey?: string
}

declare interface OptionsMap {
  [key: string]: Options
}

declare interface ObjectAny {
  [key: string]: any
}


declare module 'js-data-model' {
  export class DataModel {
    constructor (options: OptionsMap)

    options: Options
    
    parse: (data: ObjectAny, helperData: any) => ObjectAny
  }
}
