import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	RefreshControl,
	Text,
	FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import Colors from "../../../constants/Colors";
import http from "../../../store/server";
import {API_AX} from "../../../store/apiUrl";
import {ax} from "../../../store/actions";

const {width} = Dimensions.get('window');

const Item = (props) => {
	const {item, navigation} = props;
	if(!item){
		return null;
	}
	const avatar = require('../../../assets/avatar.png');
	let uri = item.author.avatar? {uri: item.author.avatar}: avatar;

	//跳转至详情
	const toDetail = (id) => {
		navigation.navigate('Detail', {id});
	}

	//跳转至用户主页
	const toMainPage = (id) => {
		navigation.navigate('UserMainPage', {id});
	}

	return (
		<View style={styles.itemContent}>
			<TouchableOpacity style={styles.axImgView}
							  activeOpacity={0.8}
							  onPress={() => toDetail(item._id)}>
				<Image source={{uri: item.ax.name}} style={styles.axImg}/>
			</TouchableOpacity>

			<TouchableOpacity style={styles.info}
							  onPress={() => toMainPage(item.author._id)} >
				<Image style={styles.avatar} source={uri} />
				<Text>{item.author.nickname}</Text>
			</TouchableOpacity>
		</View>

	);
}
Item.propTypes = {
	item: PropTypes.object,
	navigation: PropTypes.object
}

const AxCommunity = (props) => {
	const {id, axListCommunity, getAxListByCommunity} = props;

	useEffect(() => {
		getAxListByCommunity(id);
	}, [id]);

	const [refreshing, setRefreshing] = useState(false);

	//下拉刷新
	const onRefresh = () => {
		setRefreshing(true);
		getAxListByCommunity(id).then( () => {
			setRefreshing(false);
		});
	}

	const refresh = () => {
		setRefreshing(true);
		getData();
	}

	/*
const reachEnd = (e) => {
console.log('--reachEnd--page-->', page);
console.log('--reachEnd--allPage-->', allPage);
if(page < allPage){
	setPage(++page);
}else{
	console.log('--到底了->', page);
	setMore(false);
}
}
*/

	if(axListCommunity.length === 0){
		return (
			<View style={styles.noContent}>
				<Text>无内容</Text>
			</View>
		);
	}

	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
			{/*<View style={styles.axContent}>
				{axListCommunity.map(item => <Item key={item._id} item={item} {...props} />)}
			</View>*/}
			<FlatList
				style={styles.content}
				data={axListCommunity}
				renderItem={({item}) => <Item item={item} {...props} />}
				numColumns={2}
				keyExtractor={item => item._id}
				// onEndReached={reachEnd}
				onEndReachedThreshold={0.01}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={refresh}
						title="加载中..."/>
				}
			/>
		</ScrollView>
	);
}

AxCommunity.propTypes = {
	id: PropTypes.string,
	axListCommunity: PropTypes.array,     //社区斧头列表
	getAxListByCommunity: PropTypes.func, //获取社区斧头列表
};

const styles = StyleSheet.create({
	noContent: {
		height: 600,
		alignItems: 'center',
		justifyContent: 'center'
	},
	content: {
		padding: 8
	},
	axContent: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	itemContent: {
		paddingBottom: 15,
	},
	axImgView: {
		marginBottom: 3,
		padding: 5
	},
	axImg: {
		width: width / 3 + 10,
		height: 180,
		borderRadius: 8,
		// resizeMode: 'contain'
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		marginRight: 5,
		width: 30,
		height: 30,
		borderRadius: 15
	}
});

const mapStateToProps = (state) => {
	return {
		axListCommunity: state.ax.axListCommunity,  //社区斧头列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取社区下斧头列表 */
		getAxListByCommunity: (id) => {
			return http({url: API_AX + `/community/${id}`}).then(res => {
				dispatch(ax.getAxListByCommunity(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AxCommunity);