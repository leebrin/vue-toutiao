<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell center class="base-info" :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <div class="name" slot="title">
          {{ userInfo.name }}
        </div>
        <van-button class="edit" slot="right-icon" round to="/user/profile">
          编辑资料
        </van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="count" slot="icon">{{ userInfo.art_count }}</div>
          <div class="text" slot="text">头条</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="count" slot="icon">{{ userInfo.follow_count }}</div>
          <div class="text" slot="text">关注</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="count" slot="icon">{{ userInfo.fans_count }}</div>
          <div class="text" slot="text">粉丝</div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="count" slot="icon">{{ userInfo.follow_count }}</div>
          <div class="text" slot="text">获赞</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="unlogin">
      <div @click="$router.push('/login')">
        <img class="mobile" src="./images/unlogin-img.png" alt="" srcset="" />
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <van-grid class="nav-grid" :column-num="2">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item
        class="nav-grid-item mb5"
        icon="browsing-history-o"
        text="历史"
      />
    </van-grid>
    <van-cell class="info-cell" title="消息通知" is-link to="/" />
    <van-cell class="chat-cell mb5" title="小智同学" is-link to="/" />
    <van-cell
      v-if="user"
      @click="onLogout"
      class="logout-cell"
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'My',
  components: {},
  props: {},
  data() {
    return {
      name: 'Lee',
      userInfo: {},
    }
  },
  methods: {
    onLogout() {
      //提示用户确认退出
      this.$dialog
        .confirm({
          title: '退出确认',
          message: '退出当前账号，将不能同步收藏、发布评论和分享等',
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadCurrentUser() {
      const { data } = await getCurrentUser()
      this.userInfo = data.data
    },
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadCurrentUser()
  },
}
</script>

<style lang="less" scoped>
.my-info {
  background: url('./images/banner.png') no-repeat;
  background-size: cover;
  .base-info {
    height: 115px;
    box-sizing: border-box;
    background: unset;
    padding-top: 38px;
    padding-bottom: 11px;
    .avatar {
      width: 66px;
      height: 66px;
      border: 1px solid #fff;
      margin-right: 16px;
      box-sizing: border-box;
    }
    .name {
      color: #fff;
      font-size: 20px;
    }
    .edit {
      height: 20px;
      color: #666;
    }
  }
  .data-info {
    .data-info-item {
      height: 65px;
      color: #fff;
      .count {
        font-size: 18px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
  /deep/ .van-grid-item__content {
    background: unset;
  }
}
.unlogin {
  height: 180px;
  background: url('./images/banner.png') no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mobile {
    width: 66px;
    height: 66px;
  }
  .text {
    color: #fff;
    font-size: 14px;
    margin-top: 5px;
  }
}
.nav-grid {
  /deep/ .nav-grid-item {
    height: 70px;
    .van-icon {
      font-size: 22px;
    }
    .van-icon-star-o {
      color: #eb5253;
    }
    .van-icon-browsing-history-o {
      color: #ff9d1b;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #333;
    }
  }
}
.info-cell {
  height: 60px;
  margin-bottom: 1px;
}
.chat-info {
  height: 60px;
}
.logout-cell {
  text-align: center;
  color: #d86262;
}
.mb5 {
  height: 60px;
  margin-bottom: 5px;
}
</style>
