import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import {SplashScreen} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import AppNavigator from './navigation/AppNavigator';
import { MenuProvider } from 'react-native-popup-menu';
const store = configureStore();

global.storeData = async (item, value) => {
	try {
		let result = await AsyncStorage.setItem(item, JSON.stringify(value));
	} catch (e) {
		return null;
	}
}

global.getData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return JSON.parse(value);
		}
	} catch (e) {
		return null;
	}
};

global.removeValue = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		// remove error
	}
	console.log('Done.');
}

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);
	const [initialNavigationState, setInitialNavigationState] = React.useState();
	const containerRef = React.useRef();
	// const {getInitialState} = useLinking(containerRef);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHide();

				// Load our initial navigation state
				// setInitialNavigationState(await getInitialState());

				// Load fonts
				await Font.loadAsync({
					...Ionicons.font,
					'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hide();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
				<Provider store={store}>
					<MenuProvider>
						<AppNavigator />
					</MenuProvider>
				</Provider>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
