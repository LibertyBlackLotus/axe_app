import React from "react";
import {
	Image,
	Dimensions
} from "react-native";
import PropTypes from "prop-types";

const {width} = Dimensions.get('window');

const ImgShow = (props) => {
	const {ax} = props;
	const axDefault = require('../../../assets/axDefault.png');
	let imgHeight = width * ax?.h / ax?.w;
	let axUrl = ax? {uri: ax.name}: axDefault;
	return (<Image source={axUrl} style={{width: width, height: imgHeight}}	/>);
}

ImgShow.propTypes = {
	ax: PropTypes.object
}

export default ImgShow;