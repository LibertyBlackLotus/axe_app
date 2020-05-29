import {
	COMMUNITY_LIST
} from "../actionTypes";

const community = (state = {communityList: []}, action) => {
	switch(action.type){
		case COMMUNITY_LIST:     //社区列表
			return Object.assign({}, state, { communityList:  action.communityList });
		default:
			return state;
	}
}

export default community;