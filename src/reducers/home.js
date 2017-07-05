const home = {

}

export default (state = home, action) => {
  switch (action.type) {
    case 'expression':
      return Object.assign({}, state)
    default:
      return state
  }
}
