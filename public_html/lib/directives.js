docker.directive('panel', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: 'panel.html',
        scope: {
            title: '@',
            class: '@'
        }
    };
});