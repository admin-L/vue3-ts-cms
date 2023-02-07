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
            state.userCount = roleCount
        }
    },
    getters: {
        pageListData(state) {
            return (pageName: string) => {
                if (pageName === 'users') {
                    return state.userList
                } else if (pageName === 'role') {
                    return state.roleList
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
            }
        }
    }
}

export default systemModule