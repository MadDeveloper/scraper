const RSS           = require( './RSS' )
const Database      = require( './Database' )
const { remote }    = require( './../config' )

class Updater {
    constructor() {
        this.rss = new RSS()
        this.database = new Database()
    }

    start() {
        return this
            .rss
            .read( remote.uri )
            .then( movies => this.database.save( movies ) )
    }
}

module.exports = Updater
