const message = {
  noticeData: null,
}

export default (state = message, action) => {
  switch (action.type) {
    case 'MESSAGE_ALL_GET':
      return Object.assign({}, state, { noticeData: action.payload })
    case 'MESSAGE_':
      return Object.assign({}, state, { noticeData: action.payload })
    default:
      return state
  }
}