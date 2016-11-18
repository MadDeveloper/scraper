const firebase = require( 'firebase' )

class Database {
    constructor() {
        this.firebase = firebase.initializeApp({
            apiKey: "your-api-key",
            authDomain: "your-auth-domain",
            databaseURL: "your-database-url",
            storageBucket: "your-storage-bucket",
            messagingSenderId: "your-sender-id"
        })
    }

    save( movies ) {
        if ( Array === movies.constructor ) {
            let updates = {}
            let movieId = null

            return this
                .findAll()
                .then( moviesExisting => {
                    if ( null !== moviesExisting ) {
                        moviesExisting = Object.keys( moviesExisting ).map( movieExistingId => moviesExisting[ movieExistingId ] )
                        movies = movies.filter( movie => -1 === moviesExisting.map( movieExisting => movieExisting.title ).indexOf( movie.title ) )
                    }

                    movies.forEach( movie => {
                        movieId = this.firebase.database().ref().child( 'movies' ).push().key
                        updates[ `movies/${movieId}` ] = movie
                    })

                    return this
                        .firebase
                        .database()
                        .ref()
                        .update( updates )
                })
        } else {
            return Promise.reject()
        }
    }

    findAll() {
        return this
            .firebase
            .database()
            .ref( 'movies' )
            .once( 'value' )
            .then( snapshot => snapshot.val() )
    }
}

module.exports = Database
