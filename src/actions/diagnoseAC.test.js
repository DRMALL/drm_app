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
    const diagEQ = [{diag1: '1'}, {diag2: '2'}]
    diagnoseAC.getDiagnoseData(diagEQ)
    expect(store.getState().diagnose.allDiagnoseData).toEqual(expect.arrayContaining(diagEQ))
  })

  test('getDiagCate', () => {
    const diagCateEQ = [{cate1: '1'}, {cate2: '2'}]
    diagnoseAC.getDiagCate({allCateData: diagCateEQ})
    expect(store.getState().diagnose.allCateData).toEqual(expect.arrayContaining(diagCateEQ))
  })

  test('selectCate', () => {
    diagnoseAC.selectCate({tabTypeRow0: true})
    expect(store.getState().diagnose.tabTypeRow0).toBeTruthy()
  })

  test('normalCate', () => {
    diagnoseAC.normalCate({tabTypeRow0: false})
    expect(store.getState().diagnose.tabTypeRow0).toBeFalsy()
  })

  test('setHistoryData', () => {
    const diagHisEQ = [{his1: '1'}, {his2: '2'}]
    diagnoseAC.setHistoryData(diagHisEQ)
    expect(store.getState().diagnose.historyData).toEqual(expect.arrayContaining(diagHisEQ))
  })

  test('getHotword', () => {
    const diagHotsEQ = [{hot1: '1'}, {hot2: '2'}]
    diagnoseAC.getHotword(diagHotsEQ)
    expect(store.getState().diagnose.hotwordData).toEqual(expect.arrayContaining(diagHotsEQ))
  })

  test('setJumpData', () => {
    diagnoseAC.setJumpData({jumpData: false})
    expect(store.getState().diagnose.jumpData).toBeFalsy()
  })

  test('getBugsData', () => {
    const diagSearchEQ = [{search1: '1'}, {search2: '2'}]
    diagnoseAC.getBugsData(diagSearchEQ)
    expect(store.getState().diagnose.bugsData).toEqual(expect.arrayContaining(diagSearchEQ))
  })

  test('pressCleanText', () => {
    diagnoseAC.pressCleanText()
    expect(store.getState().diagnose.jumpData).toBeFalsy()
  })
})