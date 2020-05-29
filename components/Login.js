import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	TextInput,
	ImageBackground
} from 'react-native';
import {
	Button
} from 'react-native-elements';
// import * as WeChat from 'react-native-wechat';
import PropTypes from 'prop-types';
import Colors from "../constants/Colors";
const {width, height} = Dimensions.get('window');

class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			textValue: '',
			weixinLogo: require('../assets/weixin.png'),
			loginBg: require('../assets/images/login.jpg')
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
		let { loginBg } = this.state;
		return (
			<ImageBackground source={loginBg} style={styles.bgImage}>
				<View style={styles.content}>
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
					<Button title="登录"
							type={"outline"}
							onPress={this.loginMethod}
							titleStyle={styles.buttonViewTitle}
							buttonStyle={styles.buttonView} />
					<Button title="注册"
							onPress={this.toRegister}
							type={"outline"}
							buttonStyle={styles.buttonView1} />

				</View>
			</ImageBackground>

		);
	}
}

Login.propTypes = {
	data: PropTypes.object,   //用户信息
	login: PropTypes.func,    //登录
}
const styles = StyleSheet.create({
	bgImage: {
		width: width,
		height: height + 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		width: 260,
		height: 500
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
		marginTop: 20
	},
	buttonView: {
		marginTop: 20,
		borderColor: Colors.tintColor,
	},
	buttonViewTitle: {
		color: Colors.tintColor,
	},
	buttonView1: {
		marginTop: 20,
		width: 50
	}
});
export default Login;