import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	RefreshControl,
	Text
} from 'react-native';
import PropTypes from 'prop-types';
import {getUserId} from '../utils';
import Colors from "../constants/Colors";
import FocusUser from "../containers/FocusUser";

const {width, height} = Dimensions.get('window');

class AxFocus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			userId: null
		};

		this.onRefresh = this.onRefresh.bind(this);
		this.toDetail = this.toDetail.bind(this);
	}

	async componentDidMount() {
		this.props.getAxList();
		let id = await getUserId();
		this.setState({userId: id});
	}

	componentDidUpdate(prevProps, prevState){
		console.log('--axfocus-componentDidUpdate--prevState->', prevState);
		let preId = prevState.userId;
		let nowId = this.state.userId;
		if (nowId !== preId) {
			this.props.getAxList();
			this.setState({userId: nowId});
		}
	}

	//下拉刷新
	onRefresh(){
		this.setState({refreshing: true});
		this.props.getAxList().then(res => {
			this.setState({refreshing: false});
		});
	}

	//跳转至详情
	toDetail(id) {
		this.props.navigation.navigate('AxDetail', {id});
	}

	render() {
		const {axList} = this.props;
		let {refreshing, userId} = this.state;
		return (
			<View>
				<FocusUser id={userId} {...this.props} />

				<ScrollView>
					<View style={styles.axContent}>
						{axList.map(item => (
							<TouchableOpacity key={item._id}
											  style={styles.axImgView}
											  onPress={() => this.toDetail(item._id)}>
								<Image source={{uri: item.ax[0].url}} style={styles.axImg}/>
							</TouchableOpacity>
						))}
					</View>
				</ScrollView>

			</View>
		);
	}
}

AxFocus.propTypes = {
	axList: PropTypes.array,        //斧头列表
	getAxList: PropTypes.func, 	    //获取斧头列表
};

const styles = StyleSheet.create({
	axContent: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 10
	},
	axImgView: {
		padding: 3
	},
	axImg: {
		width: width / 3 - 15,
		height: height / 3 - 15,
		borderRadius: 5
	},
	place: {
		width: width,
		height: 25,
		backgroundColor: Colors.tintColor
	}
});

export default AxFocus;