# 简介
此项目是基于 Vue 组件化开发的在线电商 Web App (SPA)。

包括首页, 搜索列表, 商品详情, 购物车，用户登陆/注册, 订单, 支付, 个人中心等多个子模块。

# 功能点
- Header、Footer：复用。
- Home：菜单导航三级分类联动、商品轮播。
- Search：根据不同条件进行搜索、商品分页。
- Detail：放大镜浏览商品。
- ShopCart：购物车商品展示。
- Register：用户注册。
- Login：用户登录。
- Trade、Pay、PaySuccess：提交订单，微信支付。
- Center（MyOrder、GroupOrder……）：个人中心（我的订单、组团订单……）。
# 技术点
- Vue
- Vue Router：路由跳转、多级路由、路由元信息、导航守卫……
- Vuex：进行数据管理
- axios：与后端进行数据交互
- mockjs：模拟后台数据接口
- nprogress：网页加载进度条
- less@7：css 预处理
- lodash：防抖与节流
- swiper@5：轮播图
- iconfont：自定义图标
- sessionStorage、localStorage：本地存储
- element-ui：UI 组件库
- qrcode：二维码
- Vue-Lazyload：图片懒加载
- vee-validate@2：表单验证
# 目录设计
```
|-- public
  |-- ……
  |-- index.html
|-- src
  |-- api               ajax 请求
  |-- assets            静态资源
  |-- components        非路由组件
  |-- mock              模拟数据
  |-- plugins           插件相关
  |-- router            路由相关
  |-- store             vuex相关
  |-- utils             工具函数模块
  |-- views             路由组件
|-- APP.vue
|-- main.js
```