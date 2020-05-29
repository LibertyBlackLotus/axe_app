import {
	PRAISE,
	PRAISE_REMOVE,
	IS_PRAISE
} from '../actionTypes';

//点赞
export function praise(isPraised = false){
	return {
		type: PRAISE,
		isPraised
	}
}

//取消点赞
export function removePraise(isPraised = false){
	return {
		type: PRAISE_REMOVE,
		isPraised
	}
}

//是否点赞
export function isPraise(isPraised = false){
	return {
		type: IS_PRAISE,
		isPraised
	}
}



