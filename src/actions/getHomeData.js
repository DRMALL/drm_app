import dispatch from './dispatch'
import { home_data_get } from '../common/actStrings'

const getHomeData = (data)=> {
  dispatch(home_data_get, data)
}

export default getHomeData