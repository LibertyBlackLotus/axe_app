import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from "../../../store/server";
import {API_AX} from "../../../store/apiUrl";
import {ax} from "../../../store/actions";
import AxList from "./AxList";
import UserId from "../../UserId";

const AxFocus = (props) => {
	const {axListFocusUser, allPageFocusUser, getFocusUserAx} = props;

	return (<UserId render={id =>
		<AxList id={id}
			{...props}
			axList={axListFocusUser}
			allPage={allPageFocusUser}
			getAxList={getFocusUserAx} />} />);
}

AxFocus.propTypes = {
	axListFocusUser: PropTypes.arrayOf(PropTypes.object).isRequired,  //斧头列表
	allPageFocusUser: PropTypes.number,                               //斧头列表总页数
	getFocusUserAx: PropTypes.func.isRequired, 	                 //获取关注用户斧头列表
};

const mapStateToProps = (state) => {
	return {
		axListFocusUser: state.ax.axListFocusUser,             //所有斧头列表
		allPageFocusUser: state.ax.allPageFocusUser,           //列表总页数
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取关注用户斧头列表 */
		getFocusUserAx: (params) => {
			const {id, page, limit} = params;
			return http({url: API_AX + `/focus/${id}`, params: {page, limit}}).then(res => {
				dispatch(ax.getFocusUserAx(res.collections, res.allPage));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AxFocus);