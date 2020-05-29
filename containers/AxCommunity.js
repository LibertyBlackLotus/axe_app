import { connect } from 'react-redux';
import http from '../store/server';
import { ax }  from '../store/actions';

import {
	API_AX
} from '../store/apiUrl';

import AxCommunity from '../components/AxCommunity';

const mapStateToProps = (state) => {
	return {
		axListCommunity: state.ax.axListCommunity,  //社区斧头列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取社区下斧头列表 */
		getAxListByCommunity: (id) => {
			return http({url: API_AX + `/community/${id}`}).then(res => {
				dispatch(ax.getAxListByCommunity(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AxCommunity);
