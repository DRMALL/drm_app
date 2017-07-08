const home = {
  active: true
}

export default (state = home, action) => {
  switch (action.type) {
    case 'change':
      console.log('active')
      return Object.assign({}, state, { active: !state.home.active })
    default:
      return state
  }
}
