import { put, call, all, takeLatest } from 'redux-saga/effects';
import { navigate } from '~/services/navigation'
import { Types as AuthTypes } from '../ducks/auth'
import { Types as VisitTypes } from '../ducks/visit' 
import { AsyncStorage } from 'react-native'
import api from '../../services/api'



function* fetchVisitsAction(){
  yield takeLatest(VisitTypes.FETCH, fetchVisits)
}

function* fetchVisits({payload}){
  try {
    let response = yield call(fetchVisitsRequest)
    yield put({ type: VisitTypes.UPDATE_VISITS, payload: response.data.data.visits })
  } catch (error) {
    
  }
}

function fetchVisitsRequest(){
  try {
    return api.get('/visits', {})
  } catch (error) {
    
  }
}

function* loginAction(){
  yield takeLatest(AuthTypes.LOGIN, login)
}

function* login({payload}){
  // let response = yield call(api.post, '/authenticate', {email: payload.username, password: payload.password})
  try {
    let response = yield call(loginRequest, payload)
    console.tron.logImportant(response.data)
    saveDriverData(response)
  } catch (error) {
    console.tron.logImportant(error)
  }
  // yield put({ type: Types.SUCCESS_LOGIN, payload: response.data });
  // yield call(saveToken, response.data.token)
  // yield call(navigate, 'Home')
}

async function saveDriverData(response) {
  console.log(response)
  await AsyncStorage.setItem('@driver/token', response.data.data.token);
  await AsyncStorage.setItem('@driver/trajectories_today', response.data.data.trajectory_today);
  console.log('passou');
}

function loginRequest(params){
  try {
    return api.post('/authenticate', {login: params.username, password: params.password, profile_type: 'driver'}) 
  } catch (error) {
    return error
  }
}

export default function* rootSaga() {
  yield all([
    loginAction(),
    fetchVisitsAction()
  ]);
}
