import {
	FOLLOWS,
	IS_FOLLOWED,
	FOLLOWS_REMOVE,
	FOLLOWS_LIST
} from '../actionTypes';

//关注
export function followed(isFollowed = false){
	return {
		type: FOLLOWS,
		isFollowed
	}
}

//取消关注
export function removeFollowed(isFollowed = false){
	return {
		type: FOLLOWS_REMOVE,
		isFollowed
	}
}

//是否关注
export function isFollow(isFollowed = false){
	return {
		type: IS_FOLLOWED,
		isFollowed
	}
}

//关注用户列表
export function getFocusList(focusUserList = []){
	return {
		type: FOLLOWS_LIST,
		focusUserList
	}
}




