import socket from 'socket.io-client'

export default (io)=> {
  // let io = socket(`https://api.wardenger.me/socket`)
  io.close()
}