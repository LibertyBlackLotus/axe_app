import React from "react";
import {
	Image,
	ImageBackground,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../../../constants/Colors";
const {width} = Dimensions.get('window');

const Info = (props) => {
	const avatar = require('../../../assets/avatar.png');
	const bgImg = require('../../../assets/show1.jpg');
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
						<Text style={styles.username}>{userInfo.nickname}</Text>
					</View>
				</ImageBackground>
			</TouchableOpacity>
			}
		</>
	);
};

Info.propTypes = {
	userInfo: PropTypes.object,
	navigation: PropTypes.object
};

const styles = StyleSheet.create({
	myInfo: {
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

export default Info;