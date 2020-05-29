import { connect } from 'react-redux';
import http from '../store/server';
import {
	getSwordListByUser
} from '../store/actions';

import {
	API_GET_SWORD
} from '../store/apiUrl';

import MyInfoSwordPublish from '../components/MyInfoSwordPublish';

const mapStateToProps = (state) => {
	return {
		userSwordList: state.sword.userSwordList,     //用户宝剑列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取宝剑列表 */
		getSwordListByUser: (id) => {
			http({url: API_GET_SWORD + `/user/${id}`}).then(res => {
				dispatch(getSwordListByUser(res));
			});

		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoSwordPublish);
