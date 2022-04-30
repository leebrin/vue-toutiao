<template>
  <div class="sex">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="this.defaultIndex"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'Sex',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value,
    }
  },
  methods: {
    onChange(picker, value, index) {
      console.log(picker)
      console.log(value)
      this.defaultIndex = index
    },
    async onConfirm() {
      Toast.loading({
        message: '保存中',
        forbidClick: true,
      })
      try {
        await updateUserProfile({ gender: this.defaultIndex })
        this.$emit('input', this.defaultIndex)
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

<style></style>
