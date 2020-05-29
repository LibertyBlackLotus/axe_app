import { connect } from 'react-redux';
import http from '../store/server';
import { collection }  from '../store/actions';

import {
	API_COLLECT
} from '../store/apiUrl';

import Collection from '../components/Collection';

const mapStateToProps = (state) => {
	return {
		collectionList: state.collection.collectionList,     //用户收藏列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取用户收藏*/
		getCollection: (id) => {
			http({url: API_COLLECT + `/user/${id}`}).then(res => {
				dispatch(collection.getCollection(res));
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
