import { login_email, login_word } from '../common/actStrings'

const login = {
  textEmail: '', 
  textWord: '',
}

export default (state = login, action) => {
  switch (action.type) {
    case login_email:
      return Object.assign({}, state, { textEmail: action.payload })
    case login_word:
      return Object.assign({}, state, { textWord: action.payload })
    default:
      return state
  }
}