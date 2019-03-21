interface ParserTypes {
  Date: DateConstructor
}

const parserTypes: ParserTypes = {
  Date: Date,
}

const parserMap: Map<any, Model.Parser> = new Map([
  [
    parserTypes.Date,
    (val: any) => {
      return new Date(val)
    },
  ],
])

export default (DataModel: Model.DataModelConstructor, options: any) => {
  parserMap.forEach((parser, key) => {
    DataModel.addParser(key, parser)
  })

  DataModel.addParserTypes(parserTypes)
}
