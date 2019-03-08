import { DataModel } from '../../src'

test('转换为 Number', () => {
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

  expect(
    stringModel.parse({
      parseNull: null,
      parseUndefined: undefined,
      parseString: '1',
      parseNumber: 3,
      parseObject: { foo: '123' },
      parseObjectSub: { foo: '123', bar: 345 },
      parseArray: [{ foo: '234' }],
      parseArraySub: [{ foo: 'foo' }, { bar: 'bar' }],
    })
  ).toEqual({
    useDefault: 1,
    parseString: 1,
    parseNumber: 3,
    parseObject: NaN,
    parseArray: NaN,
  })
})