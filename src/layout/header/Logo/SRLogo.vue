<template>
  <div class="sr-logo">
    logo
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SRLogo'
})

export default class extends Vue {
}

</script>

<style lang="scss" scoped>
  .sr-logo {
    float: left;
  }
</style>
