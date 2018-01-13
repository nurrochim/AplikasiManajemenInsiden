class DashboardController {
  constructor ($scope, $log) { 
    'ngInject'

    // over a year
    $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    $scope.series = ['Detected', 'FID Tested', 'Closed']
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40, 100, 120, 30, 20, 21],
      [60, 48, 40, 19, 86, 27, 90, 70, 99, 25, 30, 18],
      [50, 38, 20, 34, 70, 37, 90, 90, 95, 15, 25, 12],
    ]

    $scope.colours = ['#f70c18', '#3498DB', '#72C02C'];

    // monthly
    $scope.labelsDaily = ['1',	'4',	'5',	'6',	'7',	'8',	'11',	'12',	'13',	'14',	'15',	'18',	'19',	'20',	'21',	'22',	'25',	'26',	'27',	'28',	'29' ]
    //$scope.series = ['Detected', 'FID Tested', 'Closed']
    $scope.dataDaily = [
      [5,	3,	3,	5,	7,	8,	2,	2,	2,	4,	2,	3,	6,	3,	3,	5,	3,	3,	5,	7,	8],
      [2,	4,	2,	2,	4,	3,	5,	5,	5,	3,	3,	8,	3,	7,	5,	5,	5,	4,	3,	5,	4],
      [1,	5,	2,	1,	5,	4,	5,	2,	1,	5,	4,	4,	3,	5,	7,	2,	4,	2,	2,	4,	3],
    ]

    // pie charts monthly
    $scope.labelsPieCharts = ['CR Side Impact',	'Data Migration Issue',	'Deployment Issue',	'Design Issue',	'Newly Used Function',	'Program Bugs'];
    $scope.dataPieCharts = [10, 2, 5, 20, 10, 50]


    //$scope.colours = ['#f70c18', '#3498DB', '#72C02C'];

    $scope.onClick = function () {}

    this.barChartLabels = ['Januarys', 'February', 'March', 'April', 'May', 'June', 'July']
    this.barChartSeries = ['Series A', 'Series B']
    this.barChartData = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ]
    this.barChartColours = [
      {
        fillColor: '#D2D6DE',
        strokeColor: '#D2D6DE',
        pointColor: 'rgba(148,159,177,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(148,159,177,0.8)'
      },
      {
        fillColor: '#00A65A',
        strokeColor: '#00A65A',
        pointColor: '#2980b9',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(77,83,96,1)'
      }
    ]

    this.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
    this.pieData = [300, 500, 100]

    $scope.options = {
      maintainAspectRatio : false
    }
    

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

    $scope.labelsStack = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    $scope.typeStack = 'StackedBar';
    $scope.seriesStack = ['2015', '2016'];
    $scope.optionsStack = {
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };

    $scope.dataStack = [ 
      [65, 59, 90, 81, 56, 55, 40],
      [28, 48, 40, 19, 96, 27, 100]
    ];

    $scope.datasets = [{
      label: 'Dataset 1',
      data: [65, 59, 90, 81, 56, 55, 40 ]
    }, {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 96, 27, 100  ]
    }]
  }
}

export const DashboardComponent = {
  templateUrl: './views/app/components/dashboard/dashboard.component.html',
  controller: DashboardController,
  controllerAs: 'vm',
  bindings: {}
}
