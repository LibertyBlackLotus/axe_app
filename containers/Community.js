import { connect } from 'react-redux';
import http from '../store/server';
import { community }  from '../store/actions';

import {
	API_COMMUNITY
} from '../store/apiUrl';

import Community from '../components/Community';

const mapStateToProps = (state) => {
	return {
		communityList: state.community.communityList,   //社区列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取社区列表 */
		getCommunityList: () => {
			return http({url: API_COMMUNITY}).then(res => {
				dispatch(community.getCommunityList(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Community);
