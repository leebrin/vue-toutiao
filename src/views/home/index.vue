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
        to="/search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 用户频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" shrink>
      <van-tab v-for="data in userChannels" :title="data.name" :key="data.id">
        <!-- /文章列表 -->
        <article-list :channel="data"></article-list>
        <!-- /文章列表 -->
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" @click="isEditShow = true">
        <van-icon name="wap-nav" class="popup"></van-icon>
      </div>
    </van-tabs>
    <!-- /用户频道列表 -->

    <van-popup
      v-model="isEditShow"
      position="bottom"
      closeable
      get-container="body"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :userChannels="userChannels"
        :active="active"
        @onactive="onactive"
        @onisEditShow="onisEditShow"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user'
import { getItem } from '@/utils/storage'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      userChannels: [],
      isEditShow: false,
    }
  },
  methods: {
    async loadChannel() {
      let channels = []
      if (this.user) {
        //已登录，请求获取线上用户频道列表数据
        const { data } = await getUserChannel()
        channels = data.data.channels
      } else {
        //没有登录，判断是否有本地存储数据
        const localChannels = getItem('user-channels')
        //如果有则使用
        if (localChannels) {
          channels = localChannels
        } else {
          //没有则获取推荐数据
          const { data } = await getUserChannel()
          channels = data.data.channels
        }
      }
      this.userChannels = channels
    },
    onactive(index) {
      this.active = index
    },
    onisEditShow() {
      this.isEditShow = false
    },
  },
  created() {
    this.loadChannel()
  },
  computed: {
    ...mapState(['user']),
  },
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
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      width: 95px;
    }
    /deep/ .van-tabs__line {
      width: 20px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
  .popup {
    position: fixed;
    right: 0;
    height: 44px;
    width: 33px;
    line-height: 44px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    .van-icon {
      font-size: 30px;
    }
  }
  .placeholder {
    width: 33px;
    flex-shrink: 0;
  }
}
</style>
