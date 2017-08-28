import dispatch from './dispatch'
import { msg_all_get, msg_dispress } from '../common/actStrings'

const getAll = (payload)=> {
  dispatch(msg_all_get, payload)
}

const changeDisPress = (payload)=> {
  dispatch(msg_dispress, payload)
}

export default {
  getAll,
  changeDisPress,
}