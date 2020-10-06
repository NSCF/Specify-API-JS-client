## Specify 7 API Javascript (Node) client

This is just a demo of how to use the Specify 7 API using Node. It currently just provides a model for logging in and creating query functions that can be used to get data from the API. It may be developed further depending on needs of the NSCF team but please feel free to make contributions. Contact Ian Engelbrecht on ian.atsymbol.nscf.org.za

The [documentation for the Specify 7 API is here](https://github.com/specify/specify7/wiki/Api-Demo)

The challenge with the API is managing logins, which currently use cookies. 

This client currently contains three files:

- specifyLogin.js, which gets the login cookies
- getTaxon.js, which generates a function that can then be used to fetch records from the taxon table. At present this only works on fetching by taxon name, but use this file as a model for generating more complex query functions. Remember to attach a logout function!
- index.js, which is a demo of how to use the generated function to fetch a taxon record and print the authority to screen. 