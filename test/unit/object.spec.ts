import { DataModel } from '../../src/index'

test('转换为 Object', () => {
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
  expect(
    (() => {
      return objectModel.parse({
        parseNull: null,
        parseUndefined: undefined,
        parseString: '1',
        parseNumber: 3,
        parseObject: { foo: '123' },
        parseObjectSub: { foo: '123', bar: 345 },
        parseArray: [{ foo: '234' }],
        parseArraySub: [{ foo: 'foo' }, { bar: 'bar' }],
      })
    })()
  ).toEqual({
    parseNull: {},
    parseUndefined: {},
    useDefault: {},
    parseString: {},
    parseNumber: {},
    parseObject: { foo: '123' },
    parseObjectSub: { foo: 123, bar: 345, baz: {} },
    parseArray: {},
  })
})