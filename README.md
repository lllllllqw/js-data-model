## 这是啥
这是一个让表单转换稍微简单那么一点点的库~

## 有啥用
通过配置 model 的方式转换出一个可预期的 js 对象

## 啥时要
当你觉得数据转换写一堆 `if else || switch case` 不好看, 不好写的时候

## 咋子用
- `script`标签引入
```js
const {DataModel, parserTypes} = JsDataModel
const model = new DataModel(/** modelOptions */)

model.parse({}) // modelOptions -> an Object formated with model
```
- `esModule`导入
```js
import {DataModel, parserTypes} from 'js-data-model'

const model = new DataModel(
  aKey: {
    type: parserTypes.Number,
    default: 1
  }
) 

model.parse({}) // modelOptions -> an Object formated with model
```

更多例子可参考`test/*`

## TODO
- 详细文档