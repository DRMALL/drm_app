import { allParts, allTypes } from '../common/strings'

const seek = {
  seekPartRow: false,
  seekTypeRow: false,
  selectedPart: allParts,
  selectedType: allTypes,
  topView: {position: 'relative', zIndex: 3},
  secondView: {position: 'absolute', zIndex: 2},
}

export default (state = seek, action) => {
  switch (action.type) {
    case 'SEEK_MAKE_PARAMS':
      return Object.assign({}, state, action.payload )
    case 'SEEK_OPEN_MODAL':
      return Object.assign({}, state, action.payload )
    case 'SEEK_PART_TRUE':
      return Object.assign({}, state, action.payload )
    case 'SEEK_PART_FALSE':
      return Object.assign({}, state, action.payload )
    case 'SEEK_TYPE_TRUE':
      return Object.assign({}, state, action.payload )
    case 'SEEK_TYPE_FALSE':
      return Object.assign({}, state, action.payload )
    default:
      return state
  }
}