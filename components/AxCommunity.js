import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from "../constants/Colors";

const {width, height} = Dimensions.get('window');

class AxCommunity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			id: ''
		};

		this.onRefresh = this.onRefresh.bind(this);
		this.toDetail = this.toDetail.bind(this);
	}

	componentDidMount() {
		let {id} = this.props;
		if(id){
			this.setState({id});
			this.props.getAxListByCommunity(id);
		}
	}

	componentDidUpdate(prevProps) {
		let preId = prevProps.id;
		let nowId = this.props.id;
		if (nowId !== preId) {
			this.setState({id: nowId});
			this.props.getAxListByCommunity(nowId);
		}
	}

	//下拉刷新
	onRefresh(){
		this.setState({refreshing: true});
		let {id} = this.state;
		this.props.getAxListByCommunity(id).then(res => {
			this.setState({refreshing: false});
		});
	}

	//跳转至详情
	toDetail(id) {
		this.props.navigation.navigate('AxDetail', {id});
	}

	render() {
		const {axListCommunity} = this.props;
		let {refreshing} = this.state;
		return (
			<ScrollView refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
			}>
				<View style={styles.axContent}>
					{axListCommunity && axListCommunity.map(item => (
						<TouchableOpacity key={item._id}
										  style={styles.axImgView}
										  onPress={() => this.toDetail(item._id)}>
							<Image source={{uri: item.ax[0].url}} style={styles.axImg}/>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		);
	}
}

AxCommunity.propTypes = {
	axListCommunity: PropTypes.array,     //社区斧头列表
	getAxListByCommunity: PropTypes.func, //获取社区斧头列表
};

const styles = StyleSheet.create({
	axContent: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 5
	},
	axImgView: {
		padding: 3
	},
	axImg: {
		width: width / 4 - 15,
		height: height / 4 - 15,
		borderRadius: 5
	},
	place: {
		width: width,
		height: 25,
		backgroundColor: Colors.tintColor
	}
});

export default AxCommunity;