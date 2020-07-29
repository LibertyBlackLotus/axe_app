import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Dimensions, Image
} from 'react-native';
import PropTypes from 'prop-types';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Colors from "../../../constants/Colors";
import Info from './Info';
import SettingList from "./SettingList";
import Ax from './Ax';
const {width} = Dimensions.get('window');

const Header = (props) => {
	const {userInfo} = props;
	const avatar = require('../../../assets/avatar.png');
	let uri = userInfo&&userInfo.avatar? {uri: userInfo.avatar}: avatar;
	return (
		<View style={styles.userInfoHeader}>
			<View style={styles.place}></View>
			<View style={styles.headerShow}>
				<Image style={styles.avatar} source={uri} />
				<Text>{userInfo.nickname}</Text>
			</View>
		</View>
	);
}
Header.propTypes = {
	userInfo: PropTypes.object
}

const MyInfoShow = (props) => {
	const {userInfo} = props;

	return (
		<>
			{userInfo &&
			<ParallaxScrollView
				backgroundColor={Colors.tabIconDefault}
				parallaxHeaderHeight={200}
				renderStickyHeader={() => <Header userInfo={userInfo} /> }
				stickyHeaderHeight={65}
				headerBackgroundColor={Colors.whiteBg}
				renderForeground={() => <Info userInfo={userInfo} {...props} /> } >

				<SettingList {...props} />
				<Ax id={userInfo?._id} {...props} />

			</ParallaxScrollView>
			}
		</>
	);
}

MyInfoShow.propTypes = {
	userInfo: PropTypes.object,   //用户信息
	navigation: PropTypes.object
}

const styles = StyleSheet.create({
	userInfoHeader: {
		width: width,
		backgroundColor: Colors.whiteBg,
		height: 65,
		paddingLeft: 20,
		opacity: 0.8
	},
	place: {
		width: width,
		height: 25,
	},
	headerShow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 15,
		marginRight: 10
	},
});

export default MyInfoShow;