import dispatch from './dispatch'
import { info_data_get } from '../common/actStrings'

const getInfomationData = (payload)=> {
  dispatch(info_data_get, payload)
}

export default {
  getInfomationData,
}