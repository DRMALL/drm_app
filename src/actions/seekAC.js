import store from '../utils/store'
import dispatch from './dispatch'
import { allParts, allTypes } from '../common/strings'

const createPartTypeState = async (seekPartsData, seekTypesData)=> {
  const seekStateObj = {}
  seekPartsData.map((partItem, indexp)=> {
    seekStateObj[`partColumn${indexp}`] = false
  })
  seekTypesData.map((typeItem, indext)=> {
    seekStateObj[`typeColumn${indext}`] = false
  })
  await dispatch('SEEK_MAKE_PARAMS', seekStateObj)
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
  dispatch('SEEK_OPEN_MODAL', seekRow)
}

const pressPartColumn = (p, seekPartsData)=> {
  let seekState = store.getState().seek
  let partColumnOne = !seekState[`partColumn${p}`]
  seekPartsData.map((partItem, index)=> {
    if(p == index) {
      dispatch('SEEK_PART_TRUE', {
        selectedPart: partColumnOne ? partItem.parts : allParts,
        [`partColumn${p}`]: partColumnOne,
      })
    }
    else dispatch('SEEK_PART_FALSE', {[`partColumn${index}`]: false})
  })
}

const pressTypeColumn = (t, seekTypesData)=> {
  let seekState = store.getState().seek
  let typeColumnOne = !seekState[`typeColumn${t}`]
  console.log(!seekState[`typeColumn${t}`])
  seekTypesData.map((typeItem, index)=> {
    if(t == index) {
      dispatch('SEEK_TYPE_TRUE', {
        selectedType: typeColumnOne ? typeItem.types : allTypes,
        [`typeColumn${t}`]: typeColumnOne,
      })
    }
    else dispatch('SEEK_TYPE_FALSE', {[`typeColumn${index}`]: false})
  })
}

export default {
  createPartTypeState,
  openModal,
  pressPartColumn,
  pressTypeColumn,
}