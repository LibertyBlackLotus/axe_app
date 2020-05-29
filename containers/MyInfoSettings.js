import { connect } from 'react-redux';
import http from '../store/server';
import {
	user
} from '../store/actions';

import {
	API_USER
} from '../store/apiUrl';

import MyInfoSettings from '../components/MyInfoSettings';

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 更换头像 */
		modifyUserInfo: (data) => {
			return http({method: 'PUT', url: API_USER  + `/${data._id}`, data}).then(res => {
				dispatch(user.modifyUserInfo(res));
				return Promise.resolve(res);
			});
		},

		/* 退出登录 */
		logout: () => {
			dispatch(user.logout());
		},

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoSettings);
