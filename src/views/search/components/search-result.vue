<template>
  <div class="result-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      pre_page: 10,
    }
  },
  methods: {
    async onLoad() {
      //1、请求获取数据
      const { data } = await getSearchResult({
        page: this.page,
        pre_page: this.pre_page,
        q: this.searchText,
      })

      //2、将数据放到数据列表中
      const result = data.data.results
      this.list.push(...result)
      //3、关闭本次的loading
      this.loading = false
      //4、判断是否还有数据
      //   如果有，则更新获取下一页的数据
      //   如果没有，则把finished设置为true，关闭加载更多
      if (result) {
        this.page++
      } else {
        this.finished = true
      }
    },
  },
  computed: {},
  watch: {},
}
</script>

<style lang="less" scoped>
.result-container {
  .van-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 54px;
    overflow: auto;
  }
}
</style>
>
