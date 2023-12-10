export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const SET_USER_READINESS = 'SET_USER_READINESS';
export const UNSET_USER_READINESS = 'UNSET_USER_READINESS';

export const setUserReadiness = (isReady) => ({
  type: SET_USER_READINESS,
  payload: isReady,
});

export const unsetUserReadiness = () => ({
  type: UNSET_USER_READINESS,
});

export const SET_READY_FOR_QUIZ = 'SET_READY_FOR_QUIZ';
export const SET_NOT_READY_FOR_QUIZ = 'SET_NOT_READY_FOR_QUIZ';

export const setReadyForQuiz = () => ({
  type: SET_READY_FOR_QUIZ,
});

export const setNotReadyForQuiz = () => ({
  type: SET_NOT_READY_FOR_QUIZ,
});