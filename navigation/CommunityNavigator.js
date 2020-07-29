import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/Colors'
import {view as Community} from '../components/community';
const Stack = createStackNavigator();

class CommunityNavigator extends Component {
	render() {
		return (
			<Stack.Navigator initialRouteName="Ax"
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
				<Stack.Screen name="Community"
							  component={Community}
							  options={{
								  title: '社区',
								  headerShown: false
							  }} />

			</Stack.Navigator>
		);
	}
}

export default CommunityNavigator;