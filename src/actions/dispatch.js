import store from '../utils/store'

const dispatch = ( type, payload )=> {
  // console.log(type, payload)
  if( typeof(payload)==='undefined' ) {
    return store.dispatch({ type })
  }
  else store.dispatch({ type, payload })
}

export default dispatch