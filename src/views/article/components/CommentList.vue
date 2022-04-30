<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
      ></comment-item>
      <!-- <van-cell
        v-for="(comment, index) in list"
        :key="index"
        :title="comment.content"
      /> -->
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment.js'
import CommentItem from './CommentItem.vue'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    type: {
      type: String,
      default: 'a',
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: { CommentItem },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getCommentList({
        type: this.type,
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit,
      })
      const { results } = data.data
      this.list.push(...results)
      //console.log(data)
      this.$emit('component-count', data.data.total_count)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
