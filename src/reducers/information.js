import { info_data_get } from '../common/actStrings'

const information = {
  user_name: '',
  company_name: '',
  phone_number: '',
  postal_address: '',
}

export default (state = information, action) => {
  switch (action.type) {
    case info_data_get:
      return Object.assign({}, state, action.payload)
    case 'INFO_':
      return Object.assign({}, state, { textWord: action.payload })
    default:
      return state
  }
}