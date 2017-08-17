import dispatch from './dispatch'

const changeLoginEmail = (textEmail)=> {
  dispatch('LOGIN_EMAIL', textEmail)
}

export default changeLoginEmail