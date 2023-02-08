import { getPageListData } from '@/service/main/system/system'
import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './types'

const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            userList: [],
            userCount: 0,
            roleList: [],
            roleCount: 0,
            goodsList: [],
            goodsCount: 0,
        }
    },
    mutations: {
        changeUserList(state, userList: any[]) {
            state.userList = userList
        },
        changeUserCount(state, userCount: number) {
            state.userCount = userCount
        },
        changeRoleList(state, roleList: any[]) {
            state.roleList = roleList
        },
        changeRoleCount(state, roleCount: number) {
            state.roleCount = roleCount
        },
        changeGoodsList(state, goodsList: any[]) {
            state.goodsList = goodsList
        },
        changeGoodsCount(state, goodsCount: number) {
            state.goodsCount = goodsCount
        }
    },
    getters: {
        pageListData(state) {
            return (pageName: string) => {
                if (pageName === 'users') {
                    return state.userList
                } else if (pageName === 'role') {
                    return state.roleList
                } else if (pageName === 'goods') {
                    return state.goodsList
                }
            }
        },
        pageListCount(state) {
            return (pageName: string) => {
                if (pageName === 'users') {
                    return state.userCount
                } else if (pageName === 'role') {
                    return state.roleCount
                } else if (pageName === 'goods') {
                    return state.goodsCount
                }
            }
        }
    },
    actions: {
        async getPageListAction({ commit }, payload: any) {
            const pageName = payload.pageName
            const pageUrl = `${pageName}/list`
            const pageResult = await getPageListData(pageUrl, payload.queryInfo)
            const { list, totalCount } = pageResult.data
            if (pageName === 'users') {
                commit('changeUserList', list)
                commit('changeUserCount', totalCount)
            } else if (pageName === 'role') {
                commit('changeRoleList', list)
                commit('changeRoleCount', totalCount)
            } else if(pageName === 'goods') {
                commit('changeGoodsList', list)
                commit('changeGoodsCount', totalCount)
            }
        }
    }
}

export default systemModule