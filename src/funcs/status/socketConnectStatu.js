import socket from 'socket.io-client'
import statuAC from '../../actions/statuAC'

export default ()=> {
  let io = socket(`https://api.wardenger.me/socket`)
  io.on('connect', ()=> {
    console.log('connect')
  })
  io.on('news', (data) => {
    statuAC.getEquipData(data)
    // console.log(data)
  })
  io.on('connect_error', (error) => {
    Alert.alert('错误', '连接错误',
      [ {text: 'OK', onPress: () => io.close()}, ],
      { cancelable: false }
    )
  })
  io.on('connect_timeout', (timeout) => {
    Alert.alert('错误', '连接超时',
      [ {text: 'OK', onPress: () => io.close()}, ],
      { cancelable: false }
    )
  })
  io.on('disconnect', ()=> { 
    console.log('disconnect')
  })

}