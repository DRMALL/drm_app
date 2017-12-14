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
  seek_selected_type_data,
  seek_setallrow_false,
  seek_part_first_get,
  seek_part_second_get,
  seek_allpart_get,
  seek_onepart_get,
  seek_search_historydata,
  seek_search_hotworddata,
  seek_search_jumpdata,
  seek_search_data_set,
  seek_search_clean_text,
  seek_type_disabled_T,
  seek_type_disabled_F,
} from '../common/actStrings'

const seek = {
  isRefreshing: false,
  isLoading: false,
  seekPartRow: false,
  seekTypeRow: false,
  selectedPart: allParts,
  selectedType: allTypes,
  topView: {position: 'relative', zIndex: 3},
  secondView: {position: 'absolute', zIndex: 2},
  shareShow: false,
  selectedTypesData: [],
  seekFirstData: [],
  seekSecondData: [],
  allSeekPartData: [],
  allSeekPartDataMeta: null,
  oneSeekPartData: {},
  text: '',
  jumpData: false,
  searchSeekData: [],
  historyData: [],
  hotwordData: [],
  typeTouchDisabled: true,
}

export default (state = seek, action) => {
  switch (action.type) {
    case 'SEEK_LOAD_MORE_START':
      return Object.assign({}, state, { isLoading: true } )
    case 'SEEK_LOAD_MORE_SUCCESS':
      let data = state.allSeekPartData.concat(action.payload.data)
      return Object.assign({}, state, { allSeekPartData: data, allSeekPartDataMeta: action.payload.meta, isLoading: false } )
    case 'SEEK_LOAD_MORE_FAILURE':
      return Object.assign({}, state, { isLoading: false } )
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
    case seek_selected_type_data:
      return Object.assign({}, state, { selectedTypesData: action.payload } )
    case seek_setallrow_false:
      return Object.assign({}, state, { seekPartRow: false, seekTypeRow: false, } )
    case seek_part_first_get:
      return Object.assign({}, state, { seekFirstData: action.payload } )
    case seek_part_second_get:
      return Object.assign({}, state, { seekSecondData: action.payload } )
    case seek_allpart_get:
      return Object.assign({}, state, { allSeekPartData: action.payload.data, allSeekPartDataMeta: action.payload.meta } )
    case seek_onepart_get:
      return Object.assign({}, state, { oneSeekPartData: action.payload } )
    case seek_search_historydata:
      return Object.assign({}, state, { historyData: action.payload } )
    case seek_search_hotworddata:
      return Object.assign({}, state, { hotwordData: action.payload } )
    case seek_search_jumpdata:
      return Object.assign({}, state, action.payload )
    case seek_search_data_set:
      return Object.assign({}, state, { searchSeekData: action.payload } )
    case seek_search_clean_text:
      return Object.assign({}, state, { text: '', jumpData: false, } )
    case seek_type_disabled_T:
      return Object.assign({}, state, { typeTouchDisabled: true } )
    case seek_type_disabled_F:
      return Object.assign({}, state, { typeTouchDisabled: false, } )
    default:
      return state
  }
}