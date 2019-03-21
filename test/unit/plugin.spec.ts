import { DataModel, parserTypes } from '../../src/index'
import DatePlugin from '../../src/plugins/date'

DataModel.use(DatePlugin)
const stringModel = new DataModel({
  date: {
    type: (parserTypes as any).Date,
  },
})

const res = stringModel.parse({
  date: +new Date(),
})

test('使用 use 方法注册 Date 插件', () => {
  expect(res.date).toBeInstanceOf(Date)
})