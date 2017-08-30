import getHomeData from './getHomeData'
import store from '../utils/store'

describe('getHomeData actions', () => {
  test('unknown', () => {
    getHomeData()
    expect(store.getState().home.newsListData).toBe(undefined)
  })

  test('exist value', () => {
    const homeListEQ = [{data: '1'}, {data: '2'}]
    getHomeData(homeListEQ)
    expect(store.getState().home.newsListData).toEqual(expect.arrayContaining(homeListEQ))
  })
})