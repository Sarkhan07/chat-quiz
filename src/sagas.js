import { takeLatest, put, call, delay, select } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_USER_READINESS, UNSET_USER_READINESS } from './actions';
import { signOut, setUserReadiness as setFirebaseUserReadiness } from './firebase';

function loginSuccessSaga(action) {
  console.log('User logged in:', action.payload);
}

function logoutSuccessSaga(action) {
  console.log('User logged out', action.payload);
}

function* asyncLogoutSaga() {
  try {
    yield call(signOut);
    yield delay(1000);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

function* setUserReadinessSaga(action) {
  try {
    const userId = yield select((state) => state.user?.uid);
    if (userId) {
      yield call(setFirebaseUserReadiness, userId, action.payload);
    }
  } catch (error) {
    console.error('Error setting user readiness:', error);
  }
}

function* unsetUserReadinessSaga() {
  try {
    const userId = yield select((state) => state.user?.uid);
    if (userId) {
      yield call(setFirebaseUserReadiness, userId, false);
    }
  } catch (error) {
    console.error('Error unsetting user readiness:', error);
  }
}


export default function* rootSaga() {
  yield takeLatest(LOGIN_SUCCESS, loginSuccessSaga);
  yield takeLatest(LOGOUT_SUCCESS, logoutSuccessSaga);
  yield takeLatest('LOGOUT_ASYNC', asyncLogoutSaga);
  yield takeLatest(SET_USER_READINESS, setUserReadinessSaga);
  yield takeLatest(UNSET_USER_READINESS, unsetUserReadinessSaga);
}
