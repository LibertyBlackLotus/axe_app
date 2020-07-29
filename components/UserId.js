import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {getUserId} from '../utils';

const UserId = (props) => {
	const [userId, setUserId] = useState(0);
	useEffect(() => {
		console.log('--UserId  -useEffect---------');
		async function getId(){
			let userId = await getUserId();
			console.log('--UserId-userId--->', userId);
			return userId;
		}
		getId().then(id => {
			setUserId(id);
		});
	}, [userId]);

	if(!userId){
		return null;
	}
	return (
		<>{props.render(userId)}</>
	);
}

UserId.propTypes = {
	render: PropTypes.func,
}

export default UserId;
