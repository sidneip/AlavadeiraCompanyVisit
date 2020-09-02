import { spawn, put, call, all, takeLatest } from 'redux-saga/effects';
import { navigate } from '~/services/navigation'
import { Types as AuthTypes } from '../ducks/auth'
import { Types as VisitTypes } from '../ducks/visit' 
import { AsyncStorage } from 'react-native'
import { startWatchingNetworkConnectivity } from "./offline";
import api from '../../services/api'
import { sendCheckinAction } from './visit'



function* fetchVisitsAction(){
  yield takeLatest(VisitTypes.FETCH, fetchVisits)
}

function* fetchVisits({payload}){
  try {
    let response = yield call(fetchVisitsRequest)
    console.log(response)
    yield put({ type: VisitTypes.UPDATE_VISITS, payload: response.data.data.visits })
  } catch (error) {
    console.log(error)
  }
}

function fetchVisitsRequest(){
  try {
    return api.get('/visits', {})
  } catch (error) {
    console.log(error)
  }
}

function* loginAction(){
  yield takeLatest(AuthTypes.LOGIN, login)
}

function* login({payload}){
  // let response = yield call(api.post, '/authenticate', {email: payload.username, password: payload.password})
  try {
    let response = yield call(loginRequest, payload)
    yield call(saveDriverData, response)
    // yield put({ type: AuthTypes.SUCCESS_LOGIN, payload: response.data });
    // yield call(saveToken, response.data.token)
    yield call(navigate, 'App')
  } catch (error) {
    alert('Login ou Senha invalidos.')
    console.log(error)
  }
}

function* saveDriverData(response) {
  AsyncStorage.setItem('@driver/token', response.data.data.token);
  AsyncStorage.setItem('@driver/trajectories_today', response.data.data.trajectory_today);
}

function loginRequest(params){
  try {
    return api.post('/authenticate', {login: params.username, password: params.password, profile_type: 'driver'}) 
  } catch (error) {
    return error
  }
}


function* watchNetwork(){
  yield spawn(startWatchingNetworkConnectivity)
}

export default function* rootSaga() {
  yield all([
    watchNetwork(),
    loginAction(),
    fetchVisitsAction(),
    sendCheckinAction()
  ]);
}
