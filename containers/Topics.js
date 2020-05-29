import { connect } from 'react-redux';
import http from '../store/server';
import { community }  from '../store/actions';

import {
	API_COMMUNITY
} from '../store/apiUrl';

import Topics from '../components/Topics';

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
