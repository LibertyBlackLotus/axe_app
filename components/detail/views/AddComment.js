import React, {useState} from "react";
import {connect} from "react-redux";
import {
	StyleSheet,
	TextInput,
	View,
	Dimensions
} from "react-native";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";
import http from "../../../store/server";
import {API_COMMENT} from "../../../store/apiUrl";
import {comment} from "../../../store/actions";
import Colors from "../../../constants/Colors";

const {width} = Dimensions.get('window');

const AddComment = (props) => {
	const {id, userId, addComment}= props;
	const [comment, setComment] = useState('');
	//添加评论
	const onChangeComment = (text) => {
		setComment(text);
	}

	//发布评论
	const addCommentMethod = () => {
		let params = {
			content: comment,
			ax: id,
			user: userId
		};
		addComment(params);
		setComment('');
		this.input.blur();
	}

	return (
		<View style={styles.bottom}>
			<TextInput style={styles.commentInput}
					   placeholder="写评论"
					   onChangeText={text => onChangeComment(text)}
					   ref={(input) => this.input = input}
					   value={comment} />

			<Button title="评论" onPress={addCommentMethod} buttonStyle={styles.commentButton} />
		</View>
	);
}

AddComment.propTypes = {
	id: PropTypes.string,
	userId: PropTypes.string,
	addComment: PropTypes.func,     //添加评论
};

const styles = StyleSheet.create({
	bottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: Colors.borderColor2,
		padding: 8,
		paddingLeft: 10,
		position: 'absolute',
		bottom: 0,
		width: width,
		height: 50,
	},
	commentInput: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.borderColorGray,
		width: width - 100,
		paddingLeft: 10
	},
	commentButton: {
		height: 30,
		backgroundColor: Colors.tintColor
	}
});


const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 添加评论 */
		addComment: (data) => {
			http({method: 'POST', url: API_COMMENT, data}).then(res => {
				dispatch(comment.addComment(res));
			});
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);