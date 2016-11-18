const Updater   = require( './lib/Updater' )
const updater   = new Updater()

updater
    .start()
    .then( response => {
        console.log( 'Movies updated!' )
        process.exit()
    })
    .catch( console.error )
