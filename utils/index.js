
const getUserInfo = async () => {
	let userInfo = await global.getData('userInfo');
	return userInfo;
};

const getUserId = async () => {
	let userInfo = await global.getData('userInfo');
	if(userInfo){
		let userId = userInfo._id;
		return userId;
	}
	return null;
}

export {
	getUserInfo,
	getUserId
}