import homeDetailAC from '../../actions/homeDetailAC'

export default (navState) => {
  let height = parseInt(navState.title) || 500
  // console.log(height, navState)
  if(height > 0) {
    homeDetailAC.changeWVHeight((height+30))
  }
}