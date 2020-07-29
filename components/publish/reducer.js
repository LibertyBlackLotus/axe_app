import {ADD_AXE} from "./actionTypes";

export default (state = {axList: []}, action) => {
	switch(action.type){
		case ADD_AXE:
			return Object.assign({}, state, { axList:  action.axList });
		default:
			return state;
	}
}