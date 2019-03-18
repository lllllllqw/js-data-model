import { DataModel } from '../../src/index'

test('自定义 parser', () => {
  const customParserModel = new DataModel({
    base: {
      parser: val => {
        return typeof val
      },
    },
    withData: {
      parser: (val, { data }) => {
        return val + data.base
      },
    },
    withHelperData: {
      parser: (val, { helperData }) => {
        return Math.max(val, helperData.helperNumber)
      },
    },
    simpleFunc: val => {
      return Number.parseInt(val)
    },
  })
  expect(
    customParserModel.parse(
      {
        base: 'char',
        withData: 'to add base -> ',
        withHelperData: 1,
        simpleFunc: '5',
      },
      { helperNumber: 2 }
    )
  ).toEqual({
    base: 'string',
    withData: 'to add base -> char',
    withHelperData: 2,
    simpleFunc: 5,
  })
})
