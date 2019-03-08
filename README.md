## 这是啥
这是一个让表单转换稍微简单那么一点点的库~

## 有啥用
通过配置 model 的方式转换出一个可预期的 js 对象

## 啥时要
当你觉得数据转换写一堆 xxx.xxx 不好看, 不好写的时候

## 咋子用
- `script`标签引入
```js
new JsDataModel.DataModel(/** modelOptions */)
```
- `esModule`导入
```js
import {DataModel} from 'js-data-model'

new DataModel(/** modelOptions */) 
```