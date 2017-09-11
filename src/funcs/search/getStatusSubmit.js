import React from 'react'
import { Alert } from 'react-native'
import { tokenKey, internalServerError } from '../../common/strings'
import { saveWord } from '../../utils/searchBuffer'
import { checkToken } from '../../utils/handleToken'
import { getPort } from '../../utils/fetchMethod'
import { getDevicesHots, getMoniterdevsSearch } from '../../apis'

import store from '../../utils/store'
import statuAC from '../../actions/statuAC'

export default ()=> {
  // checkToken(tokenKey)
  // .then(async token => {
  //   let res = await getPort(`${getBugs}?type=submit&search=${statuState.text}&token=${token}`)
  //   if(!res) {
  //     Alert.alert('错误', internalServerError,
  //       [ {text: 'OK', onPress: () => 'OK'}, ],
  //       { cancelable: false }
  //     )
  //   } else if(res.code == 200) {
      let statuState = store.getState().statu
      let prevHistoryData = statuState.historyData
      if(statuState.text != '' && statuState.text != undefined) {
        prevHistoryData = [statuState.text].concat(prevHistoryData)
        statuAC.setHistoryData(prevHistoryData)
        saveWord('statu', prevHistoryData)
      }
  //   } else {
  //     Alert.alert('错误', JSON.stringify(res.message),
  //       [ {text: 'OK', onPress: () => 'OK'}, ],
  //       { cancelable: false }
  //     )
  //   }
  // })
}
