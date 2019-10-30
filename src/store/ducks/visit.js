import { markActionsOffline } from 'redux-offline-queue'

export const Types = {
  FETCH: 'visit/fetch',
  UPDATE_VISITS: 'visit/update_all',
  CHECKIN: 'visit/checkin',
  SEND_CHECKIN: 'visit/send_checkin',
  START_ROUTE: 'visit/start_route',
  COLLECT_ITEM: 'visit/collect_item',
  DELIVERED_ITEM: 'visit/delivered_item',
  FINISH_VISIT: 'visit/finish'
}

const initialState = {
  visits: [],
  loading: true,
  route_started: false
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
    case Types.COLLECT_ITEM:
      return {
        ...state,
        visits: state.visits.map((visit) => {
          if(visit.id === action.payload.visit_id){
            collected = visit.collected || []
            return {...visit, collected: collected.push(action.payload.bag_code)}
          }else{
            return visit
          }
        })
      }
    
    case Types.DELIVERED_ITEM:
      return {
        ...state,
        visits: state.visits.map((visit) => {
          if(visit.id === action.payload.visit_id){
            const delivered = visit.delivered || []
            const deliverables = visit.deliverables.map(deliver => deliver.barcode === action.payload.bag_code ? {...deliver, deliver: true} : deliver )
            return {...visit, delivered: delivered.push(action.payload.bag_code), deliverables: deliverables}
          }else{
            return visit
          }
        })
      }
    
    case Types.FINISH_VISIT:
      return {
        ...state,
        visits: state.visits.map((visit) => {
          if(visit.id === action.payload.visit_id){
            return {...visit, delivery_status: 'finished', pending_to_sync: true}
          }else{
            return visit
          }
        })
      }

    case Types.START_ROUTE:
      return {...state, route_started: true}

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

export function startRoute(){
  return {
    type: Types.START_ROUTE,
    payload: {}
  }
}

export function collectItem(visit_id, bag_code){
  return {
    type: Types.COLLECT_ITEM,
    payload: {
      visit_id: visit_id,
      bag_code: bag_code
    }
  }
}

export function deliverItem(visit_id, item_code){
  return {
    type: Types.DELIVERED_ITEM,
    payload: {
      visit_id: visit_id,
      item_code: item_code
    }
  }
}

export function finishVisit(visit_id){
  return {
    type: Types.FINISH_VISIT,
    payload: {
      visit_id: visit_id
    }
  }
}
markActionsOffline(sendCheckin, [Types.SEND_CHECKIN])