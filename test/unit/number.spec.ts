import { DataModel } from '../../src/index'

const stringModel = new DataModel({
  parseNull: {
    type: Number,
  },
  parseUndefined: {
    type: Number,
  },
  useDefault: {
    type: Number,
    default: 1,
  },
  parseString: {
    type: Number,
  },
  parseNumber: {
    type: Number,
    default: 1,
  },
  parseObject: {
    type: Number,
  },
  parseArray: {
    type: Number,
  },
})

const res = stringModel.parse({
  parseNull: null,
  parseUndefined: undefined,
  parseString: '1',
  parseNumber: 3,
  parseObject: { foo: '123' },
  parseObjectSub: { foo: '123', bar: 345 },
  parseArray: [{ foo: '234' }],
  parseArraySub: [{ foo: 'foo' }, { bar: 'bar' }],
})

test('转换 null', () => {
  expect(res.parseNull).toBe(undefined)
})

test('转换 undefined', () => {
  expect(res.parseUndefined).toBe(undefined)
})

test('使用默认值', () => {
  expect(res.useDefault).toBe(1)
})

test('转换 string', () => {
  expect(res.parseString).toBe(1)
})

test('转换 number', () => {
  expect(res.parseNumber).toBe(3)
})

test('转换 object', () => {
  expect(res.parseObject).toBe(NaN)
})

test('转换 array', () => {
  expect(res.parseArray).toBe(NaN)
})