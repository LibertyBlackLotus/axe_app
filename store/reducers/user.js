import {
	REGISTER,
	LOGIN,
	LOGOUT,
	USER_MODIFY,
	USER_INFO
} from "../actionTypes";

const user = (state = {data: {} }, action) => {
	switch(action.type){
		case REGISTER:      //注册
			return Object.assign({}, state, { data:  action.data });
		case LOGIN:         //登录
			return Object.assign({}, state, { data:  action.data });
		case LOGOUT:        //退出登录
			return Object.assign({}, state, { data:  action.data });
		case USER_INFO:     //获取信息
			return Object.assign({}, state, { data:  action.data });
		case USER_MODIFY:     //修改信息
			return Object.assign({}, state, { data:  action.data });
		default:
			return state;
	}
}

export default user;