import { Module } from 'vuex'

import {
  accountLoginRequest,
  userInfoRequest,
  userMenusRequest,
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'

import { IAcount } from '@/service/login/types'
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAcount) {
      //登录并存储token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // console.log(loginResult)

      //获取用户信息并存储
      const userInfoResult = await userInfoRequest(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //获取用户菜单并存储
      const userMenusResult = await userMenusRequest(id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //跳转首页
      router.push('/main')
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // },
    loadLocalLogin({ commit }, payload: any) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
  },
}

export default loginModule
