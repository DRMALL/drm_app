import dispatch from './dispatch'
import { login_email, login_word } from '../common/actStrings'

const changeLoginEmail = (textEmail)=> {
  dispatch(login_email, textEmail)
}

const changeLoginWord = (textWord)=> {
  dispatch(login_word, textWord)
}

export default {
  changeLoginEmail,
  changeLoginWord,
}