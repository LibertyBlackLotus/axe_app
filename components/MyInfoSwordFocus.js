import React, {Component} from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	Dimensions,
	RefreshControl,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import {getUserId} from '../utils';

const {	width } = Dimensions.get('window');

class MyInfoSwordFocus extends Component {
	constructor(props){
		super(props);
		this.state = {
			avatar: require('../assets/avatar.png'),
			refreshing: false,
			id: null
		};

		this.onRefresh = this.onRefresh.bind(this);
	}

	async componentDidMount() {
		let id = await getUserId();
		this.setState({id});
		this.props.getFocusList(id);  //获取关注用户列表
	}

	//下拉刷新
	onRefresh(){
		this.setState({refreshing: true});
		this.props.getFocusList(this.state.id).then(res => {
			this.setState({refreshing: false});
		});
	}

	//跳转到用户主页
	toUser(id){
		this.props.navigation.navigate('UserInfo', { id });
	}

	render() {
		const {focusUserList} = this.props;
		let {refreshing} = this.state;
		return (
			<ScrollView refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
			}>
				<View>
					{
						focusUserList.length > 0 ?
							focusUserList.map(l => (
								<ListItem
									key={l._id}
									title={l.friend.nickname}
									leftAvatar={{source: l.friend.avatar?{uri: l.friend.avatar}: this.state.avatar}}
									onPress={() => this.toUser(l.friend._id)}
								/>
							))
							:<View style={styles.noContent}>
								<Text>暂无内容</Text>
							</View>
					}
				</View>
			</ScrollView>
		);
	}
}
MyInfoSwordFocus.propTypes = {
	focusUserList: PropTypes.array, //关注用户列表
	getFocusList: PropTypes.func,   //获取关注用户列表
}

const styles = StyleSheet.create({
	swordContent: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	swordItem: {
		width: width / 3,
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 1,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backgroundVideo: {
		width: width / 3.5,
		height: (width * 16 / 9) / 3.5,
		borderRadius: 5,
	},
	swordInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		marginBottom: 5,
		paddingLeft: 10
	},
	swordInfoItem: {
		flexDirection: 'row',
		alignItems: 'center',
		color: '#16a085',
		marginRight: 10
	},
	swordInfoItemIcon: {
		marginRight: 5
	},
	swordInfoItemText: {
		color: '#16a085'
	},
	swordUserAvatar: {
		position: 'absolute',
		bottom: 12,
		left: 10
	},
	swordUser: {
		width: 20,
		height: 20,
		borderRadius: 10,
		marginRight: 5
	},
	noContent: {
		height: 300,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default MyInfoSwordFocus;