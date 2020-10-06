//This does the logging in work

const fetch = require("isomorphic-fetch")
//const clipboardy = require('clipboardy'); //dev only

const getLoginCookies = async (username, password, collection, specifydburl) => {
  let response = await fetch(`${specifydburl}/context/login`)
  let cookie = response.headers.get('Set-Cookie')
  let parts = cookie.split(';')
  let tokenkeyval = parts[0].trim()
  let tokenkeyvalparts = tokenkeyval.split('=')
  let token = tokenkeyvalparts[1]
  let data = await response.json()
  let colls = data.collections //this is an object of 'collectionname': 'collectionID' pairs
  let collectionID = colls[collection]

  let loginHeaders = new Headers()
  loginHeaders.append('X-CSRFToken', token);
  loginHeaders.append('Referer', specifydburl);
  loginHeaders.append('cookie', cookie)
 
  let loggedin = await fetch(`${specifydburl}/context/login/`, {
    method: 'PUT',
    headers: loginHeaders,
    body: JSON.stringify(
      {
        username,
        password,
        collection: collectionID
      }
    )
  })

  if(loggedin.status == 204) { //success
    /*
    //debug only
    let body = await loggedin.text()
    clipboardy.writeSync(body);
    */
    let logincookies = loggedin.headers['_headers']['set-cookie'] //this is an array, we have to get it like this

    return logincookies
  }
  else {
    return null
  }
}

module.exports = getLoginCookies
