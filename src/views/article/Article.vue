<template>
  <div class='wgt-article'>
    <div class='wgt-article__sidebar'>
      <sidebar />
    </div>
    <div class='wgt-article__content'>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import Sidebar from '@/components/sidebar/Sidebar.vue'

@Component({
  name: 'Article',
  components: {
    Sidebar
  }
})

export default class extends Vue {
}

</script>

<style lang="scss" scoped>
  .wgt-article {
    height: 100%;
    position: relative;
  }
  .wgt-article__sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: num2px(#{$sidebarWidth});
    height: 100%;
    border: 1px solid $lightGray;
  }
  .wgt-article__content {
    height: 100%;
    margin-left: num2px(#{$sidebarWidth});
  }

  ::v-deep {
    .wgt-article__sidebar .el-menu {
      border: none;
    }
  }
</style>
