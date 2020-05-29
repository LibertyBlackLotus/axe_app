import {
	AX_READ_LIST,
	AX_READ_LIST_USER,
} from '../actionTypes';

//斧头阅读记录列表
export function getAxReadList(axReadList = []){
	return {
		type: AX_READ_LIST,
		axReadList
	}
}

//获取用户阅读斧头记录列表
export function getAxReadListByUser(axReadListUser = []){
	return {
		type: AX_READ_LIST_USER,
		axReadListUser
	}
}

//添加阅读记录
// export function addRead(axReadListUser = []){
// 	return {
// 		type: AX_READ_ADD,
// 		axReadListUser
// 	}
// }



