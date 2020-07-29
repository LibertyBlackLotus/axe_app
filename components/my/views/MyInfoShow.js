import React, {Component, useEffect, useState} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	ImageBackground,
	Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Colors from "../../constants/Colors";
import {ListItem} from "react-native-elements";
import Ax from '../../containers/Ax';

const {width} = Dimensions.get('window');

//我的信息
const InfoShow = (props) => {
	const avatar = require('../../assets/avatar.png');
	const bgImg = require('../../assets/show.jpg');
	const {userInfo, navigation} = props;
	let uri = userInfo&&userInfo.avatar? {uri: userInfo.avatar}: avatar;

	const toSettings = () => {
		navigation.navigate('MyInfoSettings');
	}

	return (
		<>
			{userInfo &&
			<TouchableOpacity style={styles.myInfo} onPress={toSettings}>
				<ImageBackground source={bgImg} style={styles.bgImage}>
					<View style={styles.avatarContent}>
						<Image style={styles.avatar}
							   source={uri} />
						<Text style={styles.username}>{userInfo.username}</Text>
					</View>
				</ImageBackground>
			</TouchableOpacity>
			}
		</>
	);
}
InfoShow.propTypes = {
	userInfo: PropTypes.object,
	navigation: PropTypes.object
}

//设置列表
const SettingList = (props) => {
	const {navigation} = props;
	const list = [
		{
			title: '历史'
		},
		{
			title: '关注',
		},
		{
			title: '收藏'
		},
	];

	const toPage = (i) => {
		switch(i){
		case 0:
			navigation.navigate('History');
			break;
		case 1:
			navigation.navigate('Focus');
			break;
		case 2:
			navigation.navigate('Collection');
			break;
		default:
		}
	};

	return (
		list.map((item, i) => (
			<ListItem
				key={i}
				title={item.title}
				chevron
				onPress={() => toPage(i)}
			/>
		))
	);
}

const MyInfoShow = (props) => {
	const {userInfo} = props;
	return (
		<>
			{userInfo &&
			<ParallaxScrollView
				headerBackgroundColor="#333"
				backgroundColor={Colors.tabIconDefault}
				contentBackgroundColor={Colors.grayBg}
				parallaxHeaderHeight={200}
				renderForeground={() => <InfoShow userInfo={userInfo} {...props} /> } >

				<SettingList {...props} />
				<Ax {...props} />

			</ParallaxScrollView>
			}
		</>
	);

}
/*class MyInfoShow extends Component {
	constructor(props){
		super(props);
		this.state = {
			avatar: require('../assets/avatar.png'),
			bgImg: require('../assets/show.jpg')
		};

		this.toSettings = this.toSettings.bind(this);
		this.toPage = this.toPage.bind(this);
	}

	toSettings(){
		this.props.navigation.navigate('MyInfoSettings');
	}

	toPage(i){
		switch(i){
		case 0:
			this.props.navigation.navigate('History');
			break;
		case 1:
			this.props.navigation.navigate('Focus');
			break;
		case 2:
			this.props.navigation.navigate('Collection');
			break;
		default:
		}
	}

	render() {
		let userInfo = JSON.parse(this.props.userInfo);
		let uri = userInfo&&userInfo.avatar? {uri: userInfo.avatar}: this.state.avatar;
		return (
			<>
				{userInfo &&
					<ParallaxScrollView
						headerBackgroundColor="#333"
						backgroundColor={Colors.tabIconDefault}
						contentBackgroundColor={Colors.grayBg}
						parallaxHeaderHeight={200}
						renderForeground={() => (
							<TouchableOpacity style={styles.myInfo} onPress={this.toSettings}>
								<ImageBackground source={this.state.bgImg} style={styles.bgImage}>
									<View style={styles.avatarContent}>
										<Image style={styles.avatar}
											   source={uri} />
										<Text style={styles.username}>{userInfo.username}</Text>
									</View>
								</ImageBackground>

							</TouchableOpacity>
						)}>
						{list.map((item, i) => (
							<ListItem
								key={i}
								title={item.title}
								chevron
								onPress={() => this.toPage(i)}
							/>
						))}
					</ParallaxScrollView>
				}
				{/!*{
					userInfo &&
					<TouchableOpacity style={styles.myInfo} onPress={this.toSettings}>
						<ImageBackground source={this.state.bgImg} style={styles.bgImage}>
							<View style={styles.avatarContent}>
								<Image style={styles.avatar}
									   source={uri} />
								<Text style={styles.username}>{userInfo.username}</Text>
							</View>
						</ImageBackground>

					</TouchableOpacity>
				}
				{list.map((item, i) => (
					<ListItem
						key={i}
						title={item.title}
						chevron
						onPress={() => this.toPage(i)}
					/>
				))}*!/}
			</>
		);
	}
}*/

MyInfoShow.propTypes = {
	userInfo: PropTypes.object,   //用户信息
	navigation: PropTypes.object
}

const styles = StyleSheet.create({
	myInfo: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarContent: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		padding: 10
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 10
	},
	username: {
		color: Colors.mainText,
		fontSize: 20
	},
	bgImage: {
		width: width,
		height: 200,
		justifyContent: 'flex-end',
		alignItems: 'center',
	}
});

export default MyInfoShow;