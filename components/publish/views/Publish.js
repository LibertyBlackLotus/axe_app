import React from 'react';
import {connect} from 'react-redux';
import {
	View,
	StyleSheet,
	Dimensions,
	Text
} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

class Publish extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}
	render() {
		return (
			<View style={styles.axContent}>
				<Text>publish</Text>
			</View>
		);
	}
}

Publish.propTypes = {
	axList: PropTypes.array,        //斧头列表
	getAxList: PropTypes.func, 	    //获取斧头列表
};

const styles = StyleSheet.create({
});

const mapStateToProps = (state) => {
	return {
		axList: state.ax.axList,             //所有斧头列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取所有斧头 */
		getAxList: () => {
			return http({url: API_AX}).then(res => {
				dispatch(ax.getAxList(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish);