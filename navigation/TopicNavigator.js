import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/Colors'
import Topics from '../containers/Topics';
const Stack = createStackNavigator();

class TopicNavigator extends Component {
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
				<Stack.Screen name="Topics"
							  component={Topics}
							  options={{
								  title: '话题',
							  }} />

			</Stack.Navigator>
		);
	}
}

export default TopicNavigator;