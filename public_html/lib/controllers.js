docker.controller("containerController",
        function($scope, Rest, Connection) {
            $scope.host = Connection;

            $scope.fetchContainers = function() {
                Rest.get(computeUri(Connection.uri, "containers/json"), function(data) {
                    $scope.containers = data;
                });

            }
            $scope.containerSelected = function(containerName, containerId) {
                console.log(containerName, containerId);
                Rest.get(computeUri(Connection.uri, "containers" + containerName + "/json"), function(data) {
                    $scope.containerDetails = data;
                });
                Rest.get(computeUri(Connection.uri, "containers/" + containerId + "/top"), function(data) {
                    $scope.runtimeInfo = data;
                });

                Rest.get(computeUri(Connection.uri, "containers/" + containerId + "/changes"), function(data) {
                    $scope.changes = data;
                });
            };

            $scope.classForKind = function(kind) {
                if (kind === 1)
                    return 'created';
                else
                    return 'changed';


            }

            var computeUri = function(baseUri, reminder) {
                if (baseUri !== '') {
                    if (baseUri.charAt(baseUri.length - 1) !== '/')
                        baseUri += '/';
                }
                return baseUri + reminder;
            }

        }
);
