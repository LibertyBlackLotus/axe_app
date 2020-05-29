import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Modal,
	Text,
	TouchableHighlight,
	TextInput
} from 'react-native';
import {
	ListItem,
	Button
} from 'react-native-elements';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Colors from '../constants/Colors';
import {getUserInfo} from '../utils';

class MyInfoSettings extends Component {
	constructor(props){
		super(props);
		this.state = {
			userInfo: null,
			avatar: require('../assets/avatar.png'),
			modalVisible: false,
			nickname: ''
		};

		this.logout = this.logout.bind(this);
		this.chooseAvatar = this.chooseAvatar.bind(this);
		this.modifyUserInfo = this.modifyUserInfo.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
	}

	async componentDidMount(){
		let userInfo = await getUserInfo();
		let {nickname} = userInfo;
		this.setState({userInfo, nickname});
	}

	//退出登录
	logout(){
		global.removeValue('userInfo');
		global.removeValue('token');
		this.props.logout();
		this.props.navigation.reset({
			routes: [{ name: 'LoginNavigator' }],
		});
	}

	//选择头像
	async chooseAvatar(){
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				quality: 1,
			});
			if (!result.cancelled) {
				let {uri} = result;
				let { userInfo } = this.state;
				userInfo.avatar = uri;
				this.setState({ userInfo });
				this.uploadAvatar(uri);  //上传头像
			}
			console.log(result);

		} catch (E) {
			console.log(E);
		}
	}

	//上传头像
	uploadAvatar(uri){
		let formData = new FormData();
		let file = {uri: uri, type: 'multipart/form-data', name: 'image.png'};
		formData.append("files", file);
		axios({
			method: 'post',
			url: 'upload',
			data: formData
		}).then( res => {
			let params = {
				_id: this.state.userInfo._id,
				avatar: res.url
			};
			this.props.modifyUserInfo(params).then(res => {
				this.setState({ userInfo: res.after });
				global.storeData('userInfo', res.after);
			});
		}).catch(error => {
			console.log(error);
		});
	}

	//修改用户信息
	modifyUserInfo(info){
		this.setModalVisible(false);
		let params = {
			_id: this.state.userInfo._id,
			[info]: this.state[info]
		};
		this.props.modifyUserInfo(params).then(res => {
			this.setState({ userInfo: res.after });
			global.storeData('userInfo', res.after);
		});
	}

	setModalVisible(visible){
		this.setState({modalVisible: visible})
	}

	handleTextChange(text){
		this.setState({
			nickname: text
		});
	}

	render() {
		const { userInfo, modalVisible } = this.state;
		let uri = userInfo&&userInfo.avatar? {uri: userInfo.avatar}: this.state.avatar;
		//设置列表
		const list = [
			{
				title: userInfo?.nickname,
				rightTitle: '昵称',
			},
			{
				title: userInfo?.gender,
				rightTitle: '性别'
			},
			{
				title: userInfo?.birthday,
				rightTitle: '生日',
			}
		]
		return (
			<View>
				{userInfo &&
					<>
						<ListItem
							leftAvatar={{ source: uri, size: 'medium'}}
							title={userInfo?.username}
							onPress={this.chooseAvatar}
							style={styles.avatarStyle}

						/>
						{list.map((item, i) => (
							<ListItem
								key={i}
								title={item.title}
								rightTitle={item.rightTitle}
								chevron
								onPress={() => this.setModalVisible(true)}
							/>
						))}
					</>
				}
				<Button title="退出登录"
						buttonStyle={{backgroundColor: Colors.tintColor}}
						onPress={this.logout} />

				<Modal
					animationType="slide"
					transparent={false}
					visible={modalVisible}
					onRequestClose={() => {
						console.log('Modal has been closed.');
					}}>
					<View style={styles.modalStyle}>
						<View>
							<TextInput
								name="nickname"
								value={this.state.nickname}
								onChangeText={text => this.handleTextChange(text)}
								placeholder="昵称"
								autoFocus
								style={styles.nicknameText}
							/>
							<View style={styles.modalPanel}>
								<Button title="确定"
										buttonStyle={{backgroundColor: Colors.tintColor}}
										onPress={() => this.modifyUserInfo('nickname')} />
								<Button title="取消"
										buttonStyle={{backgroundColor: '#ccc'}}
										onPress={() => this.setModalVisible(false)} />
							</View>

						</View>
					</View>
				</Modal>

			</View>
		);
	}
}

MyInfoSettings.propTypes = {
	modifyUserInfo: PropTypes.func, //更换头像
	logout: PropTypes.func //退出登录

};

const styles = StyleSheet.create({
	avatarStyle: {
		height: 100,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 1
	},
	modalStyle: {
		marginTop: 22,
		height: 500,
		alignItems: 'center',
		justifyContent: 'center',
	},
	nicknameText: {
		height: 50,
		width: 200,
		borderBottomColor: Colors.borderColorGray,
		borderBottomWidth: 1,
		textAlign: 'center',
	},
	modalPanel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10
	}
});

export default MyInfoSettings;