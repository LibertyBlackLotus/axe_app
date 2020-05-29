import {
	AX,
	AX_LIST,
	AX_USER,
	AX_COMMUNITY,
	AX_USER_ADD,
	AX_SEARCH
} from '../actionTypes';

//获取所有斧头列表
export function getAxList(axList = []){
	return {
		type: AX_LIST,
		axList
	}
}

//获取用户斧头列表
export function getAxListByUser(axListUser = []){
	return {
		type: AX_USER,
		axListUser
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




