import messageAC from './messageAC'
import store from '../utils/store'

describe('message actions', () => {
  const msgEQ = [{msg1: '1'}, {msg2: '2'}]
  test('getAll', () => {
    messageAC.getAll(msgEQ)
    expect(store.getState().message.noticeData).toEqual(expect.arrayContaining(msgEQ))
  })

  test('changeDisPress', () => {
    messageAC.changeDisPress(true)
    expect(store.getState().message.disabledPress).toBeTruthy()
  })
})