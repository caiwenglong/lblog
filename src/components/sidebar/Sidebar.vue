<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import SidebarItem from '@/components/sidebar/SidebarItem.vue'

@Component({
  name: 'Sidebar',
  components: {
    SidebarItem
  }
})

export default class extends Vue {
  get routes() {
    return this.$router.options.routes
  }

  get isCollapse() {
    return false
  }
}

</script>

<style lang="scss" scoped>
</style>
