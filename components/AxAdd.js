import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Alert,
	TextInput,
	Text
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
import {baseUrl} from '../store/config';
import Colors from "../constants/Colors";

class AxAdd extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			author: '',
			title: '',
			content: '',
			community: null,
			communityText: ''
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
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				quality: 1,
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
	handleContentChange(text){
		this.setState({
			content: text
		});
	}

	//选择社区
	selectCommunity(item){
		this.setState({
			community: item._id,
			communityText: item.name,
		});
	}

	//发布
	publishAx() {
		let { title, content, author, community, image } = this.state;
		if(!image){
			Alert.alert(
				'请添加图片'
			);
			return;
		}
		if(!content){
			Alert.alert(
				'请填写内容'
			);
			return;
		}
		if(!community){
			Alert.alert(
				'请选择社区'
			);
			return;
		}

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
			let ax = {url: res.url, width: res.width, height: res.height};
			let params = {
				ax,
				title,
				content,
				author,
				state: 1,
				community
			};
			this.props.addAx(params).then(res => {
				// this.props.navigation.navigate('Home');
			});
			this.props.navigation.navigate('Home');
		}).catch((e) => {
			alert(e)
		});

		this.setState({
			title: '',
			content: ''
		});
	}

	render() {
		let {communityList} = this.props;
		let {image, content, communityText} = this.state;
		return (
			<View style={styles.content}>

				{image && <Image source={{uri: image}} style={{width: 100, height: 100}}/>}
				<Button title="添加图片"
						type="outline"
						buttonStyle={styles.addAxButton}
						onPress={this.pickImage} />


				<View class="axDesc">
					<TextInput placeholder="心情状态,分享生活点滴"
							   multiline
							   style={styles.axDesc}
							   onChangeText={text => this.handleContentChange(text)}
							   value={content}>
					</TextInput>
				</View>

				<Menu style={styles.menuContent}>
					<MenuTrigger text={`选择社区 ${communityText}`} />
					<MenuOptions>
						{communityList &&
							communityList.map(item => (
								<MenuOption key={item._id}
											text={item.name}
											onSelect={() => this.selectCommunity(item)}  />
							))
						}
					</MenuOptions>
				</Menu>

				<View style={styles.publishButtonContainer} >
					<Button title="发布" onPress={this.publishAx} buttonStyle={styles.publishButton} />
				</View>
			</View>
		);
	}
}

AxAdd.propTypes = {
	axListUser: PropTypes.array,       //用户斧头列表
	communityList: PropTypes.array,    //社区列表
	addAx: PropTypes.func,             //创建斧头
	getCommunityList: PropTypes.func,  //获取社区列表
}

const styles = StyleSheet.create({
	content: {
		padding: 10
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