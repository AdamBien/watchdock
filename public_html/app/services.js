docker.factory('Connection', function ($cookieStore) {
    var key = 'dockerUri';
    var dockerUri = $cookieStore.get(key);
    console.log(dockerUri);
    if (!dockerUri) {
        dockerUri = "http://localhost:5555/";
        $cookieStore.put(key, dockerUri);
    }
    return {
        uri: dockerUri,
        update: function (newUri) {
            $cookieStore.put(key, newUri);
        }
    };
});


docker.factory('Docker', function (Connection, $http, $q) {
    var get = function (resource) {
        var deferred = $q.defer();
        $http.get(Connection.uri + resource).
                success(
                        function (data) {
                            deferred.resolve(data);
                        }
                ).error(
                function (data) {
                    deferred.reject(data);
                }
        );
        return deferred.promise;
    };

    return{
        getContainers: function () {
            return get(Connection.uri + "containers/json");
        },
        getContainerDetails: function (containerId) {
            var path = "containers/" + containerId + "/json";
            return get(Connection.uri + path);
        },
        getRuntimeInfo: function (containerId) {
            var path = "containers/" + containerId + "/top?ps_args=aux";
            return get(path);
        },
        getContainerChanges: function (containerId) {
            var path = "containers/" + containerId + "/changes";
            return get(path);
        },
        getLogs: function (containerId) {
            var path = "containers/" + containerId + "/logs?stderr=1&stdout=1&timestamps=1&follow=0&tail=all";
            return get(path);
        }
    };

});

docker.factory('Info', function ($http, $q, Connection) {
    return{
        get: function () {
            var deferred = $q.defer();
            $http.get(Connection.uri + "info").
                    success(
                            function (data) {
                                deferred.resolve(data);
                            }
                    ).error(
                    function (data) {
                        deferred.reject(data);
                    }
            );
            return deferred.promise;
        }
    }
});
docker.factory('Version', function ($http, $q, Connection) {
    return{
        get: function () {
            var deferred = $q.defer();
            $http.get(Connection.uri + "version").
                    success(
                            function (data) {
                                deferred.resolve(data);
                            }
                    ).error(
                    function (data) {
                        deferred.reject(data);
                    }
            );
            return deferred.promise;
        }
    }
});