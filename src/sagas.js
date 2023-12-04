import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './actions';
import { signOut } from './firebase';

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

export default function* rootSaga() {
  yield takeLatest(LOGIN_SUCCESS, loginSuccessSaga);
  yield takeLatest(LOGOUT_SUCCESS, logoutSuccessSaga);
  yield takeLatest('LOGOUT_ASYNC', asyncLogoutSaga);
}
