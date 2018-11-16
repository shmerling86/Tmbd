var app = angular.module('myApp', ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/movies", {
            templateUrl: "movies/movies.html",
            controller: "movieCtrl"
        })
        .when("/actors", {
            templateUrl: "actors/actors.html",
            controller: "myCtrl"
        })
        // .when("/actors/:name", {
        //     templateUrl: "actors/actors.html",
        //     controller: "myCtrl"
        // })
        .otherwise({
            redirectTo: '/'
        });

});