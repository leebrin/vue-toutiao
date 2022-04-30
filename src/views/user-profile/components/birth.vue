<template>
  <div class="birth">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { updateUserProfile } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'Birth',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(this.value),
      localDate: '',
    }
  },
  methods: {
    async onConfirm(value) {
      this.localDate = dayjs(value).format('YYYY-MM-DD')
      console.log(this.localDate)

      Toast.loading({
        message: '保存中',
        forbidClick: true,
      })

      await updateUserProfile({ birthday: this.localDate })
      this.$emit('input', this.localDate)
      this.$emit('close')
      Toast.success({ message: '修改成功' })
    },
  },
}
</script>

<style></style>
