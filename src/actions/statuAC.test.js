import statuAC from './statuAC'
import store from '../utils/store'

describe('statu actions', () => {
  test('isRefresh', () => {
    statuAC.isRefresh()
    expect(store.getState().statu.isRefreshing).toBeTruthy()
  })

  test('isnotRefresh', () => {
    statuAC.isnotRefresh()
    expect(store.getState().statu.isRefreshing).toBeFalsy()
  })

  test('pressStatusTab', () => {
    statuAC.pressStatusTab(0)
    expect(store.getState().statu.StatuTabRow0).toBeTruthy()
  })
})