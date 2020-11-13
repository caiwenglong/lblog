<template>
  <div class='sr-login'>
    <el-dialog title="登录" :visible.sync="dialogFormVisible" :before-close='handleBeforeClose'>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules">
        <el-form-item prop='username'>
          <el-input
            ref="username"
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
          <span class="svg-container">
<!--            <svg-icon name="password" />-->
          </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="$t('login.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span
              class="show-pwd"
              @click="showPwd"
            >
<!--            <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />-->
          </span>
          </el-form-item>
        </el-tooltip>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleOpenDialogForm(false)">取 消</el-button>
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Input } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { ElForm } from 'element-ui/types/form'
import { Dictionary } from 'vue-router/types/router'
import { isValidUsername } from '@/utils/validate'

@Component({
  name: 'SRLogin'
})

export default class extends Vue {
  @Prop({ default: false }) private dialogFormVisible!: boolean
  private passwordType = 'password'
  private capsTooltip = false
  private formLabelWidth = '120px'
  private loading = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('The password can not be less than 6 digits'))
    }
    if (!isValidUsername(value)) {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }

  private loginForm = {
    username: '',
    password: ''
  }

  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }

  // 显示登录面板
  private handleOpenDialogForm(flag: boolean) {
    this.$emit('isOpenLoginPanel', flag)
  }

  private handleBeforeClose() {
    this.$emit('isOpenLoginPanel', false)
  }

  private checkCapslock(e: KeyboardEvent) {
    const { key } = e
    this.capsTooltip = key !== null && key.length === 1 && (key >= 'A' && key <= 'Z')
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }

  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        this.loading = true
        await UserModule.Login(this.loginForm)
        this.$router.push({
          path: this.redirect || '/',
          query: this.otherQuery
        })
        // Just to simulate the time of the request
        setTimeout(() => {
          this.loading = false
          this.handleOpenDialogForm(false)
        }, 0.5 * 1000)
      } else {
        return false
      }
    })
  }

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
