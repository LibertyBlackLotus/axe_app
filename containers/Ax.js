import { connect } from 'react-redux';
import http from '../store/server';
import { ax }  from '../store/actions';

import {
	API_AX
} from '../store/apiUrl';

import Ax from '../components/Ax';

const mapStateToProps = (state) => {
	return {
		axListUser: state.ax.axListUser,     //用户斧头列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取用户下所有斧头 */
		getAxListByUser: (id) => {
			return http({url: API_AX + `/user/${id}`}).then(res => {
				dispatch(ax.getAxListByUser(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Ax);
