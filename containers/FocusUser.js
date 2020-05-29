import { connect } from 'react-redux';
import http from '../store/server';
import {
	userFollows
} from '../store/actions';

import {
	API_FOLLOWS
} from '../store/apiUrl';

import FocusUser from '../components/FocusUser';

const mapStateToProps = (state) => {
	return {
		focusUserList: state.userFollows.focusUserList,     //关注用户列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取关注用户列表 */
		getFocusList: (id) => {
			http({url: API_FOLLOWS + `/user/${id}`}).then(res => {
				dispatch(userFollows.getFocusList(res));
			});
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FocusUser);
