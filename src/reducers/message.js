import { msg_all_get, msg_dispress } from '../common/actStrings'

const message = {
  noticeData: null,
  disabledPress: false,
}

export default (state = message, action) => {
  switch (action.type) {
    case msg_all_get:
      return Object.assign({}, state, { noticeData: action.payload })
    case msg_dispress:
      return Object.assign({}, state, { disabledPress: action.payload })
    default:
      return state
  }
}