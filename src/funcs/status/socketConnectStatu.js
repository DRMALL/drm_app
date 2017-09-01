import socket from 'socket.io-client'

export default ()=> {
  let io = socket(`https://api.wardenger.me/socket`)
  io.on('connect', ()=> {
    //
    console.log('connect')
  })
  io.on('news', (res) => {
    // setState(res)
    console.log(res)
  })
  io.on('disconnect', ()=> {
    // 
    console.log('disconnect')
  })
}