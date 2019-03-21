import { DataModel } from '../../src/index'

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

const res = customParserModel.parse(
  {
    base: 'char',
    withData: 'to add base -> ',
    withHelperData: 1,
    simpleFunc: '5',
  },
  { helperNumber: 2 }
)

test('基础自定义 parser', () => {
  expect(res.base).toBe('string')
})

test('使用了 data 的 parser', () => {
  expect(res.withData).toBe('to add base -> char')
})

test('使用了 helperData 的 parser', () => {
  expect(res.withHelperData).toBe(2)
})

test('直接使用 function 的 parser', () => {
  expect(res.simpleFunc).toBe(5)
})
