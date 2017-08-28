import dispatch from './dispatch'
import { 
  device_history_set,
  device_hotword_get,
  device_jump_set,
  device_data_get,
  device_clean_text,
} from '../common/actStrings'

const setHistoryData = (payload)=> {
  dispatch(device_history_set, payload)
}

const getHotword = (payload)=> {
  dispatch(device_hotword_get, payload)
}

const setJumpData = (payload)=> {
  dispatch(device_jump_set, payload)
}

const getDeviceData = (payload)=> {
  dispatch(device_data_get, payload)
}

const pressCleanText = ()=> {
  dispatch(device_clean_text)
}

export default {
  setHistoryData,
  getHotword,
  setJumpData,
  getDeviceData,
  pressCleanText,
}