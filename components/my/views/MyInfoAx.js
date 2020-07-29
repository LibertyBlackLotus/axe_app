import React, {Component} from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Dimensions,
	Text
} from 'react-native';
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import MyInfoSwordPublish from '../containers/MyInfoSwordPublish';
// import MyInfoSwordFocus from '../containers/MyInfoSwordFocus';

const initialLayout = {
	width: Dimensions.get('window').width
};

// const renderTabBar = props => (
// 	<TabBar
// 		{...props}
// 		indicatorStyle={{ backgroundColor: '#fff' }}
// 		style={{ backgroundColor: '#16a085' }}
// 		activeColor='#fff'
// 		inactiveColor='#ccc'
// 	/>
// );

class MyInfoAx extends Component {
	constructor(props){
		super(props);
		this.state = {
			index: 0,
			routes: [
				{ key: 'first', title: '发布' },
				{ key: 'second', title: '关注' },
			],

			// renderScene: ({ route }) => {
			// 	switch (route.key) {
			// 		case 'first':
			// 			return <MyInfoSwordPublish {...this.props} />;
			// 		case 'second':
			// 			return <MyInfoSwordFocus {...this.props} />;
			// 		default:
			// 			return null;
			// 	}
			// }
		};
		this.setIndex = this.setIndex.bind(this);
	}

	setIndex(index){
		this.setState({index})
	}

	render() {
		const {index, routes, renderScene} = this.state;
		return (
			<View>
				<Text>myinfo ax</Text>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
	myTabs: {
	}
});

export default MyInfoAx;