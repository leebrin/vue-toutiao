<template>
  <div class="avatar">
    <div><img :src="imagePre" class="image" ref="image" /></div>
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'Avatar',
  props: {
    file: {
      required: true,
    },
  },
  data() {
    return {
      imagePre: window.URL.createObjectURL(this.file),
      cropper: null,
    }
  },
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      await updateUserPhoto(fd)

      this.$toast.success({
        message: '保存成功',
      })

      this.$emit('update-photo', window.URL.createObjectURL(file))
      this.$emit('close')
    },
  },
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
}
</script>

<style lang="less" scoped>
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /deep/.van-nav-bar__content {
    background-color: rgb(26, 25, 25);
  }
  /deep/.van-nav-bar__text {
    color: #fff;
  }
}
.image {
  display: block;
  max-width: 100%;
}
</style>
