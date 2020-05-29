import {
	COLLECT,
	COLLECT_REMOVE,
	IS_COLLECT,
	COLLECT_LIST
} from "../actionTypes";

const collection = (state = {isCollected: false, collectionList: []}, action) => {
	switch(action.type){
		case COLLECT_LIST:     //收藏列表
			return Object.assign({}, state, { collectionList:  action.collectionList });
		case COLLECT:          //收藏
			return Object.assign({}, state, { isCollected:  action.isCollected });
		case COLLECT_REMOVE:   //取消收藏
			return Object.assign({}, state, { isCollected:  action.isCollected });
		case IS_COLLECT:       //是否收藏
			return Object.assign({}, state, { isCollected:  action.isCollected });
		default:
			return state;
	}
}

export default collection;