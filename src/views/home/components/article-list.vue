<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/user'
import ArticleItem from '@/components/article-item/'
export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [],
      finished: false,
      loading: false,
      timestamp: null,
      refreshLoading: false,
      successText: '',
    }
  },
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      const { data } = await getArticle({
        channel_id: this.channel.id,
        timestamp: this.timestamp || 1556789000001,
        with_top: 1,
      })
      //console.log(data)
      //将数据放到数组中
      const { results } = data.data
      this.articles.push(...results)
      //设置本次加载状态结束，才可以判断是否需要加载下一次，否则永远停在这里
      this.loading = false
      //判断数据是否全部加载完成
      if (results.length) {
        //利用上一次事件戳更新获取下一页数据
        this.timestamp = data.data.pre_timestamp
      } else {
        //全部数据加载完成，设置加载状态为结束
        this.finished = true
      }
    },
    async onRefresh() {
      const { data } = await getArticle({
        channel_id: this.channel.id,
        timestamp: Math.ceil(Math.random()) * 10 + this.timestamp++,
        with_top: 1,
      })

      const { results } = data.data
      this.articles.unshift(...results)

      this.successText = `更新了${results.length}条数据`
      this.refreshLoading = false
    },
  },
  created() {},
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow: auto;
}
</style>
>
