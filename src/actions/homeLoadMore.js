import dispatch from './dispatch'
import store from '../utils/store'
import { getPort, postPort, postFormDataPort } from '../utils/fetchMethod'
import { tokenKey, internalServerError } from '../common/strings'
import { checkToken } from '../utils/handleToken'
import { getNews } from '../apis'

export default async () => {
  dispatch('HOME_LOAD_MORE_START')

  let { newsListData, newsListDataMeta } = store.getState().home
  let { offset, limit } = newsListDataMeta

  offset += limit

	try {
		let token = await checkToken(tokenKey)
		let url = `${getNews}?token=${token}&offset=${offset}`

		const result = await getPort(url)
		dispatch('HOME_LOAD_MORE_SUCCESS', result)
	} catch (e) {
		dispatch('HOME_LOAD_MORE_FAILURE', result)
	}
}
