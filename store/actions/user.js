import {
	USER,
	REGISTER,
	LOGIN,
	LOGOUT,
	AX_READ_LIST,
	USER_INFO,
	USER_MODIFY
} from '../actionTypes';

export function getUserList(data = {}){
	return {
		type: USER,
		data
	}
}

//注册
export function register(data = {}){
	return {
		type: REGISTER,
		data
	}
}

//登录
export function login(data = {}){
	return {
		type: LOGIN,
		data
	}
}

//退出登录
export function logout(data = {}){
	return {
		type: LOGOUT,
		data
	}
}

//获取用户信息
export function getUserInfo(data = {}){
	return {
		type: USER_INFO,
		data
	}
}

//获取阅读记录
export function getReadList(readList = []){
	return {
		type: AX_READ_LIST,
		readList
	}
}

//修改用户信息
export function modifyUserInfo(data = {}){
	return {
		type: USER_MODIFY,
		data
	}
}





