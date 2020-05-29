import {
	FOLLOWS,
	IS_FOLLOWED,
	FOLLOWS_REMOVE,
	FOLLOWS_LIST
} from "../actionTypes";

const userFollowed = (state = {isFollowed: false, focusUserList: []}, action) => {
	switch(action.type){
		case FOLLOWS:          //关注
			return Object.assign({}, state, { isFollowed:  action.isFollowed });
		case FOLLOWS_REMOVE:   //取消关注
			return Object.assign({}, state, { isFollowed:  action.isFollowed });
		case IS_FOLLOWED:       //是否关注
			return Object.assign({}, state, { isFollowed:  action.isFollowed });
		case FOLLOWS_LIST:       //关注列表
			return Object.assign({}, state, { focusUserList:  action.focusUserList });
		default:
			return state;
	}
}

export default userFollowed;