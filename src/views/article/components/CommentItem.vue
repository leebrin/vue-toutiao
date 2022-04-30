<template>
  <van-cell class="comment-item">
    <van-image
      class="touxiang"
      slot="icon"
      round
      fit="cover"
      :src="comment.aut_photo"
    ></van-image>
    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div @click="onCommentLike()">
          <van-icon
            class="like-icon"
            :class="{ liked: comment.is_liking }"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          ></van-icon>
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>

      <div class="content">{{ comment.content }}</div>
      <div class="bottom-wrap">
        <span class="pubdate">
          {{ comment.pubdate | datetime('MM-DD HH:mm') }}
        </span>
        <van-button class="reply-btn" round size="mini" @click="onReply">
          {{ comment.reply_count }}回复
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { likeComment, delikeComment } from '@/api/comment.js'
import _ from 'lodash'
export default {
  name: 'CommentItem',
  data() {
    return {}
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onCommentLike: _.debounce(async function () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await delikeComment(commentId)
        this.comment.like_count--
      } else {
        await likeComment(commentId)
        this.comment.like_count++
      }
      //更新视图
      this.comment.is_liking = !this.comment.is_liking
    }, 500),
    // async onCommentLike() {
    //   const commentId = this.comment.com_id.toString()
    //   if (this.comment.is_liking) {
    //     await delikeComment(commentId)
    //     this.comment.like_count--
    //   } else {
    //     await likeComment(commentId)
    //     this.comment.like_count++
    //   }
    //   //更新视图
    //   this.comment.is_liking = !this.comment.is_liking
    // },
    onReply() {
      this.$bus.$emit('onReply', this.comment)
    },
  },
}
</script>

<style lang="less" scoped>
.comment-item {
  .touxiang {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 16px;
    color: #222;
  }
  .bottom-wrap {
    display: flex;
    align-items: center;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 15px;
  }
  .reply-btn {
    width: 56px;
    height: 24px;
    /deep/ .button__text {
      font-size: 10px;
    }
  }
  .like-icon.liked {
    color: red;
  }
}
</style>
