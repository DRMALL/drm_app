import store from '../../utils/store'
import diagnoseAC from '../../actions/diagnoseAC'

export default (dt)=> {
  let allCate = store.getState().diagnose.allCateData
  allCate.map((itemTabType, index)=> {
    if(dt == index) {
      diagnoseAC.selectCate({
        [`tabTypeRow${dt}`]: true,
        selectedCate: itemTabType.text,
      })
    } else diagnoseAC.normalCate({[`tabTypeRow${index}`]: false})
  })
}