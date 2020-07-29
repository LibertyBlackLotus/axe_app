import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import http from "../../../store/server";
import {API_AX} from "../../../store/apiUrl";
import {ax} from "../../../store/actions";
import AxList from "./AxList";

const AxHome = (props) => {
	const {axList, allPage, getAxList} = props;

	return (
		<AxList axList={axList} allPage={allPage} getAxList={getAxList} {...props} />
	);
}

AxHome.propTypes = {
	axList: PropTypes.arrayOf(PropTypes.object).isRequired,  //斧头列表
	allPage: PropTypes.number,                               //斧头列表总页数
	getAxList: PropTypes.func.isRequired, 	                 //获取斧头列表
};

const mapStateToProps = (state) => {
	return {
		axList: state.ax.axList,             //所有斧头列表
		allPage: state.ax.allPage,           //列表总页数
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取所有斧头 */
		getAxList: (params) => {
			const {page, limit} = params;
			return http({url: API_AX + '/page', params: {page, limit}}).then(res => {
				dispatch(ax.getAxList(res.collections, res.allPage));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AxHome);