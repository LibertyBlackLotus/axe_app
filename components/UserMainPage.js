import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	StyleSheet,
	Dimensions,
	Button
} from 'react-native';
import PropTypes from 'prop-types';
import {getUserId} from '../utils';

const {width} = Dimensions.get('window');

class UserMainPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			id: null,     //访问的用户id
			userId: null, //当前登录用户id
			avatar: require('../assets/avatar.png'),
			bgImg: require('../assets/show.jpg')
		};

		this.followed = this.followed.bind(this);
		this.removeFollowed = this.removeFollowed.bind(this);
	}

	async componentDidMount(){
		let params = this.props.route.params;
		if(params){
			let {id} = params;
			this.setState({id});
			this.props.getUserInfo(id);
			let userId = await getUserId();
			this.setState({userId});
			this._isFollow(); //判断是否关注
		}
	}

	//判断是否关注
	_isFollow(){
		let {id, userId} = this.state;
		let params = {
			user: id,
			follows: userId
		};
		this.props.isFollow(params);
	}

	//关注
	followed(){
		let {id, userId} = this.state;
		let params = {
			user: id,
			follows: userId
		};
		this.props.followed(params);
	}

	//取消关注
	removeFollowed(){
		let {id, userId} = this.state;
		let params = {
			user: id,
			follows: userId
		};
		this.props.removeFollowed(params);
	}

	render(){
		let {data, isFollowed} = this.props;
		let uri = data && data.avatar? {uri: data.avatar}: this.state.avatar;
		let {id, userId} = this.state;
		return (
			<View style={styles.myInfo}>
				<ImageBackground source={this.state.bgImg} style={styles.bgImage} />
				<View style={styles.avatarContent}>
					<Image style={styles.avatar}
						   source={uri} />
					<Text style={styles.username}>{data.nickname? data.nickname: data.username}</Text>
					{id != userId && (
						isFollowed?
						<Button title="已关注" onPress={this.removeFollowed} />:
						<Button title="关注" onPress={this.followed}  />
					)}
				</View>
			</View>
		);
	}
}

UserMainPage.propTypes = {
	getUserInfo: PropTypes.func, //获取用户信息
	data: PropTypes.object,      //用户信息
	isFollowed: PropTypes.bool,     //是否关注了
	followed: PropTypes.func,       //关注
	removeFollowed: PropTypes.func, //取消关注
	isFollow: PropTypes.func,       //判断是否关注
};

const styles = StyleSheet.create({
	myInfo: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarContent: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		padding: 10
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	username: {
		color: '#16a085',
		fontSize: 20
	},
	bgImage: {
		width: width,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default UserMainPage;