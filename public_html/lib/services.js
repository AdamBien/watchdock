docker.factory('Connection', function() {
    return {uri: "http://localhost:5555/"};
});

docker.factory('Rest', function($http) {
    return{
        get: function(resource, callback) {
            $http.get(resource).
                    success(
                            function(data) {
                                callback(data);
                            }
                    );

        }
    };

});