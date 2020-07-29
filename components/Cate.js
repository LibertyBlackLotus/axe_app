import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

class Cate extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View>
				<Text>Cate</Text>
			</View>

		);
	}
}

Cate.propTypes = {
	axListUser: PropTypes.array,     //用户斧头列表
	getAxListByUser: PropTypes.func, //获取用户斧头列表
}

const styles = StyleSheet.create({
	content: {
		height: 500,
		justifyContent: 'center',
		alignItems: 'center'
	},
	axContent: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	axImgView: {
		padding: 5
	},
	axImg: {
		width: width / 3 - 10,
		height: height / 3 - 10
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

export default Cate;