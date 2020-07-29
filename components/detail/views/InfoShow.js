import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {
	StyleSheet,
	Text,
	View
} from "react-native";
import Colors from "../../../constants/Colors";
import PropTypes from "prop-types";
import moment from "moment";
import {FontAwesome} from "@expo/vector-icons";
import http from "../../../store/server";
import {API_COLLECT, API_PRAISE} from "../../../store/apiUrl";
import {collection, praise} from "../../../store/actions";

const InfoShow = (props) => {
	const {id, userId, axDetail, isPraised, isCollected} = props;

	useEffect(() => {
		handleMethod('isPraise');
	}, [isPraised]);

	useEffect(() => {
		handleMethod('isCollect');
	}, [isCollected]);

	//操作
	const handleMethod = (method) => {
		console.log('handleMethod-->', method);
		let params = {
			ax: id,
			user: userId
		};
		props[method](params);
	}

	return (<>
		<View style={styles.axStatus}>
			<Text style={styles.axRead}>
				浏览 {axDetail.reads}
			</Text>
			<View style={styles.status}>
				<View style={styles.axInfoItem}>
					{isPraised?
						<FontAwesome name="thumbs-o-up"
									 size={20}
									 style={styles.swordInfoItemIcon}
									 color={Colors.tintColor}
									 onPress={() => handleMethod('removePraise')}
						/>
						:<FontAwesome name="thumbs-o-up"
									  size={20}
									  style={styles.swordInfoItemIcon}
									  onPress={() => handleMethod('praise')}
						/>
					}
					<Text style={styles.praise}>({axDetail.praises})</Text>
				</View>
				<View>
					{isCollected?
						<FontAwesome name="star"
									 size={20}
									 style={styles.swordInfoItemIcon}
									 color={Colors.tintColor}
									 onPress={() => handleMethod('removeCollect')}
						/>
						:<FontAwesome name="star-o"
									  size={20}
									  style={styles.swordInfoItemIcon}
									  onPress={() => handleMethod('collect')}
						/>
					}
				</View>
			</View>

		</View>
		<Text style={styles.axTime}>
			创建于 {moment(axDetail.create_time).calendar('days')}
		</Text>
	</>);
}
InfoShow.propTypes = {
	id: PropTypes.string,
	userId: PropTypes.string,
	axDetail: PropTypes.object,
	isPraised: PropTypes.bool,      //是否点赞了
	isPraise: PropTypes.func,       //是否点赞
	praise: PropTypes.func,         //点赞
	removePraise: PropTypes.func,   //取消点赞
	isCollected: PropTypes.bool,    //是否收藏了
	isCollect: PropTypes.func,      //判断是否收藏
	collect: PropTypes.func,        //收藏
	removeCollect: PropTypes.func,  //取消收藏
}
const styles = StyleSheet.create({
	axTime: {
		fontSize: 12,
		color: Colors.grayText,
		marginTop: 10
	},
	axStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	axRead: {
		fontSize: 15,
		color: Colors.mainText,
		marginRight: 10
	},
	status: {
		flexDirection: 'row',
	},
	axInfoItem: {
		flexDirection: 'row',
		marginRight: 10
	},
	praise: {
		fontSize: 15,
		color: Colors.mainText,
		marginLeft: 5
	}
});

const mapStateToProps = (state) => {
	return {
		isPraised: state.praise.isPraised,      //是否点赞
		isCollected: state.collection.isCollected, //是否收藏
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 点赞 */
		praise: (data) => {
			http({method: 'POST', url: API_PRAISE, data}).then(res => {
				dispatch(praise.praise(res));
			});
		},

		/* 取消点赞 */
		removePraise: (data) => {
			http({method: 'DELETE', url: API_PRAISE, data}).then(res => {
				dispatch(praise.removePraise(res));
			});
		},

		/* 是否点赞 */
		isPraise: (data) => {
			http({method: 'POST', url: API_PRAISE + '/isPraise', data}).then(res => {
				dispatch(praise.isPraise(res));
			});
		},

		/* 收藏 */
		collect: (data) => {
			http({method: 'POST', url: API_COLLECT, data}).then(res => {
				dispatch(collection.collect(res));
			});
		},

		/* 取消收藏 */
		removeCollect: (data) => {
			http({method: 'DELETE', url: API_COLLECT, data}).then(res => {
				dispatch(collection.removeCollect(res));
			});
		},

		/* 是否收藏 */
		isCollect: (data) => {
			http({method: 'POST', url: API_COLLECT + '/isCollected', data}).then(res => {
				console.log('isCollect--res->', res);
				dispatch(collection.isCollect(res));
			});
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoShow);