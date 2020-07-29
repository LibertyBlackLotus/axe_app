import {
	AX,
	AX_LIST,
	AX_USER,
	AX_COMMUNITY,
	AX_USER_ADD,
	AX_SEARCH,
	AX_UPLOAD_TOKEN,
	AX_LIST_FOCUS_USER
} from '../actionTypes';

//获取所有斧头列表
export function getAxList(axList = [], allPage = 0){
	return {
		type: AX_LIST,
		axList,
		allPage
	}
}

//获取用户斧头列表
export function getAxListByUser(axListUser = [], userAxAllPage = 0){
	return {
		type: AX_USER,
		axListUser,
		userAxAllPage
	}
}

//获取关注用户斧头列表
export function getFocusUserAx(axListFocusUser = [], allPageFocusUser = 0){
	return {
		type: AX_LIST_FOCUS_USER,
		axListFocusUser,
		allPageFocusUser
	}
}

//获取社区斧头列表
export function getAxListByCommunity(axListCommunity = []){
	return {
		type: AX_COMMUNITY,
		axListCommunity
	}
}

//创建斧头
export function addAx(axListUser = []){
	return {
		type: AX_USER_ADD,
		axListUser
	}
}

//获取斧头
export function getAxDetail(axDetail = null){
	return {
		type: AX,
		axDetail
	}
}

//搜索斧头
export function searchAx(axListSearch = null){
	return {
		type: AX_SEARCH,
		axListSearch
	}
}


//获取七牛云上传凭证
export function getUploadToken(uploadToken = ''){
	return {
		type: AX_UPLOAD_TOKEN,
		uploadToken
	}
}




