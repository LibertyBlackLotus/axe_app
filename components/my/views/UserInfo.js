import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const UserInfo = (props) => {
	const {navigation} = props;
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		console.log('useEffect---userInfo--->', userInfo);
		async function getInfo(){

			let user = await global.getData('userInfo');
			console.log('useEffect---getInfo--user->', user);
			if(!user){
				navigation.navigate('LoginNavigator');
			}
			return user;
		}
		getInfo().then(data => {
			setUserInfo(data);
		});
	}, [userInfo]);

	return (
		<>
			{userInfo && props.render(JSON.parse(userInfo))}
		</>
	);
}

UserInfo.propTypes = {
	render: PropTypes.func,
	navigation: PropTypes.object
}

export default UserInfo;