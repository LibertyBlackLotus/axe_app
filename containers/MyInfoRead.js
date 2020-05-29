import {connect} from 'react-redux';
import http from '../store/server';
import {
	getReadList
} from '../store/actions';

import {
	API_SWORD_READ
} from '../store/apiUrl';

import MyInfoRead from '../components/MyInfoRead';

const mapStateToProps = (state) => {
	return {
		readList: state.swordRead.readList,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取阅读记录列表 */
		getReadList: (id) => {
			http({url: API_SWORD_READ  + `/list/${id}`}).then(res => {
				dispatch(getReadList(res));
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoRead);
