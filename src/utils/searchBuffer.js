import { AsyncStorage } from 'react-native'

export const getWord = (type, num) => {
  try {
    let keyArr = []
    for(var i = 1; i <= num; i++) {
      keyArr.push(`${type}${i}`)
    }
    return AsyncStorage.multiGet(keyArr)

  } catch(err) {
    console.log(err)
  }
}

export const saveWord = (type, allword) => {
  try {
    let newAllWord = []
    allword.forEach((item, index)=> {
      newAllWord.push([`${type}${index+1}`, item])
    })
    return AsyncStorage.multiSet(newAllWord)
    
  } catch(err) {
    console.log(err)
  }
}

export const clearWord = (type, num) => {
  try {
    let keyArr = []
    for(var i = 1; i <= num; i++) {
      keyArr.push(`${type}${i}`)
    }
    return AsyncStorage.multiRemove(keyArr)

  } catch(err) {
    console.log(err)
  }
}

export const getKeyNum = async (type) => {
  try {
    let keyArr = await AsyncStorage.getAllKeys()
    .then( allkey => {
      return allkey
    })

    let typeLength = type.split('').length
      , outputNum = 0
    keyArr.forEach((item, index)=> {
      if(type == item.substring(0, typeLength)) outputNum += 1
    })

    return outputNum

  } catch(err) {
    console.log(err)
  }
}