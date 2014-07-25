docker.factory('Connection', function() {
    return {uri: "http://localhost:5555/"};
});


docker.factory('Docker', function($http, $q) {
    return{
        get: function(resource) {
            var deferred = $q.defer();
            $http.get(resource).
                    success(
                            function(data) {
                                deferred.resolve(data);
                            }
                    ).error(
                    function(data) {
                        deferred.reject(data);
                    }
            );
            return deferred.promise;
        }
    };

});