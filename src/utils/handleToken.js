import { AsyncStorage } from 'react-native'

export const checkToken = (key) => {
  try {
    return AsyncStorage.getItem(key)

  } catch(err) {
    console.log(err)
  }
}

export const depositToken = (key, token) => {
  try {
    return AsyncStorage.setItem(key, token)
    
  } catch(err) {
    console.log(err)
  }
}

export const clearToken = () => {
  try {
    return AsyncStorage.clear()
    
  } catch(err) {
    console.log(err)
  }
}