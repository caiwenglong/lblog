<template>
  <div class="sr-menu">
    <ul class="sr-menu__list clearfix">
      <li
        class="sr-menu__item isActive"
        @click="redirectTo('article-list', {})">
        <span class="sr-menu-item__text">文章</span>
      </li>
      <li
        v-if='isLogin'
        class="sr-menu__item"
        @click="redirectTo('article-writing', {})">
        <span class="sr-menu-item__text">写作</span>
      </li>
      <li
        v-if='!isLogin'
        class="sr-menu__item"
        @click="handleOpenLoginPanel(true)">
        登录
      </li>
      <li
        v-if='isLogin'
        class="sr-menu__item sr-user"
        @click="handleOpenLoginPanel(true)">
        <span class='sr-user__avatar'>{{username}}</span>
        <span class='sr-user__name'>{{avatar}}</span>
      </li>
    </ul>
    <SRLogin
      :dialog-form-visible='dialogFormVisible'
      @emitOpenLoginPanel='handleOpenLoginPanel'/>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import SRLogin from '@/views/login/SRLogin.vue'
import { UserModule } from '@/store/modules/user'
import { Dictionary } from 'vue-router/types/router'

@Component({
  name: 'SRMenu',
  components: {
    SRLogin
  }
})

export default class extends Vue {
  private dialogFormVisible = false // 是否显示登录框
  private isLogin = false
  get username() {
    return UserModule.name
  }

  get avatar() {
    return UserModule.avatar
  }

  // 弹出登录框
  private handleOpenLoginPanel(flag: boolean) {
    this.dialogFormVisible = flag
  }

  private redirectTo(name: string, params: Dictionary<string>) {
    this.$router.push({ name: name, params: params })
  }

  private async initData() {
    if (UserModule.token) {
      await UserModule.GetUserInfo(UserModule.token)
      this.isLogin = true
    }
  }

  created() {
    this.initData()
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
