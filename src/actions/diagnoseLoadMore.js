import dispatch from './dispatch'
import store from '../utils/store'
import { getPort, postPort, postFormDataPort } from '../utils/fetchMethod'
import { tokenKey, internalServerError } from '../common/strings'
import { checkToken } from '../utils/handleToken'
import { getBugs } from '../apis'

export default async () => {
  dispatch('DIAGNOSE_LOAD_MORE_START')

  let { allDiagnoseData, allDiagnoseDataMeta, selectedCate } = store.getState().diagnose
  let { offset, limit } = allDiagnoseDataMeta

  offset += limit

	try {
		let token = await checkToken(tokenKey)
		let url = `${getBugs}?token=${token}&category_id=${selectedCate}&offset=${offset}`

		const result = await getPort(url)
		dispatch('DIAGNOSE_LOAD_MORE_SUCCESS', result)
	} catch (e) {
		dispatch('DIAGNOSE_LOAD_MORE_FAILURE', result)
	}
}
