The LIRI app provides the user with the ability to search various databases for information on movies, songs, and concerts.

The app takes in a search command and search term from the terminal and runs the search term through the relevant API/database, be that BandsInTown, Spotify, or OMDB.

NPM Install requirements: dotenv, node-spotify-api, axios, moment, fs
Node/Terminal Command Options: 
    concert-this (band/artist name)
        returns list of concerts with their venue name/location and time/date
    spotify-this-song (song title)
        returns search results for song title, with artists names, song names, spotify preview urls and album names
    movie-this (movie title)
        return search results for movie title, with title, release year, imdb and rotten tomatoes ratings, countries filmed in, languages available,    plot summary and actors
    do-what-it-says
        runs command/search entered into random.txt file

Deployed: https://holmanelisek.github.io/liri/

EKH, Developer