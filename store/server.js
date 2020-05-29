import axios from 'axios';
import * as RootNavigation from '../utils/RootNavigation';
import { Alert } from 'react-native';
import {baseUrl} from './config';

axios.defaults.baseURL = baseUrl;  //base url

//请求前统一处理
axios.interceptors.request.use( async config => {
	let token = await global.getData('token');
	if(token){
		config.headers.Authorization = 'Bearer ' + token;
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});

// 响应拦截器，统一处理响应
axios.interceptors.response.use(res => {
	if (res.status == '200') {
		return Promise.resolve(res.data);
	}else{
		return Promise.reject(res);
	}
}, (error) => {
	console.log('--error-->', error );
	console.log('--error.response-->', error.response );
	console.log('--error.response-error->', error.response.data.error );
	let message = error.response?.data?.error;
	console.log('--message->', message );
	if (error && error.response && error.response.status) {
		// alert(error.response.data.error);
		switch (error.response.status) {
			case 400:
				console.log(' 400 ');
				Alert.alert(
					message
				);
				break;
			/**  401: 未登录 或 token过期
			 *未登录则跳转登录页面，并携带当前页面的路径
			 *在登录成功后返回当前页面，这一步需要在登录页操作。*/
			case 401:
				console.log(' 401 ');
				RootNavigation.navigate('LoginNavigator');
				break;
			/** 403 禁止访问
			 *清除本地token
			 *跳转登录页面 */
			case 403:
				// 清除token
				console.log(' 403 ');
				RootNavigation.navigate('LoginNavigator');
				break;
			// 404请求不存在
			case 404:
				console.log(' 404 ');
				break;
			// 其他错误，直接抛出错误提示
			default:
				// Alert.alert(
				// 	message
				// );
		}
	}
	// return Promise.resolve(error);
});

const http = ({
				  method = 'GET',
				  url = '',
				  params = {},
				  data = {},
				  headers = {}
			  }) => {
	return new Promise((resolve, reject) => {
		axios({
			method,
			url,
			params,
			data,
			headers
		}).then(res => {
			resolve(res)
		}).catch(error => reject(error));
	});
}

export default http;