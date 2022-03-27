<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar>
      <van-button
        class="search-btn"
        slot="title"
        round
        icon="search"
        type="info"
        size="small"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 用户频道列表 -->
    <van-tabs v-model="active" border>
      <van-tab v-for="data in userChannels" :title="data.name" :key="data.id">
        <!-- /文章列表 -->
        <article-list :channel="data"></article-list>
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
    <!-- /用户频道列表 -->
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  name: 'Home',
  components: { ArticleList },
  props: {},
  data() {
    return {
      active: 0,
      userChannels: [],
    }
  },
  methods: {
    async loadChannel() {
      const { data } = await getUserChannel()
      this.userChannels = data.data.channels
    },
  },
  created() {
    this.loadChannel()
  },
  computed: {},
  watch: {},
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon-search {
      color: #fff;
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
