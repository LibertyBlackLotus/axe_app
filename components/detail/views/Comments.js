import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {
	Text,
	View,
	StyleSheet
} from "react-native";
import {Avatar, Button} from "react-native-elements";
import moment from "moment";
import http from "../../../store/server";
import {API_COMMENT} from "../../../store/apiUrl";
import {comment} from "../../../store/actions";
import Colors from "../../../constants/Colors";
import PropTypes from "prop-types";

const Item = (props) => {
	const {item, navigation, id, userId} = props;

	const toUserMainPage = (id) => {
		navigation.navigate('UserMainPage', {id});
	}

	//回复评论
	const reply = () => {
		let params = {
			content: comment,
			ax: id,
			user: userId
		};
		// this.props.addComment(params);
	}

	return (
		<View style={styles.comment}>
			<View style={styles.commentInfo}>
				<View style={styles.commentAvatar}>
					<Avatar
						containerStyle={styles.commentAvatarItem}
						rounded
						source={item.user.avatar?{uri: item.user.avatar}:avatar}
						onPress={() => toUserMainPage(item.user._id)}
					/>
					<Text style={styles.commentUserText}>{item.user.username?item.user.username:item.user.nickname}</Text>
					<Text>{item.user.location?item.user.location: ''}</Text>
				</View>
				<View style={styles.commentItem}>
					<Text style={styles.commentItemText}>{item.content}</Text>
				</View>
			</View>
			<View style={styles.time}>
				<Text style={styles.commentItemTime}>
					{moment(item.create_time).calendar('days')}
				</Text>
				{/*<Button title="回复"
					type="clear"
					buttonStyle={styles.commentItemButton}
					titleStyle={{fontSize: 12, color: Colors.grayText}}
					onPress={reply} />*/}
			</View>
		</View>
	);
}
Item.propTypes = {
	id: PropTypes.string,
	userId: PropTypes.string,
	item: PropTypes.object,
	navigation: PropTypes.object
}

const Comments = (props) => {
	const {id, commentList, getCommentList} = props;

	useEffect(() => {
		getCommentList(id);
	}, [id]);

	if(commentList.length === 0 ){
		return null;
	}
	return (
		<View style={styles.commentContent}>
			<Text>评论 ({ commentList.length })</Text>
			{commentList.map(item => <Item key={item._id} item={item} {...props} />)}
		</View>
	);
}

Comments.propTypes = {
	id: PropTypes.string,
	userId: PropTypes.string,
	getCommentList: PropTypes.func, //获取评论列表
	commentList: PropTypes.array,   //评论列表
}

const styles = StyleSheet.create({
	commentContent: {
		padding: 30,
		paddingBottom: 50,
		borderTopColor: Colors.borderColor,
		borderTopWidth: 1,
	},
	comment: {
		marginTop: 20,
		paddingTop: 8,
		borderTopColor: Colors.borderColor2,
		borderTopWidth: 1,
	},
	commentInfo: {
		flexDirection: 'row',
	},
	commentUserText: {
		fontSize: 13,
		color: Colors.grayText
	},
	commentAvatar: {
		alignItems: 'center',
	},
	commentAvatarItem: {
		marginRight: 5
	},
	commentItem: {
		paddingLeft: 10,
	},
	commentItemText: {
		fontSize: 16,
		minHeight: 60
	},
	time: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	commentItemTime: {
		fontSize: 10,
		color: Colors.grayText
	},
	commentItemButton: {
		width: 50,
		height: 30
	},
});


const mapStateToProps = (state) => {
	return {
		commentList: state.comment.commentList, //评论列表
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 获取评论列表 */
		getCommentList: (id) => {
			http({url: API_COMMENT + `/ax/${id}`}).then(res => {
				dispatch(comment.getCommentList(res));
			});
		},

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);