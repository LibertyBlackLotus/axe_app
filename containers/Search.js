import { connect } from 'react-redux';
import http from '../store/server';
import { ax }  from '../store/actions';

import {
	API_AX
} from '../store/apiUrl';

import Search from '../components/Search';

const mapStateToProps = (state) => {
	return {
		axListSearch: state.ax.axListSearch, //搜索斧头结果
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 搜索斧头 */
		searchAx: (data) => {
			http({method: 'POST', url: API_AX + '/search', data}).then(res => {
				dispatch(ax.searchAx(res));
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
