<template>
  <div class="user-chat">
    <van-nav-bar title="小V同学" left-arrow @click-left="$router.back()" />
    <van-cell-group class="message-wrap" ref="message-wrap">
      <van-cell
        v-for="(data, index) in messages"
        :title="data.msg"
        :key="index"
      ></van-cell>
    </van-cell-group>

    <van-cell-group class="input-wrap">
      <van-field
        v-model="message"
        :border="false"
        placeholder="请输入内容..."
      />
      <van-button type="primary" size="small" @click="onSend">
        发送
      </van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
// const socket = io('http://api-toutiao-web.itheima.net')
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'Userchat',
  components: {},
  props: {},
  data() {
    return {
      message: '',
      socket: null,
      messages: getItem('chat-message') || [],
    }
  },
  methods: {
    onSend() {
      const data = {
        msg: this.message,
        timestamp: Date.now(),
      }
      this.socket.emit('message', data)
      this.messages.push(data)
      this.message = ''
    },
    scrollBottom() {
      const list = this.$refs['message-wrap']
      list.scrollTop = list.scrollHeight
    },
  },
  computed: {},
  watch: {
    messages() {
      setItem('chat-message', this.messages)
      this.$nextTick(() => {
        this.scrollBottom()
      })
    },
  },
  created() {
    const socket = io('http://api-toutiao-web.itheima.net')
    this.socket = socket

    socket.on('connect', () => {
      console.log('建立连接成功')
    })

    socket.on('disconnect', () => {
      console.log('断开连接')
    })

    socket.on('message', (data) => {
      console.log(data)
      this.messages.push(data)
    })
  },
  mounted() {
    this.scrollBottom()
  },
}
</script>

<style lang="less" scoped>
.user-chat {
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
  .message-wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 64px;
    overflow-y: auto;
  }
  .input-wrap {
    display: flex;
    align-items: center;
    padding: 10px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .van-button {
      width: 50px;
    }
  }
}
</style>
