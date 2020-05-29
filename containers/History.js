import { connect } from 'react-redux';
import http from '../store/server';
import { read }  from '../store/actions';

import {
	API_AX_READ
} from '../store/apiUrl';

import History from '../components/History';

const mapStateToProps = (state) => {
	return {
		axReadListUser: state.read.axReadListUser,     //用户浏览记录
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取用户浏览记录*/
		getAxReadListByUser: (id) => {
			http({url: API_AX_READ + `/user/${id}`}).then(res => {
				dispatch(read.getAxReadListByUser(res));
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
