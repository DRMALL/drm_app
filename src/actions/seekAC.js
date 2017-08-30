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
} from '../common/actStrings'

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
    case 'seekPartRow': {
      seekRow = {
        seekPartRow: !seekPartRow,
        seekTypeRow: false,
      }
    };break
    case 'seekTypeRow': {
      seekRow = {
        seekPartRow: false,
        seekTypeRow: !seekTypeRow,
      }
    };break
    default: null
  }
  dispatch(seek_open_modal, seekRow)
}

const pressPartColumn = (p, seekPartsData)=> {
  let seekState = store.getState().seek
  let partColumnOne = !seekState[`partColumn${p}`]
  seekPartsData.map((partItem, index)=> {
    if(p == index) {
      dispatch(seek_part_T, {
        selectedPart: partColumnOne ? partItem.parts : allParts,
        [`partColumn${p}`]: partColumnOne,
      })
      dispatch(seek_selected_type_data, partColumnOne ? partItem.types : [])
    }
    else dispatch(seek_part_F, {[`partColumn${index}`]: false})
  })
  for(var i = 0; i < 10; i++) {
    dispatch(seek_type_T, {
      selectedType: allTypes,
    })
    dispatch(seek_type_F, {[`typeColumn${i}`]: false})
  }
}

const pressTypeColumn = (t, seekTypesData)=> {
  let seekState = store.getState().seek
  let typeColumnOne = !seekState[`typeColumn${t}`]
  seekTypesData.map((typeItem, index)=> {
    if(t == index) {
      dispatch(seek_type_T, {
        selectedType: typeColumnOne ? typeItem : allTypes,
        [`typeColumn${t}`]: typeColumnOne,
      })
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

export default {
  isRefresh,
  isnotRefresh,
  createPartTypeState,
  openModal,
  pressPartColumn,
  pressTypeColumn,
  pressShareShow,
  pressShareCancel,
}