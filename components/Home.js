import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import Search from 'react-native-search-box';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Colors from "../constants/Colors";
import AxFocus from '../containers/AxFocus';
import {getUserId} from '../utils';

const {width, height} = Dimensions.get('window');

const initialLayout = {

};

const renderTabBar = props => (
	<TabBar
		{...props}
		indicatorStyle={styles.myTabBarIndi}
		style={styles.myTabBar}
		activeColor={Colors.tintColor}
		inactiveColor='#ccc'
	/>
);

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			index: 0,
			routes: [
				{ key: '1', title: '关注' },
				{ key: '2', title: '推荐' },
			],
			renderScene: ({ route }) => {
				switch (route.key) {
					case '1':
						return <AxFocus {...this.props} />;
					case '2':
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
			<View style={{paddingBottom: 60}}>
				<View style={styles.place}></View>
				<Search
				onFocus={this.onFocus}
				cancelButtonWidth={50}
				placeholder={'搜索'}
				backgroundColor={Colors.tintColor}
				/>

				<ScrollView>
					<TabView
						navigationState={{ index, routes }}
						renderTabBar={renderTabBar}
						renderScene={renderScene}
						onIndexChange={this.setIndex}
						initialLayout={initialLayout}
						style={styles.myTabs}
					/>
				</ScrollView>
			</View>
		);
	}
}

Home.propTypes = {
	axList: PropTypes.array,        //斧头列表
	getAxList: PropTypes.func, 	    //获取斧头列表
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
	myTabBarIndi: {
		backgroundColor: Colors.tintColor,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	}

});

export default Home;