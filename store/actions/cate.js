import {
	CATE_LIST
} from '../actionTypes';

//获取收藏列表
export function getCateList(cateList = []){
	return {
		type: CATE_LIST,
		cateList
	}
}



