export const Types = {
	LOGIN: 'auth/LOGIN'
}

const initialState = {
  isLogged: false,
  token: null,
  driver: {
    username: '',
    password: ''
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {...state}
    default:
      return state;
  }
}

export function login(username, password){
  return {
    type: Types.LOGIN,
    payload: {
      username,
      password
    }
  }
}