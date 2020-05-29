import {
	COMMENT_LIST,
	COMMENT_ADD,
	COMMENT_REMOVE,
	COMMENT
} from '../actionTypes';

//添加评论
export function addComment(commentList = []){
	return {
		type: COMMENT_ADD,
		commentList
	}
}

//删除评论
export function removeComment(commentList = []){
	return {
		type: COMMENT_REMOVE,
		commentList
	}
}

//评论列表
export function getCommentList(commentList = []){
	return {
		type: COMMENT_LIST,
		commentList
	}
}

//评论详情
export function getComment(comment = {}){
	return {
		type: COMMENT,
		comment
	}
}


