export const Types = {
  FETCH: 'visit/fetch',
  UPDATE_VISITS: 'visit/update_all',
  CHECKIN: 'visit/checkin',
  SEND_CHECKIN: 'visit/send_checkin'
}

const initialState = {
  visits: [],
  loading: true
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH:
      return {...state}
    case Types.UPDATE_VISITS:
      return { ...state, visits: action.payload, loading: false }
    case Types.CHECKIN:
      return {
        ...state,
        visits: state.visits.map(visit => visit.id === action.payload.visit_ids[0] ?
          { ...visit, checkin: action.payload.checked_in_at } : 
          visit
      ) 
      }
    default:
      return state;
  }
}

export function fetch(){
  return {
    type: Types.FETCH,
    payload: {}
  }
}

export function sendCheckin(visit_id, checked_in_at, location){
  return {
    type: Types.SEND_CHECKIN,
    payload: {
      visit_id: visit_id,
      checked_in_at: checked_in_at 
    }
  }
}