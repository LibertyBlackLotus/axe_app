import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {getUserId} from '../../../utils';
import Colors from '../../../constants/Colors';
import http from "../../../store/server";
import {API_AX, API_AX_READ, API_COMMENT} from "../../../store/apiUrl";
import {ax, comment} from "../../../store/actions";
import ImgShow from "./ImgShow";
import UserShow from './UserShow';
import InfoShow from "./InfoShow";
import AddComment from './AddComment';
import Comments from "./Comments";

const {width, height} = Dimensions.get('window');

const Header = (props) => {
	const {axDetail, navigation} = props;

	const returnBack = () => {
		navigation.goBack();
	}

	return (
		<View style={styles.detailHeader}>
			<View style={styles.place}></View>
			<View style={styles.headerShow}>
				<TouchableOpacity onPress={returnBack}>
					<AntDesign name="arrowleft"	size={25} />
				</TouchableOpacity>
				<Text style={styles.headerShowText}>{axDetail.content}</Text>
			</View>
		</View>
	);
}
Header.propTypes = {
	axDetail: PropTypes.object,
	navigation: PropTypes.object,
}

class Detail extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			id: '',     //斧头id
			userId: '',  //当前登录用户id
		};
		this.handleMethod = this.handleMethod.bind(this);
	}

	async componentDidMount() {
		let {id} = this.props.route.params;
		let userId = await getUserId();
		this.setState({id, userId});
		this.props.getAxDetail(id);     //获取详情
		this.handleMethod('addRead');   //添加阅读记录
	}

	componentDidUpdate(prevProps){
		let preId = prevProps.route.params.id;
		let nowId = this.props.route.params.id;
		if (nowId !== preId) {
			this.props.getAxDetail(nowId);
		}
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

	render(){
		const { axDetail } = this.props;
		let {id, userId } = this.state;
		let ax = axDetail&& axDetail.ax;
		let imgHeight = width * ax?.h / ax?.w;

		if(!axDetail || !id || !userId){
			return (
				<View style={styles.loading}>
					<LottieView source={require('../../../animation/loading1.json')} autoPlay loop />
				</View>
			);
		}

		return (
			<View style={{flex: 1}}>
				<ParallaxScrollView
					backgroundColor={Colors.tabIconDefault}
					contentBackgroundColor={Colors.borderColor}
					parallaxHeaderHeight={imgHeight}
					renderStickyHeader={() => <Header axDetail={axDetail} {...this.props} /> }
					stickyHeaderHeight={65}
					headerBackgroundColor={Colors.whiteBg}
					renderForeground={() => <ImgShow ax={axDetail.ax} />}>
					<View>
						<View style={styles.axInfo}>
							<UserShow axDetail={axDetail} {...this.props}  />
							<Text style={styles.axContent}>
								{axDetail.content}
							</Text>
							<InfoShow axDetail={axDetail} id={id} userId={userId} {...this.props}  />
						</View>
						<Comments id={id} userId={userId} {...this.props} />
					</View>
				</ParallaxScrollView>

				<AddComment id={id} userId={userId} />

			</View>
		);
	}
}

Detail.propTypes = {
	axDetail: PropTypes.object,     //斧头详情
	getAxDetail: PropTypes.func,    //获取斧头详情
	addRead: PropTypes.func,        //添加阅读记录
	removeComment: PropTypes.func,  //删除评论
	route: PropTypes.object,
	navigation: PropTypes.object
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
	axAvatarItem: {
		marginRight: 5,
		width: 50,
		height: 50,
		borderRadius: 25
	},
	axContent: {
		padding: 8,
		fontSize: 18,
		color: Colors.tintColor,
		marginTop: 20,
		minHeight: 150,
		borderRadius: 8,
		backgroundColor: Colors.borderColor2
	},
	loading: {
		height: 80,
		alignItems: 'center',
		marginTop: 10
	},
	detailHeader: {
		width: width,
		backgroundColor: Colors.whiteBg,
		height: 65,
		paddingLeft: 20,
		opacity: 0.8,
	},
	place: {
		width: width,
		height: 25,
	},
	headerShow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerShowText: {
		color: Colors.tintColor,
		fontSize: 18,
		fontWeight: '600',
		marginLeft: 10
	}
});

const mapStateToProps = (state) => {
	return {
		axDetail: state.ax.axDetail,            //斧头详情
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取斧头详情 */
		getAxDetail: (id) => {
			http({url: API_AX + `/${id}`}).then(res => {
				dispatch(ax.getAxDetail(res));
			});
		},

		/* 添加阅读纪录 */
		addRead: (data) => {
			http({method: 'POST', url: API_AX_READ, data}).then(res => {

			});
		},

		/* 删除评论 */
		removeComment: (data) => {
			http({method: 'DELETE', url: API_COMMENT, data}).then(res => {
				dispatch(comment.removeComment(res));
			});
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);