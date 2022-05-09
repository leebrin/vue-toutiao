<template>
  <div id="app">
    <!--
      一级路由出口，路由表中所有的顶层路由都是一级路由
      keep-alive仅对该路由出口渲染的组件有效
    -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {},
  computed: {
    ...mapState(['cachePages']),
  },
}
</script>

<style></style>
