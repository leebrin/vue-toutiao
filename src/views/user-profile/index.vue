<template>
  <div class="user-profile">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <input
      type="file"
      hidden
      accept="image/*"
      ref="file"
      @change="onFileChange"
    />
    <van-cell
      title="头像"
      is-link
      size="large"
      center
      @click="$refs.file.click()"
    >
      <van-image
        slot="default"
        width="30"
        height="30"
        round
        fit="cover"
        :src="user.photo"
      ></van-image>
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      size="large"
      @click="isEditName = true"
    />
    <van-cell
      title="性别"
      :value="(user.gender === 0 ? '男' : '女')"
      is-link
      size="large"
      @click="isEditSex = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      size="large"
      @click="isEditBirth = true"
    />

    <!--修改昵称-->
    <van-popup
      v-model="isEditName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <name
        @close="isEditName = false"
        @updateName="user.name = $event"
        :name="user.name"
        v-if="isEditName"
      ></name>
    </van-popup>
    <!--/修改昵称-->

    <!--修改性别-->
    <van-popup position="bottom" :style="{ height: '45%' }" v-model="isEditSex">
      <sex @close="isEditSex = false" v-model="user.gender"></sex>
    </van-popup>
    <!--/修改性别-->

    <!--修改生日-->
    <van-popup
      position="bottom"
      :style="{ height: '45%' }"
      v-model="isEditBirth"
    >
      <birth @close="isEditBirth = false" v-model="user.birthday"></birth>
    </van-popup>
    <!--/修改生日-->

    <!--修改头像-->
    <van-popup
      class="avatar-popup"
      position="bottom"
      :style="{ height: '100%' }"
      v-model="isEditPhoto"
    >
      <avatar
        v-if="isEditPhoto"
        @close="isEditPhoto = false"
        @update-photo="user.photo = $event"
        :file="imagePreview"
      ></avatar>
    </van-popup>
    <!--/修改头像-->
  </div>
</template>

<script>
import Name from './components/name.vue'
import Sex from './components/sex.vue'
import Birth from './components/birth.vue'
import Avatar from './components/avatar.vue'
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  components: { Name, Sex, Birth, Avatar },
  props: {},
  data() {
    return {
      user: {}, //用户数据
      isEditName: false,
      isEditSex: false,
      isEditBirth: false,
      isEditPhoto: false,
      imagePreview: null,
    }
  },
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile()
      //console.log(data)
      this.user = data.data
    },
    onFileChange() {
      this.isEditPhoto = true
      this.imagePreview = this.$refs.file.files[0]
      // this.imagePreview = window.URL.createObjectURL(this.$refs.file.files[0])
      //为了解决相同文件不触发change事件，清空file的value
      this.$refs.file.value = ''
    },
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
}
</script>

<style lang="less" scoped>
.user-profile {
  /deep/.van-icon-arrow-left {
    color: #fff;
  }
}
.avatar-popup {
  background-color: rgb(26, 25, 25);
}
</style>
