import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {
	View,
	ScrollView,
	StyleSheet,
	Dimensions,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import Search from 'react-native-search-box';

import Colors from "../../../constants/Colors";
import AxCommunity from "./AxCommunity";
import http from "../../../store/server";
import {API_COMMUNITY} from "../../../store/apiUrl";
import {community} from "../../../store/actions";

const {width} = Dimensions.get('window');

const Community = (props) => {
	const {communityList, getCommunityList} = props;

	const [communityId, setCommunityId] = useState('');
	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		getCommunityList().then(res => {
			let firstId = res[0]._id;
			setCommunityId(firstId);
		});
	}

	//选择社区
	const selectCommunity = (id) => {
		setCommunityId(id);
	}

	return (
		<View style={{flex: 1}}>
			<View style={styles.place}></View>
			<Search
				cancelButtonWidth={50}
				placeholder={'搜索'}
				backgroundColor={Colors.tintColor}
			/>
			<View style={styles.container}>
				<View style={styles.menu}>
					<ScrollView showsVerticalScrollIndicator={false}>
						{communityList !== '' && communityList.map(item => (
							<ListItem key={item._id}
									  title={item.name}
									  containerStyle={communityId == item._id&&styles.containerStyle}
									  titleStyle={communityId == item._id&&styles.titleStyle}
									  onPress={() => selectCommunity(item._id)}
							/>
						))}
					</ScrollView>
				</View>

				{communityId !== '' &&
					<View style={styles.content}>
						<AxCommunity id={communityId} {...props}></AxCommunity>
					</View>
				}
			</View>
		</View>
	);
}

Community.propTypes = {
	communityList: PropTypes.array,     //社区列表
	getCommunityList: PropTypes.func,   //获取社区列表
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flex: 1
	},
	menu: {
		flex: 1,
	},
	content: {
		flex: 4
	},
	containerStyle: {
		backgroundColor: Colors.tintColor
	},
	titleStyle: {
		color: Colors.tabBar,
	},
	place: {
		width: width,
		height: 25,
		backgroundColor: Colors.tintColor
	},
});

const mapStateToProps = (state) => {
	return {
		communityList: state.community.communityList,   //社区列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取社区列表 */
		getCommunityList: () => {
			return http({url: API_COMMUNITY}).then(res => {
				dispatch(community.getCommunityList(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Community);