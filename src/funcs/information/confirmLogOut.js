import React from 'react'
import { NavigationActions } from 'react-navigation'
import { clearToken } from '../../utils/handleToken'

export default (props)=> {
  clearToken()
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'login'}),
    ]
  })
  props.navigation.dispatch(resetAction)
}