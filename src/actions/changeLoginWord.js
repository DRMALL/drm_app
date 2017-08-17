import dispatch from './dispatch'

const changeLoginWord = (textWord)=> {
  dispatch('HOME_WORD', textWord)
}

export default changeLoginWord