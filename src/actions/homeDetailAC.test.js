import homeDetailAC from './homeDetailAC'
import store from '../utils/store'

describe('homeDetail actions', () => {
  test('isRefresh', () => {
    homeDetailAC.isRefresh()
    expect(store.getState().home.isRefreshing).toBeTruthy()
  })

  test('isnotRefresh', () => {
    homeDetailAC.isnotRefresh()
    expect(store.getState().home.isRefreshing).toBeFalsy()
  })

  test('getOneData', () => {
    const newsOneEQ = {news1: '1'}
    homeDetailAC.getOneData(newsOneEQ)
    expect(store.getState().home.newsOneData).toEqual(expect.objectContaining(newsOneEQ))
  })

  test('showShare', () => {
    homeDetailAC.showShare()
    expect(store.getState().home.shareShow).toBeTruthy()
  })

  test('hiddenShare', () => {
    homeDetailAC.hiddenShare()
    expect(store.getState().home.shareShow).toBeFalsy()
  })

  test('changeWVHeight', () => {
    homeDetailAC.changeWVHeight(10)
    expect(store.getState().home.height).toBe(10)
  })

  test('changeWVHeightCash', () => {
    homeDetailAC.changeWVHeightCash(10)
    expect(store.getState().home.heightCash).toBe(10)
  })

})