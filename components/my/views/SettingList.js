import React from "react";
import PropTypes from 'prop-types';
import {ListItem} from "react-native-elements";

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

SettingList.propTypes = {
	navigation: PropTypes.object
}

export default SettingList;