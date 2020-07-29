import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import Search from 'react-native-search-box';
import { TabView, TabBar } from 'react-native-tab-view';
import Colors from "../constants/Colors";
import AxFocus from '../containers/AxFocus';
import AxHome from './axe/views/AxHome';
import http from "../store/server";
import {API_AX} from "../store/apiUrl";
import {ax} from "../store/actions";

const {width, height} = Dimensions.get('window');

const initialLayout = {

};

const renderTabBar = props => (
	<TabBar
		{...props}
		indicatorStyle={styles.myTabBarIndi}
		style={styles.myTabBar}
		activeColor={Colors.tintColor}
		pressColor={Colors.tintColor}
		inactiveColor={Colors.mainText}
		tabStyle={styles.tabStyle}
		scrollEnabled={true}
	/>
);

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			index: 0,
			routes: [
				{ key: '1', title: '首页' },
				// { key: '2', title: '关注' },
				// { key: '3', title: '推荐' },
			],
			renderScene: ({ route }) => {
				switch (route.key) {
				case '1':
					return <AxHome {...this.props} />;
				case '2':
					return <AxFocus {...this.props} />;
				case '3':
					return <AxFocus {...this.props} />;
				default:
					return null;
				}
			}
		};

		this.onFocus = this.onFocus.bind(this);
		this.setIndex = this.setIndex.bind(this);
	}

	//搜索框获取焦点
	onFocus(){
		this.props.navigation.navigate('Search');
	}

	setIndex(index){
		this.setState({index})
	}

	render() {
		const {index, routes, renderScene} = this.state;
		return (
			<>
				<View style={styles.place}></View>
				<Search
					onFocus={this.onFocus}
					cancelButtonWidth={50}
					placeholder={'搜索'}
					backgroundColor={Colors.tintColor}
				/>
				<TabView
					navigationState={{ index, routes }}
					renderTabBar={renderTabBar}
					renderScene={renderScene}
					onIndexChange={this.setIndex}
					initialLayout={initialLayout}
					lazy={true}
					style={styles.myTabs}
				/>
			</>
		);
	}
}

Home.propTypes = {
	axList: PropTypes.array,        //斧头列表
	getAxList: PropTypes.func, 	    //获取斧头列表
	navigation: PropTypes.object
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
		width: 70
	},
	myTabBarIndi: {
		backgroundColor: Colors.tintColor,
	},

});

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