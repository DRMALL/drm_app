import dispatch from './dispatch'
import { home_data_get } from '../common/actStrings'

const getHomeData = payload=> {
  dispatch(home_data_get, payload)
}

export default getHomeData
