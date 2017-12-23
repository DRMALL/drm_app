import dispatch from './dispatch'
import store from '../utils/store'
import { getPort, postPort, postFormDataPort } from '../utils/fetchMethod'
import { tokenKey, internalServerError } from '../common/strings'
import { checkToken } from '../utils/handleToken'
import { getDevices } from '../apis'

export default async () => {
  dispatch('DEVICE_LOAD_MORE_START')

  let { allDevicesData, allDevicesDataMeta } = store.getState().device
  let { offset, limit } = allDevicesDataMeta
  console.log(111,offset, limit )
  offset += limit
  console.log(222,offset, limit )

	try {
		let token = await checkToken(tokenKey)
		let url = `${getDevices}?token=${token}&offset=${offset}`

		const result = await getPort(url)
		dispatch('DEVICE_LOAD_MORE_SUCCESS', result)
	} catch (e) {
		dispatch('DEVICE_LOAD_MORE_FAILURE', result)
	}
}
