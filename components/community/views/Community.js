import React from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Dimensions,
} from 'react-native';
import Search from 'react-native-search-box';
import {
	ListItem
} from 'react-native-elements';
import PropTypes from 'prop-types';
import Colors from "../constants/Colors";
import AxCommunity from "../containers/AxCommunity";

const {width} = Dimensions.get('window');

class Community extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			communityId : null
		};

		this.selectCommunity = this.selectCommunity.bind(this);
	}

	componentDidMount() {
		this.props.getCommunityList().then(res => {
			let firstId = res[0]._id;
			this.setState({communityId: firstId});
		});
	}

	//选择社区
	selectCommunity(id){
		this.setState({communityId: id});
	}

	render() {
		let {communityList} = this.props;
		let {communityId} = this.state;
		return (
			<View style={{flex: 1}}>
				<View style={styles.place}></View>
				<Search
					onFocus={this.onFocus}
					cancelButtonWidth={50}
					placeholder={'搜索'}
					backgroundColor={Colors.tintColor}
				/>
				<View style={styles.container}>
					<View style={styles.menu}>
						<ScrollView showsVerticalScrollIndicator={false}>
							{communityList.map(item => (
								<ListItem key={item._id}
										  title={item.name}
										  containerStyle={communityId == item._id&&styles.containerStyle}
										  titleStyle={communityId == item._id&&styles.titleStyle}
										  onPress={() => this.selectCommunity(item._id)}
								/>
							))}
						</ScrollView>
					</View>

					<View style={styles.content}>
						<AxCommunity id={communityId} {...this.props}></AxCommunity>
					</View>
				</View>
			</View>
		);
	}
}

Community.propTypes = {
	communityList: PropTypes.array,     //社区列表
	getCommunityList: PropTypes.func,   //获取社区列表
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flex: 1
	},
	menu: {
		flex: 1,
	},
	content: {
		flex: 4
	},
	containerStyle: {
		backgroundColor: Colors.tintColor
	},
	titleStyle: {
		color: Colors.tabBar,
	},
	place: {
		width: width,
		height: 25,
		backgroundColor: Colors.tintColor
	},
});

export default Community;