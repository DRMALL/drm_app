import { allParts, allTypes } from '../common/strings'
import { 
  seek_refresh_T,
  seek_refresh_F,
  seek_make_params,
  seek_open_modal,
  seek_part_T,
  seek_part_F,
  seek_type_T,
  seek_type_F,
  seek_detail_share_show,
  seek_detail_share_hidden,
} from '../common/actStrings'

const seek = {
  isRefreshing: false,
  seekPartRow: false,
  seekTypeRow: false,
  selectedPart: allParts,
  selectedType: allTypes,
  topView: {position: 'relative', zIndex: 3},
  secondView: {position: 'absolute', zIndex: 2},
  shareShow: false,
}

export default (state = seek, action) => {
  switch (action.type) {
    case seek_refresh_T:
      return Object.assign({}, state, { isRefreshing: true } )
    case seek_refresh_F:
      return Object.assign({}, state, { isRefreshing: false } )
    case seek_make_params:
      return Object.assign({}, state, action.payload )
    case seek_open_modal:
      return Object.assign({}, state, action.payload )
    case seek_part_T:
      return Object.assign({}, state, action.payload )
    case seek_part_F:
      return Object.assign({}, state, action.payload )
    case seek_type_T:
      return Object.assign({}, state, action.payload )
    case seek_type_F:
      return Object.assign({}, state, action.payload )
    case seek_detail_share_show:
      return Object.assign({}, state, { shareShow: true } )
    case seek_detail_share_hidden:
      return Object.assign({}, state, { shareShow: false } )
    default:
      return state
  }
}