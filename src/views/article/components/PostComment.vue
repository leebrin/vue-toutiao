<template>
  <div class="post-comment">
    <van-field
      v-model="message"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论..."
      show-word-limit
    ></van-field>
    <van-button
      class="sentBtn"
      size="mini"
      @click="onPost"
      :disabled="!message"
    >
      发布
    </van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'PostComment',
  data() {
    return {
      message: '',
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  methods: {
    async onPost() {
      const { data } = await addComment({
        target: this.target,
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null,
      })
      console.log(data)
      this.$emit('post-success', {
        idObj: data.data,
        content: this.message,
      })
      this.message = ''
    },
  },
}
</script>

<style lang="less" scoped>
.post-comment {
  padding: 10px;
  display: flex;
  align-items: center;
  .sentBtn {
    width: 75px;
  }
}
</style>
