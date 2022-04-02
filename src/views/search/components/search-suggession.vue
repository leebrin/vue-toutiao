<template>
  <div class="suggession-container">
    <van-cell
      icon="search"
      v-for="(item, index) in searchData"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggessions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggusstion',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      searchData: [],
    }
  },
  methods: {
    highlight(str) {
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color:red">${this.searchText}</span>`,
      )
    },
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggessions(this.searchText)
        this.searchData = data.data.options
      }, 200),
      immediate: true,
    },
  },
}
</script>

<style></style>
