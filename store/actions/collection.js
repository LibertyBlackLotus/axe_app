import {
	COLLECT,
	COLLECT_REMOVE,
	IS_COLLECT,
	COLLECT_LIST
} from '../actionTypes';

//获取收藏列表
export function getCollection(collectionList = []){
	return {
		type: COLLECT_LIST,
		collectionList
	}
}

//收藏
export function collect(isCollected = false){
	return {
		type: COLLECT,
		isCollected
	}
}

//取消收藏
export function removeCollect(isCollected = false){
	return {
		type: COLLECT_REMOVE,
		isCollected
	}
}

//是否收藏
export function isCollect(isCollected = false){
	return {
		type: IS_COLLECT,
		isCollected
	}
}



