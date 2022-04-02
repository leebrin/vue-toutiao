<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!--搜索结果-->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!--搜索结果-->

    <!--联想记忆-->
    <search-suggusstion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggusstion>
    <!--联想记忆-->

    <!--历史记录-->
    <search-history
      @search="onSearch"
      :searchHistories="searchHistories"
      v-else
    ></search-history>
    <!--历史记录-->
  </div>
</template>

<script>
import SearchSuggusstion from './components/search-suggession.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { getSearchHistory } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  components: { SearchSuggusstion, SearchHistory, SearchResult },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: [],
    }
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText

      //存储搜索记录
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(searchText)

      //存储到本地
      setItem('search-history', this.searchHistories)
      //显示搜索结果
      this.isResultShow = true
    },
    async loadSearchHistory() {
      //数据持久化
      const localHistory = getItem('search-history') || []
      if (this.user) {
        const { data } = await getSearchHistory()
        this.searchHistories = [
          ...new Set([...localHistory, ...data.data.keywords]),
        ]
      } else {
        this.searchHistories = localHistory
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadSearchHistory()
  },
}
</script>

<style></style>
