import deviceAC from './deviceAC'
import store from '../utils/store'

describe('device actions', () => {
  test('setHistoryData', () => {
    const historyEQ = [{history1: '1'}, {history2: '2'}]
    deviceAC.setHistoryData(historyEQ)
    expect(store.getState().device.historyData).toEqual(expect.arrayContaining(historyEQ))
  })

  test('getHotword', () => {
    const hotEQ = [{hot1: '1'}, {hot2: '2'}]
    deviceAC.getHotword(hotEQ)
    expect(store.getState().device.hotwordData).toEqual(expect.arrayContaining(hotEQ))
  })

  test('setJumpData', () => {
    deviceAC.setJumpData({jumpData: true})
    expect(store.getState().device.jumpData).toBeTruthy()
  })

  test('getDeviceData', () => {
    const deviceEQ = [{device1: '1'}, {device2: '2'}]
    deviceAC.getDeviceData(deviceEQ)
    expect(store.getState().device.deviceData).toEqual(expect.arrayContaining(deviceEQ))
  })

  test('pressCleanText', () => {
    deviceAC.pressCleanText()
    expect(store.getState().device.jumpData).toBeFalsy()
  })

})