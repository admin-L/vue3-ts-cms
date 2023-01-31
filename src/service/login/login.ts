import IRequest from '../index'
import { IAcount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/',
}

export function accountLoginRequest(account: IAcount) {
  return IRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  })
}

export function userInfoRequest(id: number) {
  return IRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  })
}

export function userMenusRequest(id: number) {
  return IRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false,
  })
}
