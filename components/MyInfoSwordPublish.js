import React, {Component} from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Text,
	Dimensions,
	TouchableOpacity,
	Image
} from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontAwesome} from '@expo/vector-icons';
import {getUserId} from '../utils';

const {	width } = Dimensions.get('window');

class MyInfoSwordPublish extends Component {
	constructor(props){
		super(props);
		this.state = {
			resizeMode: 'stretch',
			paused: true,
			avatar: require('../assets/avatar.png'),
		};

		this.showVideo = this.showVideo.bind(this);
	}

	async componentDidMount() {
		let id = await getUserId();
		this.props.getSwordListByUser(id);     //获取宝剑列表
	}

	//播放视频
	showVideo(item){
		this.props.navigation.navigate('SwordVideo', { id: item._id } );
	}

	render() {
		const {userSwordList} = this.props;
		return (
			<ScrollView>
				<View style={styles.swordContent}>
					{ userSwordList.map(item =>
						<View key={item._id} style={styles.swordItem}>
							<TouchableOpacity onPress={() => this.showVideo(item)} >
								<Video
									source={{uri: item.sword}}
									paused={this.state.paused}        //暂停
									resizeMode={this.state.resizeMode}//缩放模式
									style={styles.backgroundVideo}
								/>
							</TouchableOpacity>
							<View style={styles.swordUserAvatar} >
								<Image source={item.user.avatar? {uri: item.user.avatar}: this.state.avatar} style={styles.swordUser}  />
								<Text style={styles.swordInfoItemText}>{item.user.nickname?item.user.nickname:item.user.username}</Text>
							</View>
							<View style={styles.swordInfo}>
								<View style={styles.swordInfoItem}>
									<FontAwesome name="eye"
												 size={15}
												 color="#16a085"
												 style={styles.swordInfoItemIcon} />
									<Text style={styles.swordInfoItemText}>{item.reads}</Text>
								</View>
								<View style={styles.swordInfoItem}>
									<FontAwesome name="thumbs-o-up"
												 size={15}
												 color="#16a085"
												 style={styles.swordInfoItemIcon} />
									<Text style={styles.swordInfoItemText}>{item.praises}</Text>
								</View>
							</View>
						</View>
					)}
				</View>
			</ScrollView>
		);
	}
}
MyInfoSwordPublish.propTypes = {
	userSwordList: PropTypes.array,    //用户宝剑列表
	getSwordListByUser: PropTypes.func, //获取用户宝剑列表
}

const styles = StyleSheet.create({
	swordContent: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	swordItem: {
		width: width / 3,
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 1,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backgroundVideo: {
		width: width / 3.5,
		height: (width * 16 / 9) / 3.5,
		borderRadius: 5,
	},
	swordInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		marginBottom: 5,
		paddingLeft: 10
	},
	swordInfoItem: {
		flexDirection: 'row',
		alignItems: 'center',
		color: '#16a085',
		marginRight: 10
	},
	swordInfoItemIcon: {
		marginRight: 5
	},
	swordInfoItemText: {
		color: '#16a085'
	},
	swordUserAvatar: {
		position: 'absolute',
		bottom: 12,
		left: 10
	},
	swordUser: {
		width: 20,
		height: 20,
		borderRadius: 10,
		marginRight: 5
	}
});

export default MyInfoSwordPublish;