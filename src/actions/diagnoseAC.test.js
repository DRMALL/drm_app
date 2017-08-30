import diagnoseAC from './diagnoseAC'
import store from '../utils/store'

describe('diagnose actions', () => {
  test('isRefresh', () => {
    diagnoseAC.isRefresh()
    expect(store.getState().diagnose.isRefreshing).toBeTruthy()
  })

  test('isnotRefresh', () => {
    diagnoseAC.isnotRefresh()
    expect(store.getState().diagnose.isRefreshing).toBeFalsy()
  })

  test('getDiagnoseData', () => {
    diagnoseAC.getDiagnoseData()
    expect(store.getState().diagnose.newsListData).toBe(undefined)
  })

  test('getDiagCate', () => {
    diagnoseAC.getDiagCate()
    expect(store.getState().diagnose.newsListData).toEqual(expect.arrayContaining())
  })

  test('selectCate', () => {
    diagnoseAC.selectCate()
    expect(store.getState().diagnose.newsListData).toBe(undefined)
  })

  test('normalCate', () => {
    diagnoseAC.normalCate()
    expect(store.getState().diagnose.newsListData).toEqual(expect.arrayContaining())
  })

  test('setHistoryData', () => {
    diagnoseAC.setHistoryData()
    expect(store.getState().diagnose.newsListData).toBe(undefined)
  })

  test('getHotword', () => {
    diagnoseAC.getHotword()
    expect(store.getState().diagnose.newsListData).toEqual(expect.arrayContaining())
  })

  test('setJumpData', () => {
    diagnoseAC.setJumpData()
    expect(store.getState().diagnose.newsListData).toBe(undefined)
  })

  test('getBugsData', () => {
    diagnoseAC.getBugsData()
    expect(store.getState().diagnose.newsListData).toEqual(expect.arrayContaining())
  })

  test('pressCleanText', () => {
    diagnoseAC.pressCleanText()
    expect(store.getState().diagnose.newsListData).toBe(undefined)
  })
})