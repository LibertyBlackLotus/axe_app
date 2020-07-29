import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import MyInfoShow from './MyInfoShow';

const My = (props) => {
	return (<UserInfo render={(userInfo) => <MyInfoShow userInfo={userInfo} {...props} />}	/>);
}

My.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object,
}
export default My;