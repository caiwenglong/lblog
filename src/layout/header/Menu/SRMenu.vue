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
      <li
        class="sr-menu__item"
        @click="handleOpenLoginPanel(true)">
        登录
      </li>
    </ul>
    <SRLogin
      :dialog-form-visible='dialogFormVisible'
      @isOpenLoginPanel='handleOpenLoginPanel'/>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import SRLogin from '@/views/login/SRLogin.vue'
@Component({
  name: 'SRMenu',
  components: {
    SRLogin
  }
})

export default class extends Vue {
  private dialogFormVisible = false // 是否显示登录框

  // 弹出登录框
  private handleOpenLoginPanel(flag: boolean) {
    this.dialogFormVisible = flag
  }
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
