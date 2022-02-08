# 简介
此项目为在线电商Web App (SPA)。

包括首页, 搜索列表, 商品详情, 购物车, 订单, 支付, 用户登陆/注册等多个子模块。
# 技术点
- Vue
- Vue Router：路由开发单页面应用
- Vuex：管理应用组件状态
- axios：与后端进行数据交互
- mockjs：模拟后台数据接口
- less@7：css 预处理
- nprogress：网页加载进度条
- lodash：防抖与节流
- swiper@5：轮播图
- iconfont：自定义图标
- element-ui：UI 组件库
- qrcode：二维码
# 目录设计
```
|-- src
  |-- api               ajax 请求
  |-- components        非路由组件
  |-- mock              模拟数据
  |-- router            路由相关
  |-- store             vuex相关
  |-- utils             工具函数模块
  |-- views             路由组件
|-- APP.vue
|-- main.js
```
## 路由
首页：/home

商品搜索页：/search

商品详情：/detail

加入购物车成功页面：/addCartsuccess

购物车：/shopCart

支付页面：/pay

支付成功页面：/paySuccess

个人中心：
- /center
- /center/myOrder
- /center/groupOrder

