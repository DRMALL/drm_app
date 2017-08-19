import dispatch from './dispatch'

const getHomeData = (data)=> {
  dispatch('HOME_DATA_GET', data)
}

export default getHomeData