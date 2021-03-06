import {AntDesign} from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
	return (
		<AntDesign
			name={props.name}
			size={25}
			style={{marginBottom: -3}}
			color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
		/>
	);
}
TabBarIcon.propTypes = {
	name: PropTypes.string,
	focused: PropTypes.bool,
}

