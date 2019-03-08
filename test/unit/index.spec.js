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
      parseString: '1',
      parseNumber: 3,
      parseObject: {},
      parseArray: [{ foo: '234' }],
      parseArraySub: [{ foo: 'foo' }, { bar: 'bar' }],
    })
  ).toEqual({
    useDefault: 'default',
    parseString: '1',
    parseNumber: '3',
    parseObject: JSON.stringify({}),
    parseArray: JSON.stringify([{ foo: '234' }]),
  })
})

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
      type: String,
    },
    parseArray: {
      type: String,
    },
  })

  expect(
    stringModel.parse({
      parseNull: null,
      parseString: '1',
      parseNumber: 3,
    })
  ).toEqual({
    useDefault: 1,
    parseString: 1,
    parseNumber: 3,
  })
})

test('转换为 Object', () => {
  const objectModel = new DataModel({
    parseObject: {
      type: Object,
    },
  })
  expect(
    objectModel.parse({
      parseObject: { foo: '123' },
    })
  ).toEqual({
    parseObject: {
      foo: '123',
    },
  })
})

test('转换为 Array', () => {
  const arrayModel = new DataModel({
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
      parseArray: [{ foo: '234' }],
      parseArraySub: [{ foo: 'foo' }, { bar: 'bar' }],
    })
  ).toEqual({
    parseArray: [{ foo: '234' }],
    parseArraySub: [{}, { bar: 'bar' }],
  })
})
