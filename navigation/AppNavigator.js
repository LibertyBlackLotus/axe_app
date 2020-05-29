import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import LoginNavigator from './LoginNavigator';
import AxDetail from "../containers/AxDetail";
import UserMainPage from "../containers/UserMainPage";
import AxAdd from "../containers/AxAdd";
import MyInfoSettings from "../containers/MyInfoSettings";
import History from "../containers/History";
import Focus from "../containers/Focus";
import Collection from "../containers/Collection";
import Search from "../containers/Search";
import { navigationRef } from '../utils/RootNavigation';

const Stack = createStackNavigator();

function MyDrawer() {
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator initialRouteName="BottomTabNavigator">
				<Stack.Screen name="BottomTabNavigator"
							  component={BottomTabNavigator}
							  options={{
								  headerShown: false
							  }} />
				<Stack.Screen name="LoginNavigator"
							  component={LoginNavigator}
							  options={{
								  title: '',
								  headerShown: false
							  }} />
				<Stack.Screen name="Search"
							  component={Search}
							  options={{
								  headerShown: false
							  }} />
				<Stack.Screen name="AxDetail"
							  component={AxDetail}
							  options={{
								  title: '详情',
								  headerShown: false
							  }} />
				<Stack.Screen name="UserMainPage"
							  component={UserMainPage}
							  options={{
								  title: '',
							  }} />
				<Stack.Screen name="AxAdd"
							  component={AxAdd}
							  options={{
								  title: '创建',
							  }} />
				<Stack.Screen name="MyInfoSettings"
							  component={MyInfoSettings}
							  options={{title: ''}}
				/>
				<Stack.Screen name="History"
							  component={History}
							  options={{title: '历史'}}
				/>
				<Stack.Screen name="Focus"
							  component={Focus}
							  options={{title: '关注'}}
				/>
				<Stack.Screen name="Collection"
							  component={Collection}
							  options={{title: '收藏'}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default MyDrawer;