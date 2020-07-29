import React, { useState, useEffect } from 'react';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
	RefreshControl,
	FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import Colors from "../../../constants/Colors";

const {width} = Dimensions.get('window');

const Item = (props) => {
	const {item, navigation} = props;

	//跳转至详情
	const toDetail = (id) => {
		navigation.navigate('Detail', {id});
	}

	return(
		<TouchableOpacity style={styles.axImgView}
						  activeOpacity={0.8}
						  onPress={() => toDetail(item._id)}>
			<Image source={{uri: item.ax.name}} style={styles.axImg}/>
		</TouchableOpacity>
	);
};
Item.propTypes = {
	item: PropTypes.object,
	navigation: PropTypes.object
}

const AxList = (props) => {
	const {id, axList, allPage, getAxList} = props;
	const limit = 15;

	let [page, setPage] = useState(1);
	useEffect(() => {
		getData();
	}, [page]);

	let [more, setMore] = useState(true);
	let [refreshing, setRefreshing] = useState(false);

	function getData(){
		getAxList({id, page, limit}).then(() => {
			setRefreshing(false);
		});
	}

	function refresh(){
		setRefreshing(true);
		getData();
	}

	function reachEnd(){
		if(page < allPage){
			setPage(++page);
		}else{
			console.log('--到底了->', page);
			setMore(false);
		}
	}

	// eslint-disable-next-line react/prop-types
	const renderItem = ({ item }) => (
		<Item item={item} {...props} />
	);

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

	if(axList.length === 0){
		return (
			<View style={styles.content}>
				<Text>暂无内容</Text>
			</View>)
	}

	return (
		<FlatList
			style={styles.axContent}
			data={axList}
			renderItem={renderItem}
			numColumns={3}
			keyExtractor={item => item._id}
			onEndReached={reachEnd}
			onEndReachedThreshold={0.01}
			ListFooterComponent={footer}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={refresh}
					title="加载中..."/>
			}
		/>
	);
}

AxList.propTypes = {
	id: PropTypes.string,
	axList: PropTypes.arrayOf(PropTypes.object).isRequired,  //斧头列表
	allPage: PropTypes.number,                               //斧头列表总页数
	getAxList: PropTypes.func.isRequired, 	                 //获取斧头列表
};

AxList.defaultProps = {
	axList: [],
	allPage: 0
};

const styles = StyleSheet.create({
	axContent: {
		paddingTop: 10
	},
	axImgView: {
		padding: 2
	},
	axImg: {
		width: width / 3 - 8,
		height: 160,
		borderRadius: 15,
		resizeMode: 'contain'
	},
	place: {
		width: width,
		height: 25,
		backgroundColor: Colors.tintColor
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

export default AxList;