import { connect } from 'react-redux';
import http from '../store/server';
import {
	getFocusList
} from '../store/actions';

import {
	FOCUS
} from '../store/apiUrl';

import MyInfoSwordFocus from '../components/MyInfoSwordFocus';

const mapStateToProps = (state) => {
	return {
		focusUserList: state.focus.focusUserList,     //关注用户列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取关注用户列表 */
		getFocusList: (id) => {
			return http({url: FOCUS + `/list/${id}`}).then(res => {
				dispatch(getFocusList(res));
				return Promise.resolve(res);
			});
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoSwordFocus);
