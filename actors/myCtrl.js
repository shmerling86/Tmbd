app.controller('myCtrl', function ($scope, $log, $routeParams, actorService) {

    $scope.actors = [];

    actorService.readFile().then(function (actors) {
    //regular route
        $scope.actors = actors;

    //dynamic route
        // $scope.actors = actors.filter(function (actor) { if($routeParams.name == actor.fName) { return actor } });

    }, function (error) {
        $log.error(error)
    });

    $scope.addMark = function (actor) {
        for (var i = 0; i < $scope.actors.length; i++) {
            $scope.actors[i].isSelected = false;
        }
        actor.isSelected = true;
    }
    
    $scope.filterOptions = 
    [
        {presentation: "First Name", field: "fName"},
        {presentation: "Last Name", field: "lName"},
        {presentation: "Birthday", field: "birthday"}
    ];


});