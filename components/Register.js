import React, { Component } from 'react';
import {
	View,
	Dimensions,
	StyleSheet,
	TextInput
} from 'react-native';
import {
	Button
} from 'react-native-elements';
import PropTypes from 'prop-types';
// import TextField from 'react-native-md-textinput';
import Colors from "../constants/Colors";
const {height} = Dimensions.get('window');

class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.registerMethod = this.registerMethod.bind(this);
		this.toLogin = this.toLogin.bind(this);
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

	registerMethod(){
		let { username, password } = this.state;
		let params = { username, password };
		this.props.register(params).then( res => {
			global.storeData('userInfo', res.userInfo);
			global.storeData('token', res.token);
			this.props.navigation.navigate('BottomTabNavigator', {screen: 'Home'});
		});
	}

	toLogin(){
		this.props.navigation.navigate('Login');
	}

	render(){
		return (
			<View style={styles.content}>
				<View style={styles.container}>
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
					<Button title="注册" onPress={this.registerMethod} buttonStyle={styles.buttonView} />
					<Button title="登录"
							type={"outline"}
							onPress={this.toLogin}
							buttonStyle={styles.buttonView1} />
				</View>
			</View>
		);
	}
}
Register.propTypes = {
	data: PropTypes.object,   //用户信息
	register: PropTypes.func, //注册
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
	buttonViewContainer: {
		marginTop: 20
	},
	buttonView: {
		backgroundColor: Colors.tintColor,
		marginTop: 20
	},
	buttonView1: {
		marginTop: 30,
		width: 50,
	}
});

export default Register;