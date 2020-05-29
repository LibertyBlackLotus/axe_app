import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../containers/Register';
import Login from '../containers/Login';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

class LoginNavigator extends Component {
	render() {
		return (
			<Stack.Navigator initialRouteName="Login"
							 screenOptions={{
								 headerStyle: {
									 backgroundColor: Colors.tintColor
								 },
								 headerTintColor: '#fff',
								 headerTitleStyle: {
									 fontWeight: 'bold',
								 },
								 headerTitleAlign: 'center',
							 }}>
				<Stack.Screen name="Login"
							  component={Login}
							  options={{
								  headerShown: false
							  }}/>
				<Stack.Screen name="Register"
							  component={Register}
							  options={{
								  title: '注册',
								  headerShown: false
							  }}/>
			</Stack.Navigator>
		);
	}
}

export default LoginNavigator;