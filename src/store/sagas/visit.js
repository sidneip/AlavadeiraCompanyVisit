import { spawn, put, call, all, takeLatest } from 'redux-saga/effects';
import { Types as VisitTypes } from '../ducks/visit' 
import api from '../../services/api'
export function* sendCheckinAction(){
  yield takeLatest(VisitTypes.SEND_CHECKIN, sendCheckin)
}

export function* sendCheckin({payload}){
  try {
    const body = {checked_in_at: payload.checked_in_at, visit_ids: payload.visit_ids, latitude: payload.latitude, longitude: payload.longitude}
    yield put({ type: VisitTypes.CHECKIN, payload: body});
    response = api.post('/visits/checkin', body)
  } catch (error) {
    
  }
}