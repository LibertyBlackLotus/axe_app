import {
	CATE_LIST
} from "../actionTypes";

const cate = (state = {cateList: []}, action) => {
	switch(action.type){
		case CATE_LIST:     //分类列表
			return Object.assign({}, state, { cateList:  action.cateList });
		default:
			return state;
	}
}

export default cate;