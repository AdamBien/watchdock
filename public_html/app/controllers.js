var computeUri = function(baseUri, reminder) {
    if (baseUri && baseUri !== '' && baseUri.length > 2) {
        if (baseUri.charAt(baseUri.length - 1) !== '/')
            baseUri += '/';
    }
    return baseUri + reminder;
};

docker.controller("containerSelectionController",
        function($scope, $location, Rest, Connection) {
            $scope.host = Connection;
            $scope.error = false;
            var errorHandler = function(data) {
                $scope.error = true;
            };

            $scope.fetchContainers = function() {
                Rest.get(computeUri(Connection.uri, "containers/json"), function(data) {
                    $scope.containers = data;
                    $scope.error = false;
                }, errorHandler);

            }

            $scope.containerSelected = function(containerName, containerId) {
                var path = "/" + containerId;
                $location.path(path);
                console.log("Navigating to container: " + containerName + " with name: " + path);
            };
        }
);


docker.controller("containerController",
        function($scope, $routeParams, Rest, Connection) {

            $scope.host = Connection;
            $scope.error = false;
            var containerId = $routeParams.containerId;
            console.log(containerId, $scope, Connection);
            var path = "containers/" + containerId + "/json";

            var errorHandler = function(data) {
                $scope.error = true;
            };

            Rest.get(computeUri(Connection.uri, path), function(data) {
                $scope.containerDetails = data;
                $scope.error = false;
            }, errorHandler);
            Rest.get(computeUri(Connection.uri, "containers/" + containerId + "/top"), function(data) {
                $scope.runtimeInfo = data;
                $scope.error = false;
            }, errorHandler);
            Rest.get(computeUri(Connection.uri, "containers/" + containerId + "/changes"), function(data) {
                $scope.changes = data;
                $scope.error = false;
            }, errorHandler);
            Rest.get(computeUri(Connection.uri, "containers/" + containerId + "/logs?stderr=1&stdout=1&timestamps=1&follow=0&tail=all"),
                    function(data) {
                        var splitted = data.split("\n");
                        $scope.logs = splitted;
                        $scope.error = false;
                    }, errorHandler);

            $scope.classForKind = function(kind) {
                if (kind === 1)
                    return 'created';
                else
                    return 'changed';
            };
        }
);