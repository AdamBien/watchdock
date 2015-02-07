docker.controller("containerSelectionController",
        function ($scope, $location, Docker, Connection) {
            $scope.host = Connection;
            $scope.error = false;
            var errorHandler = function (data) {
                $scope.error = true;
            };
            $scope.fetchContainers = function () {
                Connection.update($scope.host.uri);
                var promise = Docker.getContainers();
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
        function ($scope, $routeParams, Containers, Connection) {

            $scope.host = Connection;
            $scope.error = false;
            var containerId = $routeParams.containerId;
            console.log(containerId, $scope, Connection);
            var errorHandler = function (data) {
                $scope.error = true;
            };
            var detailsPromise = Containers.getContainerDetails();
            detailsPromise.then(
                    function (data) {
                        $scope.containerDetails = data;
                        $scope.error = false;
                    }, errorHandler);

            var topPromise = Docker.getRuntimeInfo();
            topPromise.then(
                    function (data) {
                        $scope.runtimeInfo = data;
                        $scope.error = false;
                    }, errorHandler);

            var changesPromise = Containers.getContainerChanges();
            changesPromise.then(
                    function (data) {
                        $scope.changes = data;
                        $scope.error = false;
                    }, errorHandler);

            var logsPromise = Containers.getContainerLogs();
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

docker.controller("infoController", function ($scope, Docker) {
    var infoPromise = Docker.getInfo();
    infoPromise.then(function (data) {
        $scope.info = data;
    });
    var versionPromise = Docker.getVersion();
    versionPromise.then(function (data) {
        $scope.version = data;
    });
});