import { msg_all_get, msg_dispress, msg_refresh_T, msg_refresh_F } from '../common/actStrings'

const message = {
  isRefreshing: false,
  noticeData: null,
  disabledPress: false,
}

export default (state = message, action) => {
  switch (action.type) {
    case msg_all_get:
      return Object.assign({}, state, { noticeData: action.payload })
    case msg_dispress:
      return Object.assign({}, state, { disabledPress: action.payload })
    case msg_refresh_T:
      return Object.assign({}, state, { isRefreshing: true })
    case msg_refresh_F:
      return Object.assign({}, state, { isRefreshing: false })
    default:
      return state
  }
}