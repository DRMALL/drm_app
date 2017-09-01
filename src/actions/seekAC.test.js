import seekAC from './seekAC'
import store from '../utils/store'

describe('seek actions', () => {
  test('isRefresh', () => {
    seekAC.isRefresh()
    expect(store.getState().seek.isRefreshing).toBeTruthy()
  })

  test('isnotRefresh', () => {
    seekAC.isnotRefresh()
    expect(store.getState().seek.isRefreshing).toBeFalsy()
  })

  test('createPartTypeState', () => {
    seekAC.createPartTypeState(['0'], [])
    expect(store.getState().seek.partColumn0).toBeFalsy()
  })

  test('openModal', () => {
    seekAC.openModal('seekPartRow')
    expect(store.getState().seek.seekTypeRow).toBeFalsy()
  })

  test('pressPartColumn', () => {
    seekAC.pressPartColumn(0, [])
    expect(store.getState().seek.typeColumn0).toBeFalsy()
  })

  test('pressTypeColumn', () => {
    seekAC.pressTypeColumn(0, [])
    expect(store.getState().seek.typeColumn1).toBeFalsy()
  })

  test('pressShareShow', () => {
    seekAC.pressShareShow()
    expect(store.getState().seek.shareShow).toBeTruthy()
  })

  test('pressShareCancel', () => {
    seekAC.pressShareCancel()
    expect(store.getState().seek.shareShow).toBeFalsy()
  })
})