<template>
  <div class="comment-reply">
    <van-nav-bar class="nav" :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <comment-item :comment="comment"></comment-item>
    <comment-list
      :source="comment.com_id"
      type="c"
      :list="commentList"
    ></comment-list>
    <!--底部评论-->
    <div class="bottom-content">
      <van-button
        class="commentBtn"
        type="default"
        size="small"
        round
        @click="showReply = true"
      >
        写评论
      </van-button>
    </div>
    <!--/底部评论-->

    <!-- 评论弹出层 -->
    <van-popup v-model="showReply" position="bottom">
      <post-comment
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="postSuccess"
      ></post-comment>
    </van-popup>
    <!-- /评论弹出层 -->
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import CommentList from './CommentList.vue'
import PostComment from './PostComment.vue'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  components: { CommentItem, CommentList, PostComment },
  data() {
    return {
      showReply: false,
      commentList: [],
      componentCount: 0,
    }
  },
  methods: {
    postSuccess(content) {
      this.commentList.unshift(content)
      this.comment.reply_count++
      this.showReply = false
    },
  },
}
</script>

<style lang="less" scoped>
.comment-reply {
  /deep/.van-nav-bar__content {
    background-color: #fff;
  }
  /deep/.van-nav-bar__title {
    color: #000;
  }
  /deep/.van-icon {
    color: #000;
  }
}
.bottom-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  height: 44px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .commentBtn {
    width: 200px;
    height: 32px;
    border: 1px solid #dbdada;
    box-sizing: border-box;
    .van-button__text {
      color: #b4b4b4;
      font-size: 16px;
    }
  }
}
</style>
