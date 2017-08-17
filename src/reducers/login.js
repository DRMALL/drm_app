const login = {
  textEmail: '', 
  textWord: '',
}

export default (state = login, action) => {
  switch (action.type) {
    case 'LOGIN_EMAIL':
      return Object.assign({}, state, { textEmail: action.payload })
    case 'HOME_WORD':
      return Object.assign({}, state, { textWord: action.payload })
    default:
      return state
  }
}