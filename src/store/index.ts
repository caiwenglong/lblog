import Vue from 'vue'
import Vuex from 'vuex'
import { SRUserState } from './modules/user'

Vue.use(Vuex)

export interface SRRootState {
  user: SRUserState
}

export default new Vuex.Store<SRRootState>({})
