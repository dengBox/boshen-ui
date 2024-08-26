# boshen-ui


## 国际化
1. 采用`ConfigProvider`模式进行全局配置
2. 采用复写`$t`函数，兼容`vue-i18n`
## 主题
1. 使用`css-var`结合`root`
2. 使用`css-in-js`
## 分包
1. 使用`tsx`开发 + `rollup`打包
2. 使用`monorepo`

## 自定义配置（配合ConfigProvider使用）

1. `size`
2. `prefixs`