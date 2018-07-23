app.service('movieService', function ($q, $http, timeService) {
    var API_KEY = "3b254a6a54c49b6d5f5b2f3a62c8df20";

    function Movie(name, length, director, actors, id, imageUrl, imdbUrl, popularity) {
        this.name = name;
        this.length = length;
        this.director = director;
        this.actors = actors;
        this.id = id;
        this.imageUrl = imageUrl;
        this.imdbUrl = imdbUrl;
        this.popularity = popularity;
        this.lengthAsString = timeService.convertor(length)
    }

    function searchMoviesByText(searchText) {
        var async = $q.defer();

        $http.get('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + searchText)
            .then(function (response) {
                var movies = [];
                response.data.results.forEach(function (creditsObject) {
                    var movie = new Movie(creditsObject.original_title, creditsObject.runTime, creditsObject.director,
                        creditsObject.actors, creditsObject.id, creditsObject.poster_path, creditsObject.imdb_id, creditsObject.popularity);
                    movies.push(movie);
                }, function (response) {
                    console.error(response);
                    async.reject([]);
                });

                async.resolve(movies);
            });

        return async.promise;
    }

    /////////////////////

    function searchMovieById(id) {
        var async = $q.defer();

        var API_KEY = "3b254a6a54c49b6d5f5b2f3a62c8df20";
        $http.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_KEY + '&language=en-US')
            .then(function (response) {

                var movieObject = response.data;


                $http.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=3b254a6a54c49b6d5f5b2f3a62c8df20')
                    .then(function (response1) {
                        var creditsObject = response1.data;

                        var actorsArr = [];

                        for (var i = 0; i < 3; i++) {
                            actorsArr.push(creditsObject.cast[i].name);
                        }
                        actorsArr = actorsArr.toString();

                        for (var i = 0; i < creditsObject.crew.length; i++) {

                            if (creditsObject.crew[i].job === "Director") {
                                creditsObject.director = creditsObject.crew[i].name
                            }
                        }

                        var movie = new Movie(movieObject.original_title, movieObject.runtime, creditsObject.director,
                            actorsArr, movieObject.id, movieObject.poster_path, movieObject.imdb_id, movieObject.popularity);

                        async.resolve(movie);


                    }, function (response1) {
                        console.error(response1);
                        async.reject([]);

                    });

            }, function (response) {
                console.error(response);
                async.reject([]);

            });


        return async.promise;
    }


    return {
        searchMoviesByText: searchMoviesByText,
        searchMovieById: searchMovieById
    }

});
