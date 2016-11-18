const Updater   = require( './lib/Updater' )
const updater   = new Updater()

updater
    .start()
    .then( response => {
        console.log( 'Job is done.' )
        process.exit()
    })
    .catch( console.error )
