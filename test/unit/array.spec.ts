import { DataModel } from '../../dist/js-data-model.esm.js'

test('转换为 Array', () => {
  const arrayModel = new DataModel({
    parseNull: {
      type: Array,
    },
    parseUndefined: {
      type: Array,
    },
    useDefault: {
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

  expect(
    arrayModel.parse({
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
    parseNull: [],
    parseUndefined: [],
    useDefault: [],
    parseString: [],
    parseNumber: [],
    parseObject: [],
    parseArray: [{ foo: '234' }],
    parseArraySub: [{}, { bar: 'bar' }],
  })
})
