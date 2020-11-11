<template>
  <div class="page-sr-blog">
    <div class="page-header">
      <SRHeader />
    </div>
    <div class="page-body">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import SRHeader from '@/layout/header/SRHeader.vue'
@Component({
  name: 'Layout',
  components: {
    SRHeader
  }
})

export default class extends Vue {
}

</script>

<style lang="scss" scoped>
  .page-sr-blog {
    height: 100%;
  }
  .page-header {
    height: num2px($headerHeight);
  }
  .page-body {
    $height: num2px(#{$headerHeight});
    height: calc(100% - #{$height});
  }
</style>
