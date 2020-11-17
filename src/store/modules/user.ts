import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import store from '@/store'
import i18n from '@/lang'

export interface SRUserState {
  token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
  email: string;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements SRUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []
  public email = ''
  public mobile = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(role: string[]) {
    this.roles = role
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Mutation
  private SET_MOBILE(mobile: string) {
    this.mobile = mobile
  }

  @Action
  public async Login(userInfo: { username: string; password: string}) {
    let {username, password} = userInfo
    username = username.trim()
    const { data } = await login({ username, password })
    setToken(data.token)
    this.SET_TOKEN(data.token)
    this.GetUserInfo(this.token)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo(token: string) {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo({ token: token })
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { role, nickname, avatar, mobile } = data.result
    // roles must be a non-empty array
    if (!role || role.length <= 0) {
      throw Error('GetUserInfo: role must be a non-null array!')
    }
    this.SET_ROLES(role)
    this.SET_NAME(nickname)
    this.SET_AVATAR(avatar)
    this.SET_EMAIL(mobile)
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo(this.token)
    resetRouter()
    // Generate dynamic accessible routes based on role
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // Reset visited views and cached views
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
