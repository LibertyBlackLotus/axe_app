import { connect } from 'react-redux';
import http from '../store/server';
import { ax, praise, comment, collection }  from '../store/actions';

import {
	API_AX,
	API_AX_READ,
	API_PRAISE,
	API_COMMENT,
	API_COLLECT
} from '../store/apiUrl';

import AxDetail from '../components/AxDetail';

const mapStateToProps = (state) => {
	return {
		axDetail: state.ax.axDetail,            //斧头详情
		isPraised: state.praise.isPraised,      //是否点赞
		commentList: state.comment.commentList, //评论列表
		isCollected: state.collection.isCollected, //是否收藏
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取斧头详情 */
		getAxDetail: (id) => {
			http({url: API_AX + `/${id}`}).then(res => {
				dispatch(ax.getAxDetail(res));
			});
		},

		/* 添加阅读纪录 */
		addRead: (data) => {
			http({method: 'POST', url: API_AX_READ, data}).then(res => {

			});
		},

		/* 点赞 */
		praise: (data) => {
			http({method: 'POST', url: API_PRAISE, data}).then(res => {
				dispatch(praise.praise(res));
			});
		},

		/* 取消点赞 */
		removePraise: (data) => {
			http({method: 'DELETE', url: API_PRAISE, data}).then(res => {
				dispatch(praise.removePraise(res));
			});
		},

		/* 是否点赞 */
		isPraise: (data) => {
			http({method: 'POST', url: API_PRAISE + '/isPraise', data}).then(res => {
				dispatch(praise.isPraise(res));
			});
		},

		/* 添加评论 */
		addComment: (data) => {
			http({method: 'POST', url: API_COMMENT, data}).then(res => {
				dispatch(comment.addComment(res));
			});
		},

		/* 删除评论 */
		removeComment: (data) => {
			http({method: 'DELETE', url: API_COMMENT, data}).then(res => {
				dispatch(comment.removeComment(res));
			});
		},

		/* 获取评论列表 */
		getCommentList: (id) => {
			http({url: API_COMMENT + `/ax/${id}`}).then(res => {
				dispatch(comment.getCommentList(res));
			});
		},

		/* 收藏 */
		collect: (data) => {
			http({method: 'POST', url: API_COLLECT, data}).then(res => {
				dispatch(collection.collect(res));
			});
		},

		/* 取消收藏 */
		removeCollect: (data) => {
			http({method: 'DELETE', url: API_COLLECT, data}).then(res => {
				dispatch(collection.removeCollect(res));
			});
		},

		/* 是否收藏 */
		isCollect: (data) => {
			http({method: 'POST', url: API_COLLECT + '/isCollected', data}).then(res => {
				console.log('isCollect--res->', res);
				dispatch(collection.isCollect(res));
			});
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AxDetail);
