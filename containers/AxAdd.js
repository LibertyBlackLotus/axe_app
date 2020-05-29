import { connect } from 'react-redux';
import http from '../store/server';
import {ax, community} from '../store/actions';

import {
	API_AX,
	API_COMMUNITY
} from '../store/apiUrl';

import AxAdd from '../components/AxAdd';

const mapStateToProps = (state) => {
	return {
		axListUser: state.ax.axListUser,     //用户斧头列表
		communityList: state.community.communityList,   //社区列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 创建斧头 */
		addAx: (data) => {
			return http({method: 'POST', url: API_AX, data}).then(res => {
				dispatch(ax.addAx(res));
				return Promise.resolve(res);
			});
		},

		/* 获取社区列表 */
		getCommunityList: () => {
			return http({url: API_COMMUNITY}).then(res => {
				dispatch(community.getCommunityList(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AxAdd);
