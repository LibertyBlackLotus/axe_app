import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	TextInput,
	Image,
	Text,
	TouchableOpacity
} from 'react-native';
import {
	Button
} from 'react-native-elements';
// import * as WeChat from 'react-native-wechat';
import PropTypes from 'prop-types';
import Colors from "../constants/Colors";
const {height} = Dimensions.get('window');

class LoginOther extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			textValue: '',
			weixinLogo: require('../assets/weixin.png')
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.loginMethod = this.loginMethod.bind(this);
		this.toRegister = this.toRegister.bind(this);
		this.weixinLogin = this.weixinLogin.bind(this);
	}

	handleUsernameChange(text){
		this.setState({
			username: text
		});
	}

	handlePasswordChange(text){
		this.setState({
			password: text
		});
	}

	loginMethod(){
		let { username, password } = this.state;
		let params = { username, password };
		this.props.login(params).then( res => {
			if(res){
				global.storeData('userInfo', res.userInfo).then(data => {
					global.storeData('token', res.token);
					this.props.navigation.reset({
						routes: [{ name: 'BottomTabNavigator' }],
					});
				});
			}
		});
	}

	toRegister(){
		this.props.navigation.navigate('Register');
	}

	//微信登录
	weixinLogin(){
		console.log('weixin login');
		// let installed = WeChat.isWXAppInstalled();
		// console.log('installed---->', installed );
	}

	render(){
		let { weixinLogo } = this.state;
		return (
			<View style={styles.content}>
				<View style={styles.container}>
					{/*<TouchableOpacity style={styles.weixinLogo} onPress={this.weixinLogin}>
						<Image source={weixinLogo} style={styles.weixinLogoImg} />
						<Text>微信登录</Text>
					</TouchableOpacity>*/}

					<TextInput
						placeholder={'用户名'}
						name="username"
						value={this.state.username}
						onChangeText={text => this.handleUsernameChange(text)}
					/>
					<TextInput
						placeholder={'密码'}
						name="password"
						value={this.state.password}
						onChangeText={text => this.handlePasswordChange(text)}
					/>
					<View style={styles.buttonViewContainer} >
						<Button title="登录" onPress={this.loginMethod} buttonStyle={styles.buttonView} />
						<Button title="注册" onPress={this.toRegister} buttonStyle={styles.buttonView} />
					</View>
				</View>
			</View>
		);
	}
}

LoginOther.propTypes = {
	data: PropTypes.object, //用户信息
	login: PropTypes.func,  //登录
}
const styles = StyleSheet.create({
	content: {
		height: height,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		width: 260,
	},
	weixinLogo: {
		alignItems: 'center',
		marginBottom: 50
	},
	weixinLogoImg: {
		width: 60,
		height: 60,
		marginBottom: 10
	},
	buttonViewContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
	},
	buttonView: {
		width: 100,
		marginRight: 20,
		backgroundColor: Colors.tintColor
	}
});
export default LoginOther;