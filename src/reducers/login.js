import { login_email, login_word, login_show_schedule } from '../common/actStrings'

const login = {
  textEmail: '', 
  textWord: '',
  showSchedule: false,
}

export default (state = login, action) => {
  switch (action.type) {
    case login_email:
      return Object.assign({}, state, { textEmail: action.payload })
    case login_word:
      return Object.assign({}, state, { textWord: action.payload })
    case login_show_schedule:
      return Object.assign({}, state, { showSchedule: action.payload })
    default:
      return state
  }
}