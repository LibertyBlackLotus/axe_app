
const getUserInfo = async () => {
	let userInfo = await global.getData('userInfo');
	return JSON.parse(userInfo);
};

const getUserId = async () => {
	let userInfo = await global.getData('userInfo');
	if(userInfo){
		let userId = JSON.parse(userInfo)._id;
		return userId;
	}
	return null;
}

const getUploadToken = async () => {
	let uploadToken = await global.getData('uploadToken');
	return uploadToken;
}

export {
	getUserInfo,
	getUserId,
	getUploadToken
}