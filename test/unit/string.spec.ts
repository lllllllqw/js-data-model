import { DataModel } from '../../src'

test('转换为 String', () => {
  const stringModel = new DataModel({
    parseNull: {
      type: String,
    },
    parseUndefined: {
      type: String,
    },
    useDefault: {
      type: String,
      default: 'default',
    },
    parseString: {
      type: String,
    },
    parseNumber: {
      type: String,
      default: 'default',
    },
    parseObject: {
      type: String,
    },
    parseArray: {
      type: String,
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
    useDefault: 'default',
    parseString: '1',
    parseNumber: '3',
    parseObject: JSON.stringify({ foo: '123' }),
    parseArray: JSON.stringify([{ foo: '234' }]),
  })
})