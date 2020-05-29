import {
	COMMUNITY_LIST
} from '../actionTypes';

//获取收藏列表
export function getCommunityList(communityList = []){
	return {
		type: COMMUNITY_LIST,
		communityList
	}
}



