<template>
  <div class="name">
    <van-nav-bar
      class="update-name"
      title="修改昵称"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="updateName"
    ></van-nav-bar>
    <div class="field-wrap">
      <van-field
        v-model="localName"
        autosize
        type="textarea"
        maxlength="6"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'Name',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.name,
    }
  },
  methods: {
    async updateName() {
      Toast.loading({
        message: '保存中',
        forbidClick: true,
      })
      try {
        await updateUserProfile({ name: this.localName })
        this.$emit('updateName', this.localName)
        this.$emit('close')
        Toast.success({ message: '修改成功' })
      } catch (error) {
        if (error && error.response && error.response.status === 409) {
          Toast.fail('昵称已存在')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.name {
  /deep/.van-nav-bar__content {
    background: #fff;
  }
  /deep/.van-nav-bar__title {
    color: #000;
  }
  .field-wrap {
    padding: 10px;
  }
}
</style>
