docker.factory('Connection', function() {
    return {uri: "http://localhost:5555/"};
});


docker.factory('Rest', function($http) {
    return{
        get: function(resource, callback, errorhandler) {
            $http.get(resource).
                    success(
                            function(data) {
                                callback(data);
                            }
                    ).error(
                    function(data) {
                        errorhandler(data);
                    }
            );
        }
    };

});