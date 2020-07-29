import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Alert,
	TextInput,
	Text,
	ActivityIndicator,
	Dimensions
} from 'react-native';
import {
	Button
} from 'react-native-elements';
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import {getUserId} from '../utils';
import {baseUrl, qiniuUrl} from '../store/config';
import Colors from "../constants/Colors";

import {Conf, Rpc} from '../utils/qiniu';
const {width, height} = Dimensions.get('window');

Conf.ACCESS_KEY = 'kjN4EKiPPIM141av8GHfA8F-eSK8ihWL31LFTbff';
Conf.SECRET_KEY = 'Ic5vUl0wKDc6pWvNbT2AR5d-uqRwjs3QrXK6TN7u';
Conf.UP_HOST = 'http://up-z2.qiniu.com';

class AxAdd extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			author: '',
			title: '',
			content: '',
			community: null,
			communityText: '',
			uploadToken: null,
			progress: 0,
			upload: false
		}
		this.pickImage = this.pickImage.bind(this);
		this.publishAx = this.publishAx.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
	}

	async componentDidMount() {
		let author = await getUserId();
		this.setState({author});
		this.props.getCommunityList();
	}

	//选择图片
	pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 0.2,
			});
			if (!result.cancelled) {
				this.setState({image: result.uri});
			}
			console.log(result);

		} catch (E) {
			console.log(E);
		}
	}

	//添加内容
	handleContentChange(text) {
		this.setState({
			content: text
		});
	}

	//选择社区
	selectCommunity(item) {
		this.setState({
			community: item._id,
			communityText: item.name,
		});
	}

	//发布
	publishAx() {
		let {content, author, community, image} = this.state;
		if (!image) {
			Alert.alert(
				'请添加图片'
			);
			return;
		}
		if (!content) {
			Alert.alert(
				'请填写内容'
			);
			return;
		}
		if (!community) {
			Alert.alert(
				'请选择社区'
			);
			return;
		}

		this.setState({upload: true});
		// 上传七牛云
		let name = image.slice(image.lastIndexOf('/') + 1);
		let params = {
			uri: image, //图片路径  可以通过第三方工具 如:ImageCropPicker等获取本地图片路径
			key: name,  //要上传的key
		}

		//构建上传策略
		let policy = {
			scope: "axe",  //记得这里如果格式为<bucket>:<key>形式的话,key要与params里的key保持一致,详见七牛上传策略
			returnBody:    //returnBody 详见上传策略
				{
					name: "$(fname)",         //获取文件名
					size: "$(fsize)",         //获取文件大小
					w: "$(imageInfo.width)",  //宽
					h: "$(imageInfo.height)", //高
					hash: "$(etag)",          //etag
				},
		}

		Rpc.uploadFile(params, policy, (progress) => {
			this.setState({progress});
		}).then( data => {
			this.setState({progress: '', upload: false});
			let ax = data;
			ax.name = qiniuUrl + ax.name;
			let params = {
				ax,
				content,
				author,
				community
			};
			this.props.addAx(params).then(res => {  //创建axe
				this.setState({
					title: '',
					content: '',
					image: null,
					communityText: ''
				});
				this.props.navigation.navigate('Home');
			});
		}).catch( err => {
			console.log('--err--->', err);
		});

	}

	_uploadLocal(){ // 上传本地服务器
		let form = new FormData();
		form.append('files', {
			uri: image,
			type: 'multipart/form-data',
			name: 'image.png'
		});
		fetch(`${baseUrl}upload`, {
			method: 'POST',
			body: form
		}).then((res) => {return res.json()}).then((res) => {
			this.setState({image: null, communityText: ''});
		}).catch((e) => {
			alert(e)
		});
	}

	render() {
		let {communityList} = this.props;
		let {image, content, communityText, progress, upload} = this.state;
		return (
			<View>
				{upload && <View style={styles.upload}>
							   <ActivityIndicator/>
							   <Text>{progress}%</Text>
						    </View>
				}
				{!upload && <View style={styles.content}>
					{image && <Image source={{uri: image}} style={{width: 100, height: 100}}/>}
					{!image &&<Button title="添加图片"
							type="outline"
							buttonStyle={styles.addAxButton}
							onPress={this.pickImage}/>}

					<View class="axDesc">
						<TextInput placeholder="心情状态,分享生活点滴"
								   multiline
								   style={styles.axDesc}
								   onChangeText={text => this.handleContentChange(text)}
								   value={content}>
						</TextInput>
					</View>

					<Menu style={styles.menuContent}>
						<MenuTrigger text={`选择社区 ${communityText}`}/>
						<MenuOptions>
							{communityList &&
							communityList.map(item => (
								<MenuOption key={item._id}
											text={item.name}
											onSelect={() => this.selectCommunity(item)}/>
							))
							}
						</MenuOptions>
					</Menu>

					<View style={styles.publishButtonContainer}>
						<Button title="发布" onPress={this.publishAx} buttonStyle={styles.publishButton}/>
					</View>
				</View> }

			</View>
		);
	}
}

AxAdd.propTypes = {
	axListUser: PropTypes.array,       //用户斧头列表
	communityList: PropTypes.array,    //社区列表
	addAx: PropTypes.func,             //创建斧头
	getCommunityList: PropTypes.func,  //获取社区列表
	uploadToken: PropTypes.string,
}

const styles = StyleSheet.create({
	content: {
		padding: 10
	},
	upload: {
		width,
		height,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.grayText
	},
	addAxButton: {
		width: 100,
		height: 100
	},
	axDesc: {
		height: 200
	},
	publishButtonContainer: {
		alignItems: 'center'
	},
	publishButton: {
		width: 350,
		backgroundColor: Colors.tintColor
	},
	menuContent: {
		padding: 10,
		height: 50,
	}
});

export default AxAdd;