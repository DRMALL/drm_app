
export const getPort = async (url)=> {
  try {
    let response = await fetch(url)
    if(response.status == 200) {
      let responseJson = await response.json()
      return responseJson
    } else {
      return null
    }
  } catch(err) {
    console.error(err)
  }
}

export const postPort = async (url, obj)=> {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    })
    if(response.status == 200) {
      let responseJson = await response.json()
      return responseJson
    } else {
      return null
    }
  } catch(err) {
    console.error(err)
  }
}

export const postFormDataPort = async (url, formData)=> {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'multipart/form-data',
        'Accept': 'application/json',
      },
      body: formData
    })
    if(response.status == 200) {
      let responseJson = await response.json()
      return responseJson
    } else if(response.status == 413) {
      let responseJson = {
        code: response.status
      }
      return responseJson
    } else {
      return null
    }
  } catch(err) {
    console.error(err)
  }
}