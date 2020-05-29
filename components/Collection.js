import React from 'react';
import {
	View,
	Button,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {getUserId} from '../utils';
import Colors from '../constants/Colors';
const {width, height} = Dimensions.get('window');

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
		this.props.navigation.navigate('AxDetail', {id});
	}

	render() {
		const {collectionList} = this.props;
		return (
			<ScrollView>
				{collectionList.length == 0 ?
					<View style={styles.content}>
						<Text>
							暂无内容
							赶快去分享你的生活状态吧
						</Text>
					</View> :
					<View style={styles.axContent}>
						{collectionList.map(item => (
							<TouchableOpacity key={item._id}
											  style={styles.axReadView}
											  onPress={() => this.toDetail(item.ax._id)}>
								<Image source={{uri: item.ax.ax[0].url}} style={styles.axImg} />
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

export default Collection;