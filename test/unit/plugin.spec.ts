import { DataModel, parserTypes } from '../../src/index'
import DatePlugin from '../../src/plugins/date'

test('转换为 String', () => {
  DataModel.use(DatePlugin)
  const stringModel = new DataModel({
    date: {
      type: parserTypes.Date,
    },
  })

  const res = stringModel.parse({
    date: +new Date(),
  })
  expect(res.date).toBeInstanceOf(Date)
})