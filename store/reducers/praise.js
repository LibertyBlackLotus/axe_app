import {
	PRAISE,
	PRAISE_REMOVE,
	IS_PRAISE
} from "../actionTypes";

const read = (state = {isPraised: false}, action) => {
	switch(action.type){
		case PRAISE:          //点赞
			return Object.assign({}, state, { isPraised:  action.isPraised });
		case PRAISE_REMOVE:   //取消点赞
			return Object.assign({}, state, { isPraised:  action.isPraised });
		case IS_PRAISE:       //是否点赞
			return Object.assign({}, state, { isPraised:  action.isPraised });
		default:
			return state;
	}
}

export default read;