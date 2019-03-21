import { DataModel } from '../../src/index'

const arrayModel = new DataModel({
  parseNull: {
    type: Array,
  },
  parseUndefined: {
    type: Array,
  },
  useDefault: {
    type: Array,
    default: (): any[] => ['1'],
  },
  useDefaultWithValue: {
    type: Array,
    default: (): any[] => [],
  },
  parseString: {
    type: Array,
  },
  parseNumber: {
    type: Array,
  },
  parseObject: {
    type: Array,
  },
  parseArray: {
    type: Array,
  },
  parseArraySub: {
    type: Array,
    subModel: {
      bar: {
        type: String,
      },
    },
  },
})

const res = arrayModel.parse({
  parseNull: null,
  parseUndefined: undefined,
  useDefault: undefined,
  useDefaultWithValue: ['value'],
  parseString: '1',
  parseNumber: 3,
  parseObject: { foo: '123' },
  parseArray: [{ foo: '234' }],
  parseArraySub: [{ foo: 'foo' }, { bar: 'bar' }],
})

test('转换 null', () => {
  expect(res.parseNull).toEqual([])
})

test('转换 undefined', () => {
  expect(res.parseUndefined).toEqual([])
})

test('使用默认值', () => {
  expect(res.useDefault).toEqual(['1'])
})

test('包含默认值, 但字段存在不使用', () => {
  expect(res.useDefaultWithValue).toEqual(['value'])
})

test('转换 string', () => {
  expect(res.parseString).toEqual([])
})

test('转换 number', () => {
  expect(res.parseNumber).toEqual([])
})

test('转换 object', () => {
  expect(res.parseObject).toEqual([])
})

test('转换 array', () => {
  expect(res.parseArray).toEqual([{ foo: '234' }])
})

test('转换带 subModel 的 array', () => {
  expect(res.parseArraySub).toEqual([{}, { bar: 'bar' }])
})
