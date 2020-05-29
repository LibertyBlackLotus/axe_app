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
import { ListItem } from 'react-native-elements'
import {getUserId} from '../utils';

const {	width } = Dimensions.get('window');

class Focus extends Component {
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
		this.props.navigation.navigate('UserMainPage', {id});
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
							focusUserList.map(item => (
								<ListItem
									key={item._id}
									title={item.user.nickname?item.user.nickname:item.user.username}
									leftAvatar={{source: item.user.avatar?{uri: item.user.avatar}: this.state.avatar}}
									onPress={() => this.toUser(item.user._id)}
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
Focus.propTypes = {
	focusUserList: PropTypes.array, //关注用户列表
	getFocusList: PropTypes.func,   //获取关注用户列表
}

const styles = StyleSheet.create({

});

export default Focus;