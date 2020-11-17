import Vue from 'vue'
import Vuex from 'vuex'
import { SRUserState } from './modules/user'
import { SRArticles } from '@/store/modules/articles'

Vue.use(Vuex)

export interface SRRootState {
  user: SRUserState,
  article: SRArticles
}

export default new Vuex.Store<SRRootState>({})
