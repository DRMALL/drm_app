import loginAC from './loginAC'
import store from '../utils/store'

describe('login actions', () => {
  test('changeLoginEmail', () => {
    loginAC.changeLoginEmail('test@qq.com')
    expect(store.getState().login.textEmail).toBe('test@qq.com')
  })

  test('changeLoginWord', () => {
    loginAC.changeLoginWord('test@qq.com')
    expect(store.getState().login.textWord).toBe('test@qq.com')
  })
})