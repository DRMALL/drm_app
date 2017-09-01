import homeDetailAC from '../../actions/homeDetailAC'

export default (event) => {
  try {
    const postMsgData = JSON.parse(event.nativeEvent.data)
    if (postMsgData.type === 'setHeight' && postMsgData.height > 0) {
      homeDetailAC.changeWVHeight(postMsgData.height)
    }
  } catch(err) {
    console.log(err)
  }
}