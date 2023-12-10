import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_USER_READINESS, UNSET_USER_READINESS } from './actions';

const initialState = {
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };

      case SET_USER_READINESS:
      return {
        ...state,
        userReadiness: action.payload,
      };

    case UNSET_USER_READINESS:
      return {
        ...state,
        userReadiness: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
