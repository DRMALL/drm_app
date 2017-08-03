
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