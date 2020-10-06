const getTaxonFunc = require('./getTaxon') //

//This is just a demo of how to use this
//Create the getTaxon function first, then that can be reused. Remember to log out at the end

let collection = "Reptiles"
let taxonName = 'Amblyodipsas polylepis'

getTaxonFunc(collection).then(getTaxon => {
  getTaxon(taxonName).then(async records => {

    if (records && records.length){
      console.log(`Authority for ${taxonName} is ${records[0].author}`)
    }
    else {
      console.log(`no records returned for ${taxonName}`)
    }

    await getTaxon.logout()

    console.log('all done')
    
  }).catch(err => console.log('error fetching taxon:', err.message))
}).catch(err => console.log('error logging in:', err.message))



