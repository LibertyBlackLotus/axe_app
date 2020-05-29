import {
	COMMENT_LIST,
	COMMENT_ADD,
	COMMENT_REMOVE,
	COMMENT
} from "../actionTypes";

const comment = (state = {commentList: [], comment: {}}, action) => {
	switch(action.type){
		case COMMENT_ADD:      //添加评论
			return Object.assign({}, state, { commentList:  action.commentList });
		case COMMENT_REMOVE:   //删除评论
			return Object.assign({}, state, { commentList:  action.commentList });
		case COMMENT_LIST:       //评论列表
			return Object.assign({}, state, { commentList:  action.commentList });
		case COMMENT:       //评论详情
			return Object.assign({}, state, { comment:  action.comment });
		default:
			return state;
	}
}

export default comment;