import { connect } from 'react-redux';
import http from '../store/server';
import { user } from '../store/actions';

import {
	API_USER
} from '../store/apiUrl';

import LoginOther from '../components/LoginOther';

const mapStateToProps = (state) => {
	return {
		data: state.user.data,     //用户信息
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 登录 */
		login: (data) => {
			return http({method: 'POST', url: API_USER + '/login', data}).then(res => {
				dispatch(user.login(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOther);
