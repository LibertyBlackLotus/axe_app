import { connect } from 'react-redux';
import http from '../store/server';
import { cate }  from '../store/actions';

import {
	API_CATE
} from '../store/apiUrl';

import Cate from '../components/Cate';

const mapStateToProps = (state) => {
	return {
		cateList: state.cate.cateList,     //分类列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取分类列表 */
		getCateList: () => {
			http({url: API_CATE}).then(res => {
				dispatch(cate.getCateList(res));
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cate);
