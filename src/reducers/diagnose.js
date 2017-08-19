const diagnose = (()=> {
  let diagTabState = {
    allDiagnoseData: [],
    allCateData: [],
    selectedCate: '',
  }
  for(var i = 0; i < 10; i++) {
    if(i == 0) diagTabState[`tabTypeRow${i}`] = true
    else diagTabState[`tabTypeRow${i}`] = false
  }
  return diagTabState
})()

export default (state = diagnose, action) => {
  switch (action.type) {
    case 'DIAGNOSE_DATA_GET':
      return Object.assign({}, state, { allDiagnoseData: action.payload })
    case 'DIAGNOSE_CATE_GET':
      return Object.assign({}, state, action.payload)
    case 'DIAGNOSE_TAB_TRUE':
      return Object.assign({}, state, action.payload)
    case 'DIAGNOSE_TAB_FALSE':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}