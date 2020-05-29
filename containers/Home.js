import { connect } from 'react-redux';
import http from '../store/server';
import { ax }  from '../store/actions';

import {
	API_AX
} from '../store/apiUrl';

import Home from '../components/Home';

const mapStateToProps = (state) => {
	return {
		axList: state.ax.axList,             //所有斧头列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取所有斧头 */
		getAxList: () => {
			return http({url: API_AX}).then(res => {
				dispatch(ax.getAxList(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
