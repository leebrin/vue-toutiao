<template>
  <div class="article-container">
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="article-content">
      <h1 class="title">{{ articleDetail.title }}</h1>
      <van-cell center class="user-info">
        <div class="name" slot="title">{{ articleDetail.aut_name }}</div>
        <van-image
          class="avatar"
          round
          :src="articleDetail.aut_photo"
          slot="icon"
        />
        <div class="pubtime" slot="label">
          {{ articleDetail.pubdate | relativeTime }}
        </div>
        <van-button
          class="flowbtn"
          :type="articleDetail.is_followed ? 'default' : 'info'"
          round
          size="small"
          :icon="articleDetail.is_followed ? '' : 'plus'"
          :loading="this.isFollowloading"
          @click="onFollow"
        >
          {{ articleDetail.is_followed ? '已关注' : '关注' }}
        </van-button>
      </van-cell>
      <div
        class="content markdown-body"
        v-html="articleDetail.content"
        ref="article-content"
      ></div>
      <comment-list
        :source="articleId"
        :list="commentList"
        @component-count="componentCount = $event"
      ></comment-list>
    </div>
    <div class="bottom-content">
      <van-button
        class="commentBtn"
        type="default"
        size="small"
        round
        @click="showComment = true"
      >
        写评论
      </van-button>
      <van-icon :badge="componentCount" name="comment-o" />
      <van-icon
        :class="this.articleDetail.is_collected ? 'star' : ''"
        :name="this.articleDetail.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :class="this.articleDetail.attitude !== 1 ? '' : 'good-job'"
        :name="this.articleDetail.attitude !== 1 ? 'good-job-o' : 'good-job'"
        @click="onLike"
      />
      <van-icon name="share" />
    </div>
    <!-- 评论弹出层 -->
    <van-popup v-model="showComment" position="bottom">
      <post-comment
        :target="articleId"
        @post-success="postSuccess"
      ></post-comment>
    </van-popup>
    <!-- /评论弹出层 -->

    <!-- 回复弹出层 -->
    <van-popup v-model="showReply" position="bottom">
      <comment-reply
        v-if="showReply"
        :comment="replyComment"
        :articleId="articleId"
        @close="showReply = false"
      ></comment-reply>
    </van-popup>
    <!-- /回复弹出层 -->
  </div>
</template>

<script>
import './markdown-css.css'
import CommentList from './components/CommentList.vue'
import PostComment from './components/PostComment.vue'
import CommentReply from './components/CommentReply.vue'
import {
  getArticleDetail,
  addFollow,
  cancelFollow,
  addCollect,
  deleteCollect,
  userLike,
  userCancelLike,
} from '@/api/user.js'
import { ImagePreview } from 'vant'
export default {
  name: 'Article',
  components: { CommentList, PostComment, CommentReply },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      articleDetail: [],
      isFollowloading: false,
      isCollectloading: false,
      isGoodloading: false,
      showComment: false,
      showReply: false,
      commentList: [],
      componentCount: 0,
      replyComment: {},
    }
  },
  created() {
    this.loadArticleDetail()
  },
  mounted() {
    this.$bus.$on('onReply', (comment) => {
      this.replyComment = comment
      this.showReply = true
    })
  },
  methods: {
    async loadArticleDetail() {
      const { data } = await getArticleDetail(this.articleId)
      //console.log(data)
      this.articleDetail = data.data

      //获取文章内容DOM容器
      const articleContent = this.$refs['article-content']
      //得到所有的img
      this.$nextTick(() => {
        const imgs = articleContent.querySelectorAll('img')
        //console.log(imgs)
        //循环img列表，给img注册点击事件
        const imgPaths = []
        imgs.forEach((img, index) => {
          imgPaths.push(img.src)
          img.onclick = function () {
            ImagePreview({
              images: imgPaths,
              startPosition: index,
            })
          }
        })
      })
      //在事件处理函数中调用ImagePreview()预览
    },
    async onFollow() {
      this.isFollowloading = true
      if (this.articleDetail.is_followed) {
        await cancelFollow(this.articleDetail.aut_id)
      } else {
        await addFollow(this.articleDetail.aut_id)
      }
      this.articleDetail.is_followed = !this.articleDetail.is_followed
      this.isFollowloading = false
    },
    async onCollect() {
      this.$toast.loading({
        message: '操作中···',
        forbidClick: true,
      })
      if (this.articleDetail.is_collected) {
        await deleteCollect(this.articleDetail.art_id)
      } else {
        await addCollect(this.articleDetail.art_id)
      }
      this.articleDetail.is_collected = !this.articleDetail.is_collected
      this.$toast.success({
        message: this.articleDetail.is_collected ? '收藏成功' : '已取消收藏',
      })
    },
    async onLike() {
      this.$toast.loading({
        message: '操作中···',
        forbidClick: true,
      })
      if (this.articleDetail.attitude === 1) {
        await userCancelLike(this.articleDetail.art_id)
        this.articleDetail.attitude = -1
      } else {
        await userLike(this.articleDetail.art_id)
        this.articleDetail.attitude = 1
      }
      this.$toast.success({
        message: this.articleDetail.attitude === 1 ? '点赞成功' : '已取消点赞',
      })
    },
    postSuccess(content) {
      this.commentList.unshift(content)
      this.componentCount++
      this.showComment = false
    },
  },
  computed: {},
  watch: {},
}
</script>

<style lang="less" scoped>
/deep/ .van-icon-arrow-left {
  color: #fff;
}
.article-container {
  .article-content {
    position: fixed;
    overflow-y: auto;
    top: 46px;
    bottom: 44px;
    left: 0;
    right: 0;
    .title {
      font-size: 20px;
      color: #3a3a3a;
      padding: 14px;
      background-color: #fff;
      margin: 0;
    }
    .user-info {
      .name {
        font-size: 12px;
        color: #333;
      }
      .pubtime {
        font-size: 11px;
        color: #b4b4b4;
      }
      .avatar {
        margin-right: 8px;
        width: 45px;
        height: 45px;
      }
      .flowbtn {
        width: 85px;
        height: 29px;
      }
    }
    .content {
      padding-top: 15px;
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
      width: 160px;
      height: 26px;
      border: 1px solid #dbdada;
      box-sizing: border-box;
      .van-button__text {
        color: #b4b4b4;
        font-size: 16px;
      }
    }
    .star {
      color: yellow;
    }
    .good-job {
      color: hotpink;
    }
  }
}
</style>
