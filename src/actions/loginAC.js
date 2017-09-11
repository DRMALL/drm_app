import dispatch from './dispatch'
import { login_email, login_word, login_show_schedule } from '../common/actStrings'

const changeLoginEmail = (textEmail)=> {
  dispatch(login_email, textEmail)
}

const changeLoginWord = (textWord)=> {
  dispatch(login_word, textWord)
}

const changeShowSchedule = (payload)=> {
  dispatch(login_show_schedule, payload)
}

export default {
  changeLoginEmail,
  changeLoginWord,
  changeShowSchedule,
}