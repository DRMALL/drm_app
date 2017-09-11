import dispatch from './dispatch'
import { msg_all_get, msg_dispress, msg_refresh_T, msg_refresh_F } from '../common/actStrings'

const getAll = (payload)=> {
  dispatch(msg_all_get, payload)
}

const changeDisPress = (payload)=> {
  dispatch(msg_dispress, payload)
}

const isRefresh = ()=> {
  dispatch(msg_refresh_T)
}

const isnotRefresh = ()=> {
  dispatch(msg_refresh_F)
}

export default {
  getAll,
  changeDisPress,
  isRefresh,
  isnotRefresh,
}