<template>
  <div class="history-container">
    <van-cell title="搜索历史">
      <div class="icon" v-if="isDel">
        <span @click="allDel">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDel = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDel = !isDel"></van-icon>
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in historises"
      :key="index"
      @click="delHistory(history, index)"
    >
      <van-icon name="close" v-if="isDel"></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { setItem, getItem, removeItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      isDel: false,
      historises: this.searchHistories,
    }
  },
  methods: {
    delHistory(history, index) {
      if (this.isDel === true) {
        this.historises.splice(index, 1)
        setItem('search-history', this.historises)
        getItem('search-history')
      } else {
        this.$emit('search', history)
      }
    },
    allDel() {
      removeItem('search-history')
      this.historises = getItem('search-history')
    },
  },
  computed: {},
  watch: {},
}
</script>

<style lang="less" scoped>
.history-container {
  position: fixed;
  top: 54px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  .van-cell__title:first {
    flex: unset;
    width: 200px;
  }
  .van-cell__value {
    flex: unset;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
