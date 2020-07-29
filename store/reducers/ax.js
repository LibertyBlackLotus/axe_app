import {
	AX,
	AX_LIST,
	AX_USER,
	AX_COMMUNITY,
	AX_USER_ADD,
	AX_SEARCH,
	AX_UPLOAD_TOKEN,
	AX_LIST_FOCUS_USER
} from "../actionTypes";

const user = (state = {axList: [], allPage: 0,
	axListCommunity: [], userAxAllPage: 0,
	axListFocusUser: [], allPageFocusUser: 0,
	axListUser: [], axListSearch: [], axDetail: null, uploadToken: ''}, action) => {
	switch (action.type) {
	case AX_LIST:      //所有斧头列表
		// return Object.assign({}, state, {axList: [...state.axList, ...action.axList], allPage: action.allPage});
		return Object.assign({}, state, {axList: action.axList, allPage: action.allPage});
	case AX_USER:      //用户斧头列表
		return Object.assign({}, state, {axListUser: action.axListUser,
			userAxAllPage: action.userAxAllPage});
	case AX_COMMUNITY: //社区斧头列表
		return Object.assign({}, state, {axListCommunity: action.axListCommunity});
	case AX_LIST_FOCUS_USER: //获取关注用户斧头列表
		return Object.assign({}, state, {axListFocusUser: action.axListFocusUser,
			allPageFocusUser: action.allPageFocusUser});
	case AX_USER_ADD:  //创建斧头
		return Object.assign({}, state, {axListUser: action.axListUser});
	case AX:           //获取斧头
		return Object.assign({}, state, {axDetail: action.axDetail});
	case AX_SEARCH:    //搜索斧头
		return Object.assign({}, state, {axListSearch: action.axListSearch});
	case AX_UPLOAD_TOKEN:    //获取七牛云上传凭证
		return Object.assign({}, state, {uploadToken: action.uploadToken});
	default:
		return state;
	}
}

export default user;