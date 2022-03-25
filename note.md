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
