const firebase = require( 'firebase' )

class Database {
    constructor() {
        this.firebase = firebase.initializeApp({
            apiKey: "AIzaSyAGvAm91N3nOqLN5a-xEtIItPP7t-au0V4",
            authDomain: "zonedl-a714d.firebaseapp.com",
            databaseURL: "https://zonedl-a714d.firebaseio.com",
            storageBucket: "zonedl-a714d.appspot.com",
            messagingSenderId: "322407047174"
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
