app.controller('movieCtrl', function ($scope, movieService) {

    $scope.movies = [];

    $scope.searchMoviesByText = function () {
        movieService.searchMoviesByText($scope.searchText).then(function (movies) {
            $scope.movies = movies;
        });
        
        if ($scope.searchText == '') {
            $scope.movies = [];
        }
    }

    $scope.selectedMovies = [];

    $scope.searchMoviesById = function (id) {

        movieService.searchMovieById(id).then(function (movie) {
            $scope.selectedMovies.push(movie);
            
            $scope.searchText = '';
            $scope.movies = [];
        });
    }


    $scope.filterOptions =
        [
            { presentation: "Length", field: "length" },
            { presentation: "Popularity", field: "popularity" },
        ];

});


