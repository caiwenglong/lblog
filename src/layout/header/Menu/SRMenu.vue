<template>
  <div class="sr-menu">
    <ul class="sr-menu__list clearfix">
      <li
        class="sr-menu__item isActive"
        @click="redirectTo('article-list-category', {})">
        <span class="sr-menu-item__text">文章</span>
      </li>
      <li
        class="sr-menu__item"
        @click="redirectTo('article-writing', {})">
        <span class="sr-menu-item__text">写作</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'SRMenu'
})

export default class extends Vue {
}

</script>

<style lang="scss" scoped>
  .sr-menu {
    float: right;
  }
  .sr-menu__list {
    margin: 0;
    @include clearfix;
  }
  .sr-menu__item {
    float: left;
    padding: 0 12px;
    line-height: num2px(#{$headerHeight});
    position: relative;
    cursor: pointer;
    &:after {
      content: '';
      height: 2px;
      width: 0;
      position: absolute;
      left: 50%;
      bottom: 0;
      border-bottom: 2px solid $panBlue;
      transition: all .2s;
    }
    &.isActive:after,
    &:hover:after {
      width: 100%;
      left: 0;
    }
  }
  .sr-menu__item:hover:after {
    width: 100%;
    left: 0;
  }
</style>
