import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Text
} from 'react-native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

class Topics extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>
					话题
				</Text>
			</View>
		);
	}
}

Topics.propTypes = {
}

const styles = StyleSheet.create({
	container: {
		height: 500,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

export default Topics;