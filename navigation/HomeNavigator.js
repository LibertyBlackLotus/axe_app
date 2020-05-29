import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../containers/Home';
import Colors from '../constants/Colors'
const Stack = createStackNavigator();

class HomeNavigator extends Component {
	render() {
		return (
			<Stack.Navigator initialRouteName="Home"
							 screenOptions={{
								 headerStyle: {
									 backgroundColor: Colors.tintColor
								 },
								 headerTintColor: '#fff',
								 headerTitleStyle: {
									 fontWeight: 'bold',
								 },
								 headerTitleAlign: 'center'
							 }}>
				<Stack.Screen name="Home"
							  component={Home}
							  options={{
								  title: '首页',
								  headerShown: false
							  }} />

			</Stack.Navigator>
		);
	}
}

export default HomeNavigator;