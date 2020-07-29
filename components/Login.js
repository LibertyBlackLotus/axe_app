import React, {useState} from 'react';
import {connect} from "react-redux";
import {
	View,
	StyleSheet,
	Dimensions,
	TextInput,
	ImageBackground,
	Alert,
	Text
} from 'react-native';
import {
	Button
} from 'react-native-elements';
import PropTypes from 'prop-types';
import Colors from "../constants/Colors";
import http from "../store/server";
import {API_USER, API_SEND_SMS} from "../store/apiUrl";
import {user} from "../store/actions";

const {width, height} = Dimensions.get('window');

const Login = (props) => {
	const {loginPhone, sendSms, navigation} = props;
	const loginBg = require('../assets/images/login.jpg');
	let countInterval = null;
	let count = 60;

	let [phone, setPhone] = useState('');
	let [code, setCode] = useState('');
	let [isDisabled, setIsDisabled] = useState(false);
	let [countButton, setCountButton] = useState('验证码');
	let [countText, setCountText] = useState(60);

	//手机号
	const handlePhoneChange = (text) => {
		setPhone(text);
	}

	//验证码
	const handleCodeChange = (text) =>{
		setCode(text);
	}

	//发送短信验证码
	const sendSmsMethod = () =>{
		if(!phone || phone.length != 11){
			Alert.alert('请填写有效手机号！');
			return;
		}

		let params = {
			phone: phone.trim(),
		};
		sendSms(params).then(res => {
			setIsDisabled(true);
			setCountButton('重新发送');
			countIntervalMethod();
		});
	}

	//验证码重发倒计时
	const countIntervalMethod = () => {
		if(countInterval == null){
			countInterval = setInterval(() => {
				if(count > 0){
					count -= 1;
					setCountText(count);
				}else{
					setIsDisabled(false);
					clearInterval(countInterval);
				}
			}, 1000);
		}
	}

	const loginMethod = () => {
		const params = { phone, code };
		loginPhone(params).then( res => {
			if(res){
				global.storeData('userInfo', JSON.stringify(res.userInfo)).then(data => {
					global.storeData('token', res.token);
					navigation.reset({
						routes: [{ name: 'BottomTabNavigator' }],
					});
				});
			}
		});
	}

	return (
		<ImageBackground source={loginBg} style={styles.bgImage}>
			<View style={styles.content}>
				<TextInput
					placeholder={'手机号'}
					name="phone"
					value={phone}
					onChangeText={text => handlePhoneChange(text)}
				/>
				<View style={styles.code}>
					<TextInput
						placeholder={'验证码'}
						name="code"
						value={code}
						onChangeText={text => handleCodeChange(text)}
					/>

					<View style={styles.codeCount}>
						<Button title={countButton}
							disabled={isDisabled}
							onPress={sendSmsMethod}
							titleStyle={styles.buttonViewTitle}
							buttonStyle={styles.buttonView}
							type={"outline"} />
						{isDisabled &&
							<View style={styles.codeCountText}>
								<Text>({countText})秒</Text>
							</View>}
					</View>


				</View>

				<Button title="登录"
					type={"outline"}
					onPress={loginMethod}
					titleStyle={styles.buttonViewTitle}
					buttonStyle={styles.buttonView} />

			</View>
		</ImageBackground>

	);
}

Login.propTypes = {
	data: PropTypes.object,     //用户信息
	loginPhone: PropTypes.func,      //登录
	sendSms: PropTypes.func,    //发送短信验证码
	navigation: PropTypes.object
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
	code: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	codeCount: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	codeCountText: {
		marginLeft: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonViewTitle: {
		color: Colors.tintColor,
	},
	buttonView1: {
		marginTop: 20,
		width: 50
	}
});
const mapStateToProps = (state) => {
	return {
		data: state.user.data,     //用户信息
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 登录 */
		login: (data) => {
			return http({method: 'POST', url: API_USER + '/login', data}).then(res => {
				dispatch(user.login(res));
				return Promise.resolve(res);
			});
		},

		/* 发送短信验证码 */
		sendSms: (data) => {
			return http({method: 'POST', url: API_SEND_SMS, data}).then(res => {
				return Promise.resolve(res);
			});
		},

		/* 手机号登录 */
		loginPhone: (data) => {
			return http({method: 'POST', url: API_USER + '/loginPhone', data}).then(res => {
				dispatch(user.login(res));
				return Promise.resolve(res);
			});
		},

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);