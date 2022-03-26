# 使用 vue-cli 创建项目

```npm
vue create vue-toutiao
```

- default:默认勾选 babel、eslint，回车后直接进入装包
- manualy：自定义勾选特性配置

Babel：es6 转 es5
Router：路由
Vuex：数据容器，存储共享数据
CSS Pre-processors：CSS 预处理器，选择 less、sass、stylus 等
Linter/Formatter：代码格式校验

```less-loader兼容
npm i less-loader@6
```

# 加入 Git 版本管理

# 移动端组件库 -- 使用 vant

```js
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
```

# 移动端 REM 适配

使用了淘宝的 lib-flexible 包以及 postcss-pxtorem

lib-flexible：设置 rem 基准值
postcss-pxtorem：将单位 px 转化为 rem

```shell
npm i amfe-flexible
npm i postcss-pxtorem@5 -D
```

// 注意：需在 main.js 中导入，自动设置 rem 基准值
import 'amfe-flexible'

配置 postcss.config.js

```js
// postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android>=4.0', 'iOS >= 8'],
    },
    'postcss-pxtorem': {
      // 根据设计稿的宽度来进行决定
      // 如果设计稿的设计宽度为375 则设为37.5
      // 如果设计稿的设计宽度为750 则设为75
      rootValue: 37.5,
      // 需要转换的CSS属性，* 就是所有属性都要转换
      propList: ['*'],
    },
  },
}
```

重启服务，这样就可以适配移动端了，所有的 px 都会自动转换为 rem

# iconfont 的详细引用

通过 fontclass 来进行使用

生成链接后，加载进项目即可。

引入后，使用需要注意两点：

- 第一 app.vue 上面要引入

- ```js
  import './styles/index.css'
  ```

- 第二 使用的时候记得加上前缀类名

- ```html
  <i class="iconfont icon-dianzan"></i>
  ```

# 配置路由页面

# 封装请求模块 -- axios

```npm
npm i axios
```

```js
import axios from 'axios'

axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000,
})

// 请求拦截器

// 相应拦截器

// 导出
export default request
```

## 登录注册

## 解决跨域问题

## 基于 Vant 的表单验证

1、使用 van-form 组件包裹所有的表单项 van-field
2、给 van-form 绑定 submit 事件，当表单提交的时候会触发 submit 事件
3、使用 Field 的 rules 属性定义校验规则

## 表单验证规则

```js
formRules: {
  mobile: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' },
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式错误' },
  ],
},
```

## 自定义错误提示信息

```js
//vant-form中
:show-error="false"
:show-error-message="false"

//自定义提示方法
onFailed(error) {
if (error.errors[0]) {
  this.$toast({ message: error.errors[0].message, position: 'top' })
}
console.log('验证失败', error)
},
```

## 发送验证码 处理过程

取消提交表单默认行为
@click.prevent="sendSms"

//校验手机号码
//验证通过 -> 请求发送验证码 -> 用户接受短信 -> 输入验证码 -> 请求登录
//请求发送验证码 -> 隐藏发送按钮，显示倒计时
//倒计时结束 -> 隐藏倒计时，显示发送按钮

## 本地存储封装模块

```js
export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    //尝试把data转为JavaScript对象
    return JSON.parse(data)
  } catch (err) {
    //data不是JSON格式字符串，直接原样返回
    return data
  }
}
```

1、为什么把 JSON.parse 放到 try-catch 中？
因为 data 可能不是 JSON 格式字符串

## 用户退出

可以给退出登录按钮绑定事件
通过 this.\$store.commit('setUser', null)将 vuex 里的 state 中的 user 清空（清除 token 数据），切换成未登录状态页面
