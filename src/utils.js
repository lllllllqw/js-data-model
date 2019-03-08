/**
 * @description: 对一个对象链式取值，如果没有这个值，返回 默认值 || undefined
 * @param {object} obj 对象
 * @param {string} selector 选择器
 * @param {any} defaltValue 默认值
 * @returns: {any}
 */
export function get(obj, selector, defaultValue) {
  if (selector === '') {
    return obj
  }

  try {
    const _keys = selector.split('.')
    return (
      _keys.reduce((val, nextKey) => {
        return val[nextKey]
      }, obj) || defaultValue
    )
  } catch (e) {
    return defaultValue
  }
}

export const isUndef = val => val === undefined
export const isNull = val => val === null
export const isNoVal = val => isUndef(val) || isNull(val)


export const getDefaultValue = (defaultValue) => {
  if(typeof defaultValue === 'function') {
    return defaultValue()
  }
  return defaultValue
}
