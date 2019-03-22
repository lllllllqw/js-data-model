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

## 构造参数
### model
```ts
interface Model {
  [key: any]: Options
}

interface Options {
  type?: any
  subModel?: OptionsMap
  default?: any
  parser?: CustomParser
  fromKey?: string
}
```

参数 | 说明
--- | ---
type | parser 的类型, 可使用 `parserTypes.*`
subModel | model, 用来表示`object`或`array`下一层级的类型
default | 内置 parser 返回 `null` 或 `undefined` 时, 使用这个值返回, 如果返回一个对象需要是一个工厂函数
parser | 自定义 parser
fromKey | 初始值来源的 key, 默认是 model 的 key

## 实例方法
### parser
```ts
  type Parser = (val: any, model: Model, helperData?: any) => any
```

## 静态方法
### addParserTypes
```ts
addParserTypes(types: Record<string, any>): void
```
### addParser
```ts
addParser(type: any, parser: Parser): void
```
### use
```ts
use(plugin: DataModelPlugin, options?: any): void
```


## 内置 parser 转换规则
**val: 初始值**

### Number
初始值 | 转换结果
--- | ---
`null` | `undefined`
`undefined` | `undefined`
`string` | `val`
`number` | `Number(val)`
`object` | `NaN`
`array` | `NaN`

### String
初始值 | 转换结果
--- | ---
`null` | `undefined`
`undefined` | `undefined`
`string` | `String(val)`
`number` | `val`
`object` | `JSON.stringify(val)`
`array` | `JSON.stringify(val)`

### Boolean
初始值 | 转换结果
--- | ---
`null` | `false`
`undefined` | `false`
`''` | `false`
`string` | `true`
`0` | `false`
`number` | `true`
`object` | `true`
`array` | `true`
**本质是!val**

### Object
初始值 | 转换结果
--- | ---
`null` | `{}`
`undefined` | `{}`
`string'` | `{}`
`number` | `{}`
`object` | `浅克隆(val)`
`带有 subModel 的 object` | `{} as typeof subModel`
`array` | `{}`

### Array
初始值 | 转换结果
--- | ---
`null` | `[]`
`undefined` | `[]`
`string` | `[]`
`number` | `[]`
`object` | `[]`
`array` | `浅克隆(val)`
`带有 subModel 的 array` | `(typeof subModel)[]`

## TODO
- parserTypes.Array subModel 为 parserTypes 的值之一
- type 字段支持传入 DataModel 的实例
