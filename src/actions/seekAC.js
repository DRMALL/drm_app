import store from '../utils/store'
import dispatch from './dispatch'
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

import getSecondPartData from '../funcs/seek/getSecondPartData'
import { getPort, postPort, postFormDataPort } from '../utils/fetchMethod'
import { getPartSearch, getPartHots, getPartFirst, getPartSecond, getPartOne } from '../apis'
import { tokenKey, internalServerError } from '../common/strings'
import { checkToken } from '../utils/handleToken'

const getCategory = async (one = null, two = null) => {
  const token = await checkToken(tokenKey)
  let url
  if (one == allParts) one = null
  if (two == allTypes) two = null
  if (one && !two) url = `${getPartSearch}?token=${token}&level_one=${one}`
  if (one && two) url = `${getPartSearch}?token=${token}&level_one=${one}&level_two=${two}`
  if (!one && !two) url = `${getPartSearch}?token=${token}`

  let result = await getPort(url)

  if(result) {
    dispatch(seek_allpart_get, result)
  }  
}

const loadMore = async (one = null, two = null) => {
  dispatch('SEEK_LOAD_MORE_START')

  let { allSeekPartDataMeta } = store.getState().seek
  let { offset, limit } = allSeekPartDataMeta
  offset += limit

  let token = await checkToken(tokenKey)
  let url 

  if (one == allParts) one = null
  if (two == allTypes) two = null
  if (one && !two) url = `${getPartSearch}?token=${token}&level_one=${one}&offset=${offset}`
  if (one && two) url = `${getPartSearch}?token=${token}&level_one=${one}&level_two=${two}&offset=${offset}`
  if (!one && !two) url = `${getPartSearch}?token=${token}&offset=${offset}`

  const result = await getPort(url)

  if(result) {
    dispatch('SEEK_LOAD_MORE_SUCCESS', result)
  } else {
    dispatch('SEEK_LOAD_MORE_FAILURE', result)
  }   
}

const isRefresh = ()=> {
  dispatch(seek_refresh_T)
}

const isnotRefresh = ()=> {
  dispatch(seek_refresh_F)
}

const createPartTypeState = async (seekPartsData, seekTypesData)=> {
  const seekStateObj = {}
  seekPartsData.map((partItem, indexp)=> {
    seekStateObj[`partColumn${indexp}`] = false
  })
  seekTypesData.map((typeItem, indext)=> {
    seekStateObj[`typeColumn${indext}`] = false
  })
  await dispatch(seek_make_params, seekStateObj)
}

const openModal = (which)=> {
  let seekRow = {}
    , { seekPartRow, seekTypeRow } = store.getState().seek
  switch(which) {
    case 'seekPartRow': 
      seekRow = {
        seekPartRow: !seekPartRow,
        seekTypeRow: false,
      }
      
    break
    case 'seekTypeRow': 
      seekRow = {
        seekPartRow: false,
        seekTypeRow: !seekTypeRow,
      }
    break
    default: null
  }
  dispatch(seek_open_modal, seekRow)
}

const pressCategoryOne = (p, seekPartsData)=> {
  let seekState = store.getState().seek
  let partColumnOne = !seekState[`partColumn${p}`]
  seekPartsData.map((partItem, index)=> {
    if(p == index) {
      dispatch(seek_part_T, {
        selectedPart: partColumnOne ? partItem.name : allParts,
        [`partColumn${p}`]: partColumnOne,
        seekPartRow: partColumnOne ? false : seekState.seekPartRow,
      })
      if(partColumnOne) {
        getCategory(partItem.name)
        getSecondPartData(partItem._id)
      } else {
        dispatch(seek_part_second_get, [])
        getCategory()
      }
      // dispatch(seek_selected_type_data, partColumnOne ? partItem.types : [])
    }
    else {
      dispatch(seek_part_F, {[`partColumn${index}`]: false})
    }
  })
  dispatch(seek_type_T, { selectedType: allTypes, typeTouchDisabled: partColumnOne ? false : true})
}

const pressCategoryTwo = (t, seekTypesData)=> {
  let seekState = store.getState().seek
  let typeColumnOne = !seekState[`typeColumn${t}`]

  seekTypesData.map((typeItem, index)=> {
    if(t == index) {
      dispatch(seek_type_T, {
        selectedType: typeColumnOne ? typeItem.name : allTypes,
        [`typeColumn${t}`]: typeColumnOne,
        seekTypeRow: typeColumnOne ? false : seekState.seekTypeRow,
      })
      getCategory(seekState.selectedPart, typeItem.name)
    }
    else dispatch(seek_type_F, {[`typeColumn${index}`]: false})
  })
}

const pressShareShow = ()=> {
  dispatch(seek_detail_share_show)
}

const pressShareCancel = ()=> {
  dispatch(seek_detail_share_hidden)
}

const setAllRowFalse = ()=> {
  dispatch(seek_setallrow_false)
}

const setFirstPart = (payload)=> {
  dispatch(seek_part_first_get, payload)
}

const setSecondPart = (payload)=> {
  dispatch(seek_part_second_get, payload)
}

const setAllPart = (payload)=> {
  dispatch(seek_allpart_get, payload)
}

const setOnePart = (payload)=> {
  dispatch(seek_onepart_get, payload)
}

const setHistoryData = (payload)=> {
  dispatch(seek_search_historydata, payload)
}

const setHotwordData = (payload)=> {
  dispatch(seek_search_hotworddata, payload)
}

const setJumpData = (text)=> {
  dispatch(seek_search_jumpdata, {
    text: text,
    jumpData: text == '' ? false : true,
  })
}

const setSearchSeekData = (payload)=> {
  dispatch(seek_search_data_set, payload)
}

const pressCleanText = ()=> {
  dispatch(seek_search_clean_text)
}

const setTypeDisabledTrue = ()=> {
  dispatch(seek_type_disabled_T)
}

const setTypeDisabledFalse = ()=> {
  dispatch(seek_type_disabled_F)
}

export default {
  loadMore,
  isRefresh,
  isnotRefresh,
  createPartTypeState,
  openModal,
  pressCategoryOne,
  pressCategoryTwo,
  pressShareShow,
  pressShareCancel,
  setAllRowFalse,
  setFirstPart,
  setSecondPart,
  setAllPart,
  setOnePart,
  setHistoryData,
  setHotwordData,
  setJumpData,
  setSearchSeekData,
  pressCleanText,
  setTypeDisabledTrue,
  setTypeDisabledFalse,
}