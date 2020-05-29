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
import {getUserId} from '../utils';
import Colors from "../constants/Colors";

const {width, height} = Dimensions.get('window');

class Ax extends React.Component {
	constructor(props) {
		super(props);

		this.toAxAdd = this.toAxAdd.bind(this);
		this.toDetail = this.toDetail.bind(this);
	}

	async componentDidMount() {
		let id = await getUserId();
		this.props.getAxListByUser(id);
	}

	//跳转至创建
	toAxAdd() {
		this.props.navigation.navigate('AxAdd');
	}

	//跳转至详情
	toDetail(id) {
		this.props.navigation.navigate('AxDetail', {id});
	}

	render() {
		const {axListUser} = this.props;
		return (
			<View style={{flex: 1}}>
				<ScrollView>
					{axListUser.length == 0 ?
						<View style={styles.content}>
							<Text>
								暂无内容
								赶快去分享你的生活状态吧
							</Text>
						</View> :
						<View style={styles.axContent}>
							{axListUser.map(item => (
								<TouchableOpacity key={item._id}
												  style={styles.axImgView}
												  onPress={() => this.toDetail(item._id)}>
									<Image source={{uri: item.ax[0].url}} style={styles.axImg}/>
								</TouchableOpacity>
							))}
						</View>
					}
				</ScrollView>
			</View>

		);
	}
}

Ax.propTypes = {
	axListUser: PropTypes.array,     //用户斧头列表
	getAxListByUser: PropTypes.func, //获取用户斧头列表
}

const styles = StyleSheet.create({
	content: {
		height: 200,
		justifyContent: 'center',
		alignItems: 'center'
	},
	axContent: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	axImgView: {
		padding: 5,

	},
	axImg: {
		width: width / 3 - 10,
		height: height / 3 - 20,
		borderRadius: 8
	},
	addAx: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 8,
		position: 'absolute',
		bottom: 0,
		width: width,
	}
});

export default Ax;