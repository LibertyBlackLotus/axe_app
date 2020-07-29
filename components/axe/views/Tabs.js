import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import Search from 'react-native-search-box';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Colors from "../../../constants/Colors";
import AxHome from './AxHome';
import AxFocus from './AxFocus';
import http from "../../../store/server";
import {API_AX} from "../../../store/apiUrl";
import {ax} from "../../../store/actions";
import {API_COMMUNITY} from "../../../store/apiUrl";
import {community} from "../../../store/actions";

const {width, height} = Dimensions.get('window');

const initialLayout = {
	width
};

const renderTabBar = props => (
	<TabBar
		{...props}
		style={styles.myTabBar}
		activeColor={Colors.tintColor}
		pressColor={Colors.tintColor}
		inactiveColor={Colors.blackBg}
		tabStyle={styles.tabStyle}
		labelStyle={styles.labelStyle}
		indicatorContainerStyle={styles.indicatorContainerStyle}
		indicatorStyle={styles.indicatorStyle}
		scrollEnabled={true}
		bounces={true}
	/>
);

const Tabs = (props) => {
	// let {communityList, getCommunityList} = props;

	const renderScene = ({ route }) => {
		switch (route.key) {
		case 'all':
			return <AxHome {...props} />;
		case 'focus':
			return <AxFocus {...props} />;
		case 'recommend':
			return <AxHome />;
		default:
			return <AxHome />;
		}
	};

	/*useEffect(() => {
		getCommunityList();
	}, []);*/

	let routes = [];
	/*communityList.forEach(( item, index) => {
		routes[index] = {key: item._id, title: item.name}
	}); */
	// routes.unshift({key: 'recommend', title: '推荐'});
	routes.unshift({key: 'focus', title: '关注'});
	routes.unshift({key: 'all', title: '首页'});

	const [index, setIndex] = useState(0);

	const setNowIndex = (index) => {
		console.log('---setNowIndex---->', index);
		setIndex(index);
	}

	//搜索框获取焦点
	const onFocus = () => {
		this.props.navigation.navigate('Search');
	}

	/*if(communityList.length === 0){
		return null;
	}*/

	return (
		<>
			<View style={styles.place}></View>
			<Search
				onFocus={onFocus}
				cancelButtonWidth={50}
				placeholder={'搜索'}
				backgroundColor={Colors.tintColor}
			/>
			<TabView
				navigationState={{ index, routes }}
				renderTabBar={renderTabBar}
				renderScene={renderScene}
				onIndexChange={setNowIndex}
				initialLayout={initialLayout}
				lazy={true}
				style={styles.myTabs}
			/>


		</>
	);
}

Tabs.propTypes = {
	axList: PropTypes.array,        //斧头列表
	getAxList: PropTypes.func, 	    //获取斧头列表
	navigation: PropTypes.object,

	communityList: PropTypes.array,     //社区列表
	getCommunityList: PropTypes.func,   //获取社区列表
};

const styles = StyleSheet.create({
	axContent: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 10
	},
	axImgView: {
		padding: 3
	},
	axImg: {
		width: width / 3 - 15,
		height: height / 3 - 15,
		borderRadius: 5
	},
	place: {
		width: width,
		height: 25,
		backgroundColor: Colors.tintColor
	},
	myTabs: {

	},
	myTabBar: {
		backgroundColor: Colors.noticeText,
	},
	tabStyle: {
		width: 70,
		justifyContent: 'center',
		alignItems: 'center'
	},
	labelStyle: {
		fontSize: 16,
		fontWeight: '700'
	},
	indicatorContainerStyle: {
	},
	indicatorStyle: {
		backgroundColor: Colors.tintColor,
	},

});

const mapStateToProps = (state) => {
	return {
		axList: state.ax.axList,             //所有斧头列表
		communityList: state.community.communityList,   //社区列表
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

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);