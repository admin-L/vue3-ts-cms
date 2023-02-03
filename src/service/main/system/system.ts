import IRequest from '../../index'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
    return IRequest.post<IDataType>({
        url,
        data: queryInfo
    })
}