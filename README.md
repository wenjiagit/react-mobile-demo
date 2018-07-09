# 移动端web架构

## 安装
```
$ yarn
```

## 启动
```
$ yarn start
```
浏览器访问：http://localhost:3000

## 生产构建
```
$ yarn build
```

## 相关准备

### Routes,
使用的是[react-router](https://reacttraining.com/react-router/web/guides/philosophy)

### less
需要先安装less依赖，style-loader css-loader 这两项依赖 css用
```
$ yarn add less-loader
```

## webpack配置
css/less/js/img/相关配置

开发与生产有不同的配置

## 开发时与后端联调接口

在package.json中编写proxy，指向后端接口
```
"proxy": {
    "/api": {
        "target": "http://localhost:5000"
    }
}
```

## antd-mobile
UI库使用的是[antd-mobile](https://mobile.ant.design/index-cn)

## 移动端适配解决方案
参考[这篇文章](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

第三方库，antd-mobile不应用适配方案

## 路由
使用[sx-route-config-grab-webpack-plugin](http://172.16.132.188:4873/-/iframe-readme/sx-route-config-grab-webpack-plugin) 插件，基于/src/pages目录结构自动生成对应的路由配置文件 ./src/page-route.js

## 库/组件整理
- [ ] url query string 高阶组件
- [ ] 获取地理位置
- [ ] 手机浏览器、手机类型判断
- [ ]
- [ ]

## TODO
- [x] create-react-app 初始化项目
- [x] 路由
- [x] 路由代码分割
- [x] less
- [x] css module
- [x] antd-mobile
- [ ] redux
- [ ] fast click
- [ ] rem
- [ ] ajax
- [ ] 前后端分离，代理
- [ ] nginx配置
- [ ] 1px border 的问题
- [ ] 第三方库，比如 ant-mobile 是否使用适配方案？

