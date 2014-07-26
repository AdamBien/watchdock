docker.factory('Connection', function($cookieStore) {
    var key = 'dockerUri';
    var dockerUri = $cookieStore.get(key);
    console.log(dockerUri);
    if (!dockerUri) {
        dockerUri = "http://localhost:5555/";
        $cookieStore.put(key, dockerUri);
    }
    return {
        uri: dockerUri,
        update: function(newUri) {
            $cookieStore.put(key, newUri);
        }
    };
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