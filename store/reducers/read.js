import {
	AX_READ_LIST,
	AX_READ_LIST_USER,
	// AX_READ_ADD
} from "../actionTypes";

const read = (state = {axReadList: [], axReadListUser: []}, action) => {
	switch(action.type){
		case AX_READ_LIST:       //所有斧头阅读记录列表
			return Object.assign({}, state, { axReadList:  action.axReadList });
		case AX_READ_LIST_USER:   //用户阅读斧头记录列表
			return Object.assign({}, state, { axReadListUser:  action.axReadListUser });
		// case AX_READ_ADD:         //添加阅读记录
		// 	return Object.assign({}, state, { axReadListUser:  action.axReadListUser });
		default:
			return state;
	}
}

export default read;