<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        plain
        type="danger"
        round
        size="mini"
        @click="isEdit = !isEdit"
      >
        频道编辑
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ onred: index === active }"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        :icon="isEdit && index !== 0 ? 'close' : ''"
        @click="onremove(index, channel)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in recommendChannels"
        :key="index"
        :text="value.name"
        @click="onadd(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllUserChannel, addUserChannel, delUserChannel } from '@/api/user'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      allUserChannel: [],
      isEdit: false,
    }
  },
  props: {
    userChannels: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  methods: {
    async loadAllChannel() {
      const { data } = await getAllUserChannel()
      const allChannels = data.data.channels
      this.allUserChannel.push(...allChannels)
    },
    async onadd(value) {
      this.userChannels.push(value)

      //数据持久化
      if (this.user) {
        await addUserChannel({
          channels: [{ id: value.id, seq: this.userChannels.length }],
        })
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    async onremove(index, channel) {
      if (this.isEdit && index !== 0) {
        if (index <= this.active) {
          this.$emit('onactive', this.active - 1)
        }
        this.userChannels.splice(index, 1)
      } else {
        this.$emit('onisEditShow')
        this.$emit('onactive', index)
      }

      //数据持久化
      if (this.user && this.isEdit) {
        await delUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      //思路：所有频道 - 我的频道 = 推荐频道
      //filter方法：过滤数据，根据方法返回的布尔值true来收集数据
      return this.allUserChannel.filter((allchannel) => {
        return !this.userChannels.find((userchannel) => {
          return userchannel.id === allchannel.id
        })
      })
    },
  },
  created() {
    this.loadAllChannel()
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .title {
    font-size: 16px;
    color: #333;
  }
  /deep/.grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 12px;
        color: #222;
        margin-top: 0;
      }
      .van-icon-close {
        font-size: 18px;
        position: absolute;
        top: -5px;
        right: -5px;
      }
    }
  }
  .onred {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
