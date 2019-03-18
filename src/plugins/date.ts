const parserTypes = {
  Date: Date,
}

const parserMap: Map<any, parser> = new Map([
  [parserTypes.Date, (val: any) => {
    return new Date(val)
  }],
])

export default (DataModel: DataModelConstructor, options: any) => {
  parserMap.forEach((parser, key) => {
    DataModel.addParser(key, parser)
  })
  
  DataModel.addParserTypes(parserTypes)
}