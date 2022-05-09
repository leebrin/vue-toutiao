<template>
  <div class="login">
    <van-nav-bar title="登录 / 注册" left-arrow @click-left="$router.back()" />
    <van-form
      :show-error="false"
      :show-error-message="false"
      :validate-first="true"
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        center
        v-model="user.mobile"
        icon-prefix="icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        center
        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
        class="van-field-button"
      >
        <template #button>
          <van-count-down
            v-if="isCountdownShow"
            class="countDown"
            :time="1000 * 6"
            format="ss秒后可发送"
            @finish="isCountdownShow = false"
          />
          <van-button
            v-else
            size="small"
            class="send-btn"
            :loading="isSendSmsLoading"
            type="primary"
            @click.prevent="sendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '',
        code: '',
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号！' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误！' },
        ],
        code: [
          { required: true, message: '请输入验证码！' },
          { pattern: /^\d{6}$/, message: '验证码格式错误！' },
        ],
      },
      isCountdownShow: false,
      isSendSmsLoading: false,
    }
  },
  methods: {
    async onLogin() {
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0,
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const { data } = await login(this.user)
        // 4.处理响应结果
        console.log(data)
        Toast.success('登录成功')

        //将后端返回的用户登录状态（token等数据）放到vuex容器中
        this.$store.commit('setUser', data.data)

        //清楚layout的缓存，让它重新渲染
        this.$store.commit('removeCachePage', 'Layout')

        //登录成功
        this.$router.push(this.$route.query.redirect || '/my')
        //console.log(res.config.data)
      } catch (error) {
        Toast.fail('登录失败,手机号或验证码错误')
        console.log('登录失败', error)
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({ message: error.errors[0].message, position: 'top' })
      }
      console.log('验证失败', error)
    },
    async sendSms() {
      try {
        //校验手机号码
        await this.$refs['login-form'].validate('mobile')

        //loading状态，防止网络慢用户多次点击触发发送行为
        this.isSendSmsLoading = true

        //验证通过 -> 请求发送验证码
        await sendSms(this.user.mobile)

        //发送验证码 -> 隐藏发送按钮，显示倒计时
        this.isCountdownShow = true

        //倒计时结束 -> 隐藏倒计时，显示发送按钮
      } catch (error) {
        let message = ''
        if (error && error.response && error.response.status === 429) {
          message = '点击过于频繁，请稍后重试！'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，请稍后重试！'
        }
        this.$toast({ message, position: top })
      }
      //
      this.isSendSmsLoading = false
      //校验手机号码
      //验证通过 -> 请求发送验证码 -> 用户接受短信 -> 输入验证码 -> 请求登录
      //请求发送验证码 -> 隐藏发送按钮，显示倒计时
      //倒计时结束 -> 隐藏倒计时，显示发送按钮
    },
  },
  computed: {},
  watch: {},
}
</script>

<style scoped lang="less">
.login {
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    font-size: 9px;
    color: #666666;
    border: none;
    border-radius: 8px;
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .login-btn__text {
        font-size: 15px;
      }
    }
  }
}
.countDown {
  display: inline-flex;
  text-align: center;
  align-items: center;
  font-size: 11px;
  color: #666666;
}
</style>
