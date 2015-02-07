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
docker.factory('Http', function (Connection, $http, $q) {
    return{
        get: function (resource) {
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
        }
    };
});
docker.factory('Containers', function (Http) {
    return{
        getAll: function () {
            return Http.get("containers/json");
        },
        getDetails: function (containerId) {
            var path = "containers/" + containerId + "/json";
            return Http.get(path);
        },
        getRuntimeInfo: function (containerId) {
            var path = "containers/" + containerId + "/top?ps_args=aux";
            return Http.get(path);
        },
        getChanges: function (containerId) {
            var path = "containers/" + containerId + "/changes";
            return Http.get(path);
        },
        getLogs: function (containerId) {
            var path = "containers/" + containerId + "/logs?stderr=1&stdout=1&timestamps=1&follow=0&tail=all";
            return Http.get(path);
        }
    };
});

docker.factory('Docker', function (Http) {
    return{
        getInfo: function () {
            return Http.get("info");
        },
        getVersion: function () {
            return Http.get("version");
        }

    };
});

docker.factory('Images', function (Connection, $resource) {
    return $resource(Connection.uri + "images/json");
});

