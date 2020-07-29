import React, { useEffect } from 'react';
import {connect} from "react-redux";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {getUserId} from '../../../utils';
import Colors from '../../../constants/Colors';
import http from "../../../store/server";
import {API_AX_READ} from "../../../store/apiUrl";
import {read} from "../../../store/actions";

const Item = (props) => {
	const { item, navigation } = props;

	//跳转至详情
	const toDetail = (id) => {
		navigation.navigate('Detail', {id});
	}

	return (
		<TouchableOpacity style={styles.axReadView}
						  onPress={() => toDetail(item.ax._id)}>
			<Image source={{uri: item.ax.ax.name}} style={styles.axImg} />
			<View style={styles.axReadInfo} >
				<Text style={styles.axReadInfoTitle} >{item.ax.title}</Text>
				<Text style={styles.axReadInfoTime}>
					{moment(item.ax.update_time).calendar('days')}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
Item.propTypes = {
	item: PropTypes.object,
	navigation: PropTypes.object
}


const History = (props) => {
	const { axReadListUser, getAxReadListByUser } = props;

	useEffect(() => {
		async function getId(){
			let userId = await getUserId();
			return userId;
		}
		getId().then(id => {
			getAxReadListByUser(id);
		});
	}, []);

	if(axReadListUser.length === 0 ){
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
		<ScrollView>
			<View style={styles.axContent}>
				{axReadListUser.map(item => <Item key={item._id} item={item} {...props} />)}
			</View>
		</ScrollView>
	);
}

History.propTypes = {
	axReadListUser: PropTypes.array,     //用户浏览记录
	getAxReadListByUser: PropTypes.func, //获取用户浏览记录
	navigation: PropTypes.object
}

const styles = StyleSheet.create({
	content: {
		height: 500,
		justifyContent: 'center',
		alignItems: 'center'
	},
	axContent: {
		padding: 5
	},
	axReadView: {
		padding: 5,
		height: 100,
		marginBottom: 5,
		flexDirection: 'row'
	},
	axImg: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginRight: 10
	},
	axReadInfo: {
		justifyContent: 'center',
	},
	axReadInfoTitle: {
		fontSize: 16
	},
	axReadInfoContent: {
		fontSize: 13,
		color: Colors.grayText
	},
	axReadInfoTime: {
		fontSize: 14,
		color: Colors.mainText
	}
});

const mapStateToProps = (state) => {
	return {
		axReadListUser: state.read.axReadListUser,     //用户浏览记录
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取用户浏览记录*/
		getAxReadListByUser: (id) => {
			http({url: API_AX_READ + `/user/${id}`}).then(res => {
				dispatch(read.getAxReadListByUser(res));
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(History);