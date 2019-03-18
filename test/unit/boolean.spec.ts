import { DataModel } from '../../src/index'

test('转换为 Boolean', () => {
  const stringModel = new DataModel({
    parseNull: {
      type: Boolean,
    },
    parseUndefined: {
      type: Boolean,
    },
    parseStringNotEmpty: {
      type: Boolean,
    },
    parserStringEmpty: {
      type: Boolean,
    },
    parseNumberNotZero: {
      type: Boolean,
    },
    parseNumberZero: {
      type: Boolean,
    },
    parseObjectNotEmpty: {
      type: Boolean,
    },
    parseObjectEmpty: {
      type: Boolean,
    },
    parseArrayNotEmpty: {
      type: Boolean,
    },
    parseArrayEmpty: {
      type: Boolean,
    },
  })

  expect(
    stringModel.parse({
      parseNull: null,
      parseUndefined: undefined,
      parseStringNotEmpty: 'val',
      parserStringEmpty: '',
      parseNumberNotZero: 1,
      parseNumberZero: 0,
      parseObjectNotEmpty: { foo: '123' },
      parseObjectEmpty: {},
      parseArrayNotEmpty: [{ foo: '234' }],
      parseArrayEmpty: [],
    })
  ).toEqual({
    parseNull: false,
    parseUndefined: false,
    parseStringNotEmpty: true,
    parserStringEmpty: false,
    parseNumberNotZero: true,
    parseNumberZero: false,
    parseObjectNotEmpty: true,
    parseObjectEmpty: true,
    parseArrayNotEmpty: true,
    parseArrayEmpty: true,
  })
})