import { 
  device_history_set,
  device_hotword_get,
  device_jump_set,
  device_data_get,
  device_clean_text,
} from '../common/actStrings'

const device = {
  text: '',
  jumpData: false,
  deviceData: [],
  historyData: [],
  hotwordData: [],
}

export default (state = device, action) => {
  switch (action.type) {
    case device_history_set:
      return Object.assign({}, state, {historyData: action.payload} )
    case device_hotword_get:
      return Object.assign({}, state, {hotwordData: action.payload})
    case device_jump_set:
      return Object.assign({}, state, action.payload)
    case device_data_get:
      return Object.assign({}, state, {deviceData: action.payload})
    case device_clean_text:
      return Object.assign({}, state, {text: '', jumpData: false,})
    default:
      return state
  }
}