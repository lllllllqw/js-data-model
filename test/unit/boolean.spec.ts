import { DataModel } from '../../src/index'

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

const res = stringModel.parse({
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

test('转换 null', () => {
  expect(res.parseNull).toBe(false)
})

test('转换 undefined', () => {
  expect(res.parseUndefined).toBe(false)
})

test('转换非空 string', () => {
  expect(res.parseStringNotEmpty).toBe(true)
})

test('转换空的 string', () => {
  expect(res.parserStringEmpty).toBe(false)
})

test('转换非 0 数字', () => {
  expect(res.parseNumberNotZero).toBe(true)
})

test('转换数字 0', () => {
  expect(res.parseNumberZero).toBe(false)
})

test('转换非空对象', () => {
  expect(res.parseObjectNotEmpty).toBe(true)
})

test('转换空对象', () => {
  expect(res.parseObjectEmpty).toEqual(true)
})

test('转换非空数组', () => {
  expect(res.parseArrayNotEmpty).toEqual(true)
})

test('转换空数组', () => {
  expect(res.parseArrayEmpty).toEqual(true)
})
