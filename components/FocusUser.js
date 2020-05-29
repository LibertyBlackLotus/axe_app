import React, {Component} from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import {
	Avatar
} from 'react-native-elements'
import Colors from "../constants/Colors";

class FocusUser extends Component {
	constructor(props){
		super(props);
		this.state = {
			avatar: require('../assets/avatar.png'),
			id: null
		};
	}

	async componentDidMount() {
		let {id} = this.props;
		this.setState({id});
		this.props.getFocusList(id);  //获取关注用户列表
	}

	componentDidUpdate(prevProps){
		let preId = prevProps.id;
		let nowId = this.props.id;
		if (nowId !== preId) {
			this.props.getFocusList(nowId);  //获取关注用户列表
		}
	}

	//跳转到用户主页
	toUser(id){
		this.props.navigation.navigate('UserMainPage', {id});
	}

	render() {
		const {focusUserList} = this.props;
		if(focusUserList.length == 0) return null;
		return (
			<ScrollView horizontal={true}
						style={styles.focusUserContainer}
						contentContainerStyle={{alignItems: 'center'}}>
				{ focusUserList && focusUserList.map(item => (
					<View key={item._id} style={styles.focusUser}>
						<Avatar
							size={"medium"}
							rounded
							containerStyle={styles.focusUserAvatar}
							source={item.user.avatar?{uri: item.user.avatar}: this.state.avatar}
							onPress={() => this.toUser(item.user._id)}
						/>
						<Text style={styles.focusUserText}>{item.user.nickname?item.user.nickname:item.user.username}</Text>
					</View>
				))}
			</ScrollView>
		);
	}
}
FocusUser.propTypes = {
	focusUserList: PropTypes.array, //关注用户列表
	getFocusList: PropTypes.func,   //获取关注用户列表
}

const styles = StyleSheet.create({
	focusUserContainer: {
		height: 90,
		padding: 8,
		borderColor: Colors.borderColorGray,
		borderBottomWidth: 1
	},
	focusUser: {
		alignItems: 'center',
		marginRight: 5
	},
	focusUserAvatar: {
		borderWidth: 2,
		borderColor: Colors.tintColor
	},
	focusUserText: {
		fontSize: 10,
		color: Colors.grayText
	}
});

export default FocusUser;