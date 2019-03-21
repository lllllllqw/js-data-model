import { DataModel } from '../../src/index'

const objectModel = new DataModel({
  parseNull: {
    type: Object,
  },
  parseUndefined: {
    type: Object,
  },
  useDefault: {
    type: Object,
    default: () => ({}),
  },
  parseString: {
    type: Object,
  },
  parseNumber: {
    type: Object,
    default: 1,
  },
  parseObject: {
    type: Object,
  },
  parseObjectSub: {
    type: Object,
    subModel: {
      foo: {
        type: Number,
      },
      bar: {
        type: Number,
      },
      baz: {
        type: Object,
      },
    },
  },
  parseArray: {
    type: Object,
  },
})
const res = objectModel.parse({
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
  expect(res.parseNull).toEqual({})
})

test('转换 undefined', () => {
  expect(res.parseUndefined).toEqual({})
})

test('使用默认值', () => {
  expect(res.useDefault).toEqual({})
})

test('转换 string', () => {
  expect(res.parseString).toEqual({})
})

test('转换 number', () => {
  expect(res.parseNumber).toEqual({})
})

test('转换 object', () => {
  expect(res.parseObject).toEqual({ foo: '123' })
})

test('转换带 subModel 的对象', () => {
  expect(res.parseObjectSub).toEqual({ foo: 123, bar: 345, baz: {} })
})

test('转换 array', () => {
  expect(res.parseArray).toEqual({})
})
