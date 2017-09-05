import { getPort } from '../../utils/fetchMethod'
import { getNotices } from '../../apis'

export default (token)=> {
  return new Promise((resovle, reject)=> {
    getPort(`${getNotices}?token=${token}`)
    .then((res)=> {
      if(!res) {
        console.log('错误', internalServerError)
      } else if(res.code == 200) {
        let allRead = true
        res.data.map((item, index)=> {
          if(item.readed === false) allRead = false
        })
        resovle(allRead)
      } else {
        console.log('错误', res.message)
      }
    })
  })
}
