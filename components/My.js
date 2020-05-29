import React from 'react';
import MyInfoShow from './MyInfoShow';
import Ax from '../containers/Ax';
import {
	getUserInfo,
	getUserId
} from '../utils';

class My extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			userInfo: null,
			userId: null,
		}
	}

	componentDidMount(){
		console.log('---componentDidMount---props-->', this.props );
		let params = this.props.route.params;
		if(params){
			this.setState({userId: params.id});
		}
		this.checkUserInfo();
	}

	async checkUserInfo(){
		let userInfo = await getUserInfo();
		let userId = await getUserId();
		if(!userInfo){
			this.props.navigation.reset('LoginNavigator');
		}
		this.setState({userInfo, userId});
	}

	render(){
		return (
			<>
				<MyInfoShow userInfo={this.state.userInfo} {...this.props}></MyInfoShow>
				<Ax {...this.props}></Ax>
			</>
		);
	}
}

My.propTypes = {
}
export default My;