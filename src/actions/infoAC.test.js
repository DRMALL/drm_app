import infoAC from './infoAC'
import store from '../utils/store'

describe('info actions', () => {
  test('getInfomationData', () => {
    const infoEQ = {
      user_name: 'test',
      company_name: 'test',
      phone_number: 'test',
      postal_address: 'test',
    }
    infoAC.getInfomationData(infoEQ)
    expect(store.getState().information).toEqual(expect.objectContaining(infoEQ))
  })
})