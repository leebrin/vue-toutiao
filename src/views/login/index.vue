<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="smile-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="music-o"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-button type="info" block>登录 / 注册</van-button>
  </div>
</template>

<script>
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
    }
  },
  methods: {},
  computed: {},
  watch: {},
}
</script>

<style></style>
