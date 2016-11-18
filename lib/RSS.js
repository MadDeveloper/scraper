const feed = require( 'feed-read' )

class RSS {
    read( uri ) {
        return new Promise( ( resolve, reject ) => {
            feed( uri, ( error, movies ) => {
                if ( error ) {
                    reject( error )
                    return
                }

                resolve( movies )
            })
        })
    }
}

module.exports = RSS
