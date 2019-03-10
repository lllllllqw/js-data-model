import { DataModel } from '../../src'

test('自定义 parser', () => {
  const customParserModel = new DataModel({
    simple: {
      parser: val => {
        return typeof val
      },
    },
    withData: {
      parser: (val, { data }) => {
        return val + data.simple
      },
    },
    withHelperData: {
      parser: (val, { helperData }) => {
        return Math.max(val, helperData.helperNumber)
      },
    },
  })
  expect(
    customParserModel.parse(
      {
        simple: 'char',
        withData: 'to add simple -> ',
        withHelperData: 1,
      },
      { helperNumber: 2 }
    )
  ).toEqual({
    simple: 'string',
    withData: 'to add simple -> char',
    withHelperData: 2,
  })
})
