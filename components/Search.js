import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	RefreshControl,
	Text
} from 'react-native';
import PropTypes from 'prop-types';
import SearchBar from 'react-native-search-box';
import Colors from "../constants/Colors";

const {width, height} = Dimensions.get('window');

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		};

		this.toDetail = this.toDetail.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	componentDidMount() {
	}

	//搜索框获取焦点
	onFocus(){
		console.log('--onFocus---');
	}
	//搜索
	onSearch = (searchText) => {
		// return new Promise((resolve, reject) => {
		// 	console.log(searchText);
		// 	console.log('Add your search function here.');
		// 	resolve();
		// });
		let params = {
			keywords: searchText
		};
		this.props.searchAx(params);
	}

	//跳转至详情
	toDetail(id) {
		this.props.navigation.navigate('AxDetail', {id});
	}

	render() {
		const {axListSearch} = this.props;
		return (
			<View>
				<View style={styles.place}></View>
				<SearchBar
					ref="search_box"
					onSearch={this.onSearch}
					onFocus={this.onFocus}
					cancelButtonWidth={50}
					placeholder={'搜索'}
					backgroundColor={Colors.tintColor}
				/>

				<ScrollView>
					<View style={styles.axContent}>
						{axListSearch.map(item => (
							<TouchableOpacity key={item._id}
											  style={styles.axImgView}
											  onPress={() => this.toDetail(item._id)}>
								<Image source={{uri: item.ax[0].url}} style={styles.axImg}/>
								<Text>{item.content}</Text>
							</TouchableOpacity>
						))}
					</View>

				</ScrollView>
			</View>
		);
	}
}

Search.propTypes = {
	axListSearch: PropTypes.array,  //搜索斧头结果
	searchAx: PropTypes.func,  	    //搜索斧头
};

const styles = StyleSheet.create({
	axContent: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 10
	},
	axImgView: {
		padding: 3
	},
	axImg: {
		width: width / 3 - 15,
		height: height / 3 - 15,
		borderRadius: 5
	},
	place: {
		width: width,
		height: 25,
		backgroundColor: Colors.tintColor
	}
});

export default Search;