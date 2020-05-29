import React from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Dimensions,
	TextInput
} from 'react-native';
import {
	Avatar,
	Button
} from 'react-native-elements';
import PropTypes from 'prop-types';
import moment from 'moment';
import {FontAwesome} from '@expo/vector-icons';
import {getUserId} from '../utils';
import Colors from '../constants/Colors';
const {width, height} = Dimensions.get('window');

class AxDetail extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			axDefault: require('../assets/axDefault.png'),
			avatar: require('../assets/avatar.png'),
			id: '',     //斧头id
			userId: '',  //当前登录用户id
			comment: ''  //用户评论
		};

		this.onChangeComment = this.onChangeComment.bind(this);
		this.addComment = this.addComment.bind(this);
		this.replay = this.replay.bind(this);
		this.toUserMainPage = this.toUserMainPage.bind(this);
		this.handleMethod = this.handleMethod.bind(this);
	}

	async componentDidMount() {
		let {id} = this.props.route.params;
		let userId = await getUserId();
		this.setState({id, userId});
		this.props.getAxDetail(id);     //获取详情
		this.handleMethod('addRead');   //添加阅读记录
		this.handleMethod('isPraise');  //是否点赞
		this.handleMethod('isCollect'); //是否收藏
		this.props.getCommentList(id);  //获取评论列表
	}

	componentDidUpdate(prevProps){
		let preId = prevProps.route.params.id;
		let nowId = this.props.route.params.id;
		if (nowId !== preId) {
			this.props.getAxDetail(nowId);
		}
	}

	componentWillUnmount() {

	}

	//操作
	handleMethod(method){
		console.log('handleMethod-->', method);
		let {id, userId} = this.state;
		let params = {
			ax: id,
			user: userId
		};
		this.props[method](params);
	}

	//添加评论
	onChangeComment(text){
		this.setState({
			comment: text
		});
	}

	//发布评论
	addComment(){
		let { id, userId, comment } = this.state;
		let params = {
			content: comment,
			ax: id,
			user: userId
		};
		this.props.addComment(params);
		this.setState({
			comment: ''
		});
	}

	//回复评论
	replay(){
		let { id, userId, comment } = this.state;
		let params = {
			content: comment,
			ax: id,
			user: userId
		};
		// this.props.addComment(params);
	}

	toUserMainPage(id){
		this.props.navigation.navigate('UserMainPage', {id});
	}

	render(){
		let showImg = null;
		const { axDetail, isPraised, commentList, isCollected } = this.props;
		let {avatar} = this.state;

		let ax = axDetail&& axDetail.ax[0];
		if(ax){
			let axUrl = ax? {uri: ax.url}: this.state.axDefault;
			showImg = <Image source={axUrl}
							 style={{width: width, height: width * ax.height / ax.width}}
			/>
		}

		return (
			<View style={{flex: 1}}>
				<ScrollView style={styles.content}>
					{ax && <>
						<View>
							{showImg}
						</View>
						<View style={styles.axInfo}>
							<View style={styles.axInfoAvatar}>
								<Avatar
									size="medium"
									containerStyle={styles.axAvatarItem}
									rounded
									source={axDetail.author.avatar?{uri: axDetail.author.avatar}:avatar}
									onPress={() => this.toUserMainPage(axDetail.author._id)}
								/>
								<View style={styles.axInfoAvatarText}>
									<Text>
										{axDetail.author.nickname?axDetail.author.nickname: axDetail.author.username}
									</Text>
								</View>

							</View>
							{/*<Text>
							{axDetail.title}
						</Text>*/}
							<Text style={styles.axContent}>
								{axDetail.content}
							</Text>
							<Text style={styles.axTime}>
								创建于 {moment(axDetail.create_time).subtract(0, 'days').calendar()}
							</Text>
							<View style={styles.axStatus}>
								<Text style={styles.axRead}>
									浏览 {axDetail.reads}
								</Text>
								<View style={styles.axInfoItem}>
									{isPraised?
										<FontAwesome name="thumbs-o-up"
													 size={20}
													 style={styles.swordInfoItemIcon}
													 color="#f00"
													 onPress={() => this.handleMethod('removePraise')}
										/>
										:<FontAwesome name="thumbs-o-up"
													  size={20}
													  style={styles.swordInfoItemIcon}
													  onPress={() => this.handleMethod('praise')}
										/>
									}
									<Text>({axDetail.praises})</Text>
								</View>
							</View>
							<View>
								{
									isCollected?
										<FontAwesome name="star"
													 size={20}
													 style={styles.swordInfoItemIcon}
													 color={Colors.tintColor}
													 onPress={() => this.handleMethod('removeCollect')}
										/>
										:<FontAwesome name="star-o"
													  size={20}
													  style={styles.swordInfoItemIcon}
													  onPress={() => this.handleMethod('collect')}
										/>
								}
							</View>
						</View>
					</>}

					{commentList.length > 0 &&
					<View style={styles.commentContent}>
						<Text>
							评论 ({ commentList.length })
						</Text>
						{
							commentList.map(item => (
								<View key={item._id} style={styles.comment}>
									<View style={styles.commentAvatar}>
										<Avatar
											containerStyle={styles.commentAvatarItem}
											rounded
											source={item.user.avatar?{uri: item.user.avatar}:avatar}
											onPress={() => this.toUserMainPage(item.user._id)}
										/>
										<Text style={styles.commentUserText}>{item.user.username?item.user.username:item.user.nickname}</Text>
										<Text>{item.user.location?item.user.location: ''}</Text>
									</View>
									<View style={styles.commentItem}>
										<Text style={styles.commentItemText}>{item.content}</Text>
										<Text style={styles.commentItemTime}>
											{moment(item.create_time).format('MMMM Do YYYY, h:mm')}
										</Text>
										<Button title="回复"
												type="clear"
												buttonStyle={styles.commentItemButton}
												titleStyle={{fontSize: 12, color: Colors.grayText}}
												onPress={this.replay} />
									</View>
								</View>
							))
						}
					</View>
					}

				</ScrollView>
				<View style={styles.bottom}>
					<TextInput style={styles.commentInput}
							   placeholder="写评论"
							   onChangeText={text => this.onChangeComment(text)}
							   value={this.state.comment} />

					<Button title="评论" onPress={this.addComment} buttonStyle={styles.commentButton} />
				</View>
			</View>

		);
	}
}

AxDetail.propTypes = {
	axDetail: PropTypes.object,     //斧头详情
	isPraised: PropTypes.bool,      //是否点赞了
	getAxDetail: PropTypes.func,    //获取斧头详情
	addRead: PropTypes.func,        //添加阅读记录
	isPraise: PropTypes.func,       //是否点赞
	praise: PropTypes.func,         //点赞
	removePraise: PropTypes.func,   //取消点赞
	addComment: PropTypes.func,     //添加评论
	removeComment: PropTypes.func,  //删除评论
	getCommentList: PropTypes.func, //获取评论列表
	commentList: PropTypes.array,   //评论列表
	isCollected: PropTypes.bool,    //是否收藏了
	isCollect: PropTypes.func,      //判断是否收藏
	collect: PropTypes.func,        //收藏
	removeCollect: PropTypes.func,  //取消收藏
}

const styles = StyleSheet.create({
	content: {
	},
	axDetailImg: {
		width: width,
		height: height
	},
	axInfo: {
		padding: 20
	},
	axInfoAvatar: {
		flexDirection: 'row',
		marginTop: -35
	},
	axInfoAvatarText: {
		justifyContent: 'flex-end',
	},
	axAvatarItem: {
		marginRight: 5,
		width: 50,
		height: 50,
		borderRadius: 25
	},
	axContent: {
		padding: 5,
		fontSize: 16,
		marginTop: 20
	},
	axTime: {
		fontSize: 12,
		color: Colors.grayText,
		marginTop: 10
	},
	axStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	},
	axRead: {
		fontSize: 15,
		color: Colors.mainText,
		marginRight: 10
	},
	axInfoItem: {
		flexDirection: 'row'
	},
	commentContent: {
		padding: 20,
		paddingBottom: 50
	},
	comment: {
		borderBottomColor: Colors.borderColor,
		borderBottomWidth: 1,
		marginTop: 10
	},
	commentUserText: {
		fontSize: 13,
		color: Colors.grayText
	},
	commentAvatar: {
		flexDirection: 'row',
	},
	commentAvatarItem: {
		marginRight: 5
	},
	commentItem: {
		marginTop: 5,
		paddingLeft: 40
	},
	commentItemText: {
		fontSize: 16
	},
	commentItemTime: {
		fontSize: 14,
		color: Colors.grayText
	},
	commentItemButton: {
		width: 50,
		height: 30
	},
	bottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: Colors.grayBg,
		padding: 8,
		paddingLeft: 10,
		position: 'absolute',
		bottom: 0,
		width: width,
		height: 50,
	},
	commentInput: {
		borderWidth: 1,
		borderColor: Colors.borderColorGray,
		borderRadius: 20,
		width: width - 100,
		paddingLeft: 10
	},
	commentButton: {
		height: 30
	}

});

export default AxDetail;