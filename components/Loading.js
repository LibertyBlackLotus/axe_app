import React from "react";
import {StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
	return (
		<View style={styles.loading}>
			<LottieView source={require('../animation/loading.json')} autoPlay loop />
		</View>);
}

const styles = StyleSheet.create({
	loading: {
		height: 80,
		alignItems: 'center',
		marginTop: 10
	}
});

export default Loading;