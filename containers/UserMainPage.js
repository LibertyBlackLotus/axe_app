import { connect } from 'react-redux';
import http from '../store/server';
import {
	user,
	userFollows
} from '../store/actions';

import {
	API_FOLLOWS,
	API_USER,

} from '../store/apiUrl';

import UserMainPage from '../components/UserMainPage';

const mapStateToProps = (state) => {
	return {
		data: state.user.data,     //用户信息
		isFollowed: state.userFollows.isFollowed,  //是否关注
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取用户信息 */
		getUserInfo: (id) => {
			return http({url: API_USER + `/${id}`}).then(res => {
				dispatch(user.getUserInfo(res));
				return Promise.resolve(res);
			});
		},

		/* 关注 */
		followed: (data) => {
			http({method: 'POST', url: API_FOLLOWS, data}).then(res => {
				dispatch(userFollows.followed(res));
			});
		},

		/* 取消关注 */
		removeFollowed: (data) => {
			http({method: 'DELETE', url: API_FOLLOWS, data}).then(res => {
				dispatch(userFollows.removeFollowed(res));
			});
		},

		/* 是否关注 */
		isFollow: (data) => {
			http({method: 'POST', url: API_FOLLOWS + '/isFollowed', data}).then(res => {
				dispatch(userFollows.isFollow(res));
			});
		},


	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMainPage);
