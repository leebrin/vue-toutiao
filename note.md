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

## /deep/解释

样式不起作用的时候用/deep/其实是一个样式作用域的问题。

默认我们的样式，是全局样式，如果不希望当前组件中的样式影响别的样式。

就可以添加一个作用域，也就是 style 里的 scoped

在有作用域的组件中如何给子组件设置样式？

默认只能作用到子组件的根节点：

- 使用子组件根节点本身的 class 类名
- 如果是第三方组件不知道它的根节点的类名，可审查元素查看，或增加一个类名，建议使用自己类名
- 深度作用操作符
  1、>>>(sass 之类的预处理器无法正确解析)
  2、也可使用::v-deep
  3、/deep/

```html
<div>
  <span></span>
</div>
```

可以让我们的样式作用的更深。因为我们增加的类名，优先级不一定有原本的子类高。本来我们的类名只能作用到根节点(div)，通过这个操作符可以让样式作用到 span 这些节点上。

## 关于第三方图片资源 403 问题

第三方平台处理图片资源保护：referer
服务端一般使用 referer 请求头识别访问资源，然后处理访问资源

referer 是 http 请求头的一部分，浏览器向 web 服务器发送请求的时候一般会带上 referer

解决方法：不发送 referer 如何设置？

- 1、<img> <a> <area> <ifram> <script>加上 referrerpolicy 属性，设置为 no-referrer
- 2、直接在 html 页面中通过 meta 属性全局配置 <meta name='referrer' content='no-referrer' />

## day.js 处理相对时间 =>2kb

npm i dayjs --save

```js
// 封装dayjs库
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.extend(relativeTime)

// 使用中文语言包
dayjs.locale('zh-cn')

Vue.filter('xianduiTime', (value) => {
  return dayjs(value).from(dayjs())
})
```

先初始化，把处理相对时间的代码，封装为全局过滤器、

就可以在项目中进行使用了。

记得要在 main.js 中引用

```js
import '@/utils/dayjs'
```

## 在组件中获取动态路由参数

```js
方式一：this.$router.params.xxx
方式二：props 传参（推荐） --> router 里设置 props 为 true
```

## 图片预览 使用 ImagePreview

需单独引用：import { ImagePreview } from 'vant'

```js
ImagePreview(['http://img.yzcdn.cn/vant'])
```

## 组件上使用 v-model

当传递给子组件的数据既要使用又要修改，可以使用 v-model 简写

v-model='user.name'
相当于=>
默认传递一个名字叫 value 的数据
:value='user.name'
默认监听一个 input 事件
@input='user.name=\$event'

子组件中 props 声明一个 value 接受

## 关于属性绑定的 sync 修饰符

多个数据需要保持同步
:gender.sync='user.gender' =>
:gender='user.gender'
@update:gender='user.gender = \$event'

## 在弹出层里面预览图片

<input type='file' />
const blob = window.URL.createObjectURL(this.\$refs.file.files[0])

## Content-Type

如果要求 Content-Type 时 multipart/form-data,则一定要提交 FormData 数据对象，专门用于文件上传

```js
const fd = new FormData() fd.append('photo', this.file)
```

## 头像裁切

awesome-vue => vue-croppa

cropperjs

npm install cropperjs

```js
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
```

```js
mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: true,
      cropBoxResizable: true,
      background: false,
      movable: true,
    })
  },
```

```js
getCroppedCanvas(){
    return new Promise(resolve=>{
        this.cropper.getCroppedCanvas().toBlob((blob)=>{
            resolve(blob)
        })
    })
},
```

封装到 promise 中，这个可以获取到裁剪后的文件数据。

## Websocket

服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，双向平等对话
属于服务器推送技术的一种
