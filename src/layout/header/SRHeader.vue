<template>
  <header class="header">
    <div class="header-content clearfix">
<!--      <SRLogo />-->
      <SRMenu />
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SRLogo from '@/layout/header/Logo/SRLogo.vue'
import SRMenu from '@/layout/header/Menu/SRMenu.vue'
@Component({
  name: 'SRHeader',
  components: {
    SRLogo,
    SRMenu
  }
})

export default class extends Vue {}
</script>

<style lang='scss' scoped>
  .header {
    border-bottom: 1px solid $lightGray;
  }
</style>
