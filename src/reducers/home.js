const home = {
  newsListData: null,
}

export default (state = home, action) => {
  switch (action.type) {
    case 'HOME_DATA_GET':
      return Object.assign({}, state, { newsListData: action.payload })
    default:
      return state
  }
}
