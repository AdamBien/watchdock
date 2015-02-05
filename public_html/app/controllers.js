var computeUri = function (baseUri, reminder) {
    if (baseUri && baseUri !== '' && baseUri.length > 2) {
        if (baseUri.charAt(baseUri.length - 1) !== '/')
            baseUri += '/';
    }
    return baseUri + reminder;
};
docker.controller("containerSelectionController",
        function ($scope, $location, Docker, Connection) {
            $scope.host = Connection;
            $scope.error = false;
            var errorHandler = function (data) {
                $scope.error = true;
            };
            $scope.fetchContainers = function () {
                Connection.update($scope.host.uri);
                var promise = Docker.get(computeUri(Connection.uri, "containers/json"));
                promise.then(function (data) {
                    $scope.containers = data;
                    $scope.error = false;
                }, errorHandler);
            }

            $scope.containerSelected = function (containerName, containerId) {
                var path = "/" + containerId;
                $location.path(path);
                console.log("Navigating to container: " + containerName + " with name: " + path);
            };
        }
);
docker.controller("containerController",
        function ($scope, $routeParams, Docker, Connection) {

            $scope.host = Connection;
            $scope.error = false;
            var containerId = $routeParams.containerId;
            console.log(containerId, $scope, Connection);
            var path = "containers/" + containerId + "/json";
            var errorHandler = function (data) {
                $scope.error = true;
            };
            var detailsPromise = Docker.get(computeUri(Connection.uri, path));
            detailsPromise.then(
                    function (data) {
                        $scope.containerDetails = data;
                        $scope.error = false;
                    }, errorHandler);

            var topPromise = Docker.get(computeUri(Connection.uri, "containers/" + containerId + "/top?ps_args=aux"));
            topPromise.then(
                    function (data) {
                        $scope.runtimeInfo = data;
                        $scope.error = false;
                    }, errorHandler);

            var changesPromise = Docker.get(computeUri(Connection.uri, "containers/" + containerId + "/changes"));
            changesPromise.then(
                    function (data) {
                        $scope.changes = data;
                        $scope.error = false;
                    }, errorHandler);

            var logsPromise = Docker.get(computeUri(Connection.uri, "containers/" + containerId + "/logs?stderr=1&stdout=1&timestamps=1&follow=0&tail=all"));
            logsPromise.then(
                    function (data) {
                        var splitted = data.split("\n");
                        $scope.logs = splitted;
                        $scope.error = false;
                    }, errorHandler);

            $scope.classForKind = function (kind) {
                if (kind === 1)
                    return 'created';
                else
                    return 'changed';
            };
        }
);

docker.controller("infoController", function ($scope, Info) {
    var infoPromise = Info.get();
    infoPromise.then(function (data) {
        $scope.info = data;
    });

});