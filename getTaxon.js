//this gives a function to use elsewhere in fetching taxa from the zodatsa backbone

const getLoginCookies = require('./specifyLogin.js')
const fetch = require("isomorphic-fetch")

let specifydburl = String.raw`https://zodatsa.sanbi.org.za`

const makeFunc = async collectionName => {
  let cookies = await getLoginCookies('EngelbrechtI', 'ian2018', collectionName, specifydburl)
  let headers = new Headers()
  let collectionID = null
  for (let cookie of cookies){
    headers.append('cookie', cookie)
    if(cookie.includes('collection=')){
      collectionIDString = cookie.substring(cookie.indexOf('collection=') + 'collection='.length, cookie.indexOf(';'))
      collectionID = Number(collectionIDString)
    }
  }

  let func = async taxonName => {
    let encodedName = encodeURI(taxonName.trim())
    let response = await fetch(`${specifydburl}/api/specify/taxon?fullname=${encodedName}`, {headers})
    if(response.status == 200){
      let data = await response.json()
      return data.objects
    }
    else {
      return null
    }
  }

  func.logout = async _ => {
    let cookie = cookies[0]
    let parts = cookie.split(';')
    let tokenkeyval = parts[0].trim()
    let tokenkeyvalparts = tokenkeyval.split('=')
    let token = tokenkeyvalparts[1]

    let collection = Number(cookies[2].split('; ')[0].split('=')[1])

    let loginHeaders = new Headers()
    loginHeaders.append('X-CSRFToken', token);
    loginHeaders.append('Referer', specifydburl);
    loginHeaders.append('cookie', cookie)

    let loggedout = await fetch(`${specifydburl}/context/login/`, {
      method: 'PUT',
      headers: loginHeaders,
      body: JSON.stringify(
        {
          username: null,
          password: null,
          collection: collectionID
        }
      )
    })

    return 
  }

  return func
}

module.exports = makeFunc

