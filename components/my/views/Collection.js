import React from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {getUserId} from '../../../utils';
import Colors from '../../../constants/Colors';
import http from "../../../store/server";
import {API_COLLECT} from "../../../store/apiUrl";
import {collection} from "../../../store/actions";
import {connect} from "react-redux";

class Collection extends React.Component {
	constructor(props) {
		super(props);

		this.toDetail = this.toDetail.bind(this);
	}

	async componentDidMount() {
		let id = await getUserId();
		this.props.getCollection(id);
	}

	//跳转至详情
	toDetail(id) {
		this.props.navigation.navigate('Detail', {id});
	}

	render() {
		const {collectionList} = this.props;
		return (
			<ScrollView>
				{collectionList.length == 0 ?
					<View style={styles.content}>
						<Text>
							暂无内容
							赶快去收藏吧
						</Text>
					</View> :
					<View style={styles.axContent}>
						{collectionList.map(item => (
							<TouchableOpacity key={item._id}
											  style={styles.axReadView}
											  onPress={() => this.toDetail(item.ax._id)}>
								<Image source={{uri: item.ax.ax.name}} style={styles.axImg} />
								<View style={styles.axReadInfo} >
									<Text style={styles.axReadInfoTitle} >{item.ax.title}</Text>
									<Text style={styles.axReadInfoTime}>
										{moment(item.ax.update_time).fromNow()}
									</Text>
								    {/*<Text style={styles.axReadInfoContent}>{item.ax.content}</Text>*/}
								</View>
							</TouchableOpacity>
						))}
					</View>
				}
			</ScrollView>
		);
	}
}

Collection.propTypes = {
	collectionList: PropTypes.array, //用户收藏列表
	getCollection: PropTypes.func,   //获取用户收藏列表
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
		collectionList: state.collection.collectionList,     //用户收藏列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取用户收藏*/
		getCollection: (id) => {
			http({url: API_COLLECT + `/user/${id}`}).then(res => {
				dispatch(collection.getCollection(res));
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);