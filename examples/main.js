/** example */
const model = new JsDataModel.DataModel({
  arrayItem: {
    type: Array,
    // 定义数组内子类型
    subModel: {
      a: {
        type: Number,
      },
      b: {
        type: String,
        default: 'asd',
      },
    },
  },
  stringItem: {
    type: String,
    default: '',
  },
  numberItem: {
    parse: (val, { helperData }) => {
      console.log(helperData)
      return +val * 20
    },
  },
  item1: {
    fromKey: 'item2',
    type: String,
  },
  item2: {
    type: Number,
  },
})

const val = model.parse({
  xxx: 123,
  arrayItem: [{ a: '23' }, { a: false, b: '23' }],
  numberItem: true,
  item2: 2,
}, { vm: 'vue' })

console.log(val)
