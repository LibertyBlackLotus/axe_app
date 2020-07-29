import React from "react";
import {
	StyleSheet,
	View,
	Text
} from "react-native";
import PropTypes from "prop-types";
import {Avatar} from "react-native-elements";

const UserShow = (props) => {
	const {axDetail, navigation} = props;
	const avatar = require('../../../assets/avatar.png');

	const toUserMainPage = (id) => {
		navigation.navigate('UserMainPage', {id});
	}

	return (
		<View style={styles.axInfoAvatar}>
			<Avatar
				size="medium"
				containerStyle={styles.axAvatarItem}
				rounded
				source={axDetail.author.avatar?{uri: axDetail.author.avatar}:avatar}
				onPress={() => toUserMainPage(axDetail.author._id)}
			/>
			<View style={styles.axInfoAvatarText}>
				<Text>
					{axDetail.author.nickname?axDetail.author.nickname: axDetail.author.username}
				</Text>
			</View>
		</View>);
}

UserShow.propTypes = {
	axDetail: PropTypes.object,
	navigation: PropTypes.object
}

const styles = StyleSheet.create({
	axInfoAvatar: {
		flexDirection: 'row',
		marginTop: -45
	},
	axInfoAvatarText: {
		justifyContent: 'flex-end',
	},
});

export default UserShow;