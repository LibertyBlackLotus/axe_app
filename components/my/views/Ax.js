import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	RefreshControl,
	FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Colors from "../../../constants/Colors";
import {getUserId} from '../../../utils';
import http from "../../../store/server";
import {API_AX} from "../../../store/apiUrl";
import {ax} from "../../../store/actions";
import LottieView from "lottie-react-native";

const {width} = Dimensions.get('window');

const Item = (props) => {
	const {item, navigation} = props;

	//跳转至详情
	const toDetail = id => {
		navigation.navigate('Detail', {id});
	}

	return (
		<TouchableOpacity key={item._id}
						  style={styles.axImgView}
						  activeOpacity={0.8}
						  onPress={() => toDetail(item._id)}>
			<Text style={styles.title}>
				{item.content}
			</Text>
			<Text style={styles.time}>
				{moment(item.create_time).calendar('days')}
			</Text>
			<Image source={{uri: item.ax.name}} style={styles.axImg}/>
		</TouchableOpacity>
	);
}
Item.propTypes = {
	item: PropTypes.object,
	navigation: PropTypes.object
}

const Ax = (props) => {
	let {axListUser, getAxListByUser, userAxAllPage, id} = props;
	const limit = 5;
	useEffect(() => {
		getData();
	}, [id]);

	let [page, setPage] = useState(1);
	useEffect(() => {
		console.log('---useEffect---->');
		getData();
	}, [page]);

	const [refreshing, setRefreshing] = useState(false);
	const [more, setMore] = useState(true);

	const [isCanLoadMore, setIsCanLoadMore] = useState(false);

	const getData = () => {
		console.log('---getData--->');
		getAxListByUser(id, page, limit).then(() => {
			setRefreshing(false);
		});
	}

	const reachEnd = () => {
		console.log('--reachEnd--page-->', page);
		console.log('--reachEnd--isCanLoadMore-->', isCanLoadMore);
		if(isCanLoadMore){
			if(page < userAxAllPage){
				setPage(++page);
			}else{
				console.log('--到底了->', page);
				setMore(false);
			}
			setIsCanLoadMore(false);
		}
	}

	const refresh = () => {
		console.log('---refresh--->');
		setRefreshing(true);
		getData();
	}

	const footer = () => {
		if(more){
			return (<View style={styles.dixian}>
				<LottieView source={require('../../../animation/loading.json')} autoPlay loop />
			</View>);
		}else{
			return (<View style={styles.dixian}>
				<LottieView source={require('../../../animation/baseLine.json')} autoPlay />
				<Text style={styles.dixianText}>~~木有了~~</Text>
			</View>);
		}
	};

	if(axListUser.length === 0){
		return (
			<View style={styles.content}>
				<Text>
					暂无内容
					赶快去分享你的生活状态吧
				</Text>
			</View>
		);
	}

	return (
		<>
			<View style={styles.timeline}>
				<Text>时光机</Text>
				<LottieView source={require('../../../animation/man-and-phone.json')} autoPlay loop />
			</View>
			<FlatList
				data={axListUser}
				renderItem={({item}) => <Item item={item} {...props} /> }
				keyExtractor={item => item._id}
				onEndReached={reachEnd}
				onEndReachedThreshold={0.01}
				onContentSizeChange={() => {
					setIsCanLoadMore(true) // flatview内部组件布局完成以后会调用这个方法
				}}
				ListFooterComponent={footer}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={refresh}
						title="加载中..."/>
				}
			/>
		</>
	);
};

Ax.propTypes = {
	axListUser: PropTypes.array,     //用户斧头列表
	getAxListByUser: PropTypes.func, //获取用户斧头列表
	userAxAllPage: PropTypes.number,
	navigation: PropTypes.object,
	id: PropTypes.string
}

const styles = StyleSheet.create({
	content: {
		height: 200,
		justifyContent: 'center',
		alignItems: 'center'
	},
	axImgView: {
		width: width,
		borderTopColor: Colors.borderColor,
		borderTopWidth: 1,
		paddingTop: 15,
		paddingBottom: 8
	},
	title: {
		paddingLeft: 30,
		fontSize: 20,
		color: Colors.tintColor
	},
	time: {
		paddingLeft: 30,
		fontSize: 10,
		color: Colors.grayText
	},
	axImg: {
		width: width,
		height: 250,
		resizeMode: 'center',
		borderRadius: 8,
		marginTop: 8
	},
	addAx: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 8,
		position: 'absolute',
		bottom: 0,
		width: width,
	},
	timeline: {
		height: 200,
		alignItems: 'center',
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: Colors.borderColor2,
	},
	dixian: {
		height: 80,
		alignItems: 'center',
		marginTop: 10
	},
	dixianText: {
		color: Colors.grayText
	}
});

const mapStateToProps = (state) => {
	return {
		axListUser: state.ax.axListUser,     //用户斧头列表
		userAxAllPage: state.ax.userAxAllPage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取用户下所有斧头 */
		getAxListByUser: (id, page, limit) => {
			return http({url: API_AX + `/user`, params: {id, page, limit}}).then(res => {
				dispatch(ax.getAxListByUser(res.collections, res.allPage));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Ax);