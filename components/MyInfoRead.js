import React, {Component} from 'react';
import {
	StyleSheet,
	Dimensions,
	ScrollView,
	View,
	Text
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
moment.locale('zh-cn');

import {getUserId} from '../utils';

const {width} = Dimensions.get('window');

class MyInfoRead extends Component {
	constructor(props){
		super(props);
		this.state = {

		};
	}

	async componentDidMount(){
		let id = await getUserId();
		this.props.getReadList(id);
	}

	render() {
		let { readList } = this.props;
		return (
			<View style={styles.readRecord}>
				{readList.length > 0 ?
					<>
					   <Text>浏览记录</Text>
					   <ScrollView horizontal>
						   {
							   readList.map(item => (
								   <View style={styles.readItem} key={item._id}>
									   {/*<Text>{item.sword.sword}</Text>*/}
									   <Text>{ moment(item.update_time).format('MMMM Do YYYY, h:mm:ss') }</Text>
								   </View>
							   ))
						   }
					   </ScrollView>
					</>:
					<View>
						<Text>暂无浏览记录</Text>
					</View>
				}
			</View>
		);
	}
}

MyInfoRead.propTypes = {
	readList: PropTypes.array,   //阅读记录列表
	getReadList: PropTypes.func, //获取阅读记录列表
}

const styles = StyleSheet.create({
	readRecord: {
		height: 150,
		padding: 10
	},
	readItem: {
		height: 100,
		width: 150,
		backgroundColor: '#16a085',
		marginRight: 5,
		padding: 10,
		borderRadius: 5
	},
	username: {
		color: '#16a085',
		fontSize: 20
	},
});

export default MyInfoRead;