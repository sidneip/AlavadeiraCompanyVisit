export const Types = {
  FETCH: 'visit/fetch',
  UPDATE_VISITS: 'visit/update_all'
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