class DashboardController {
  constructor ($scope, $log) {
    'ngInject'

    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    $scope.series = ['Series A', 'Series B']
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ]

    $scope.onClick = function () {}

    $scope.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
    $scope.pieData = [300, 500, 100]

    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];
  
    $scope.status = {
      isopen: false
    };
  
    $scope.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
    };
  
    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  
    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
  }
}

export const DashboardComponent = {
  templateUrl: './views/app/components/dashboard/dashboard.component.html',
  controller: DashboardController,
  controllerAs: 'vm',
  bindings: {}
}
