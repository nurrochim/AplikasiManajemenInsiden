class FixingIncidentFormController{
    constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, $uibModal) {
        'ngInject'

        this.$state = $state;
        this.$uibModal = $uibModal
        this.formSubmitted = false;
        this.alerts = [];
        this.form_title = '';
        this.API = API;
        this.$scope = $scope;
        this.raise_date = "2017-09-21T18:25:43-05:00";
        this.EditIssueId = '';
        this.stepOne = true;
        this.stepTwo = false;
        this.stepThree = false;
        this.stepFour = false;
        this.classElemetStepTwo = 'btn btn-default btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
        this.classElemetStepFour = 'btn btn-default btn-circle';
        this.disableButtonStepTwo = true;
        this.showAlert = false;
        //this.issueDataEdit = {};

        let issueId = $stateParams.issueId
        this.EditIssueId = issueId;
        let inputState = $stateParams.inputState
        //$log.info(issueId+' '+inputState);

        if ($stateParams.alerts) {
            this.alerts.push($stateParams.alerts);
            this.showAlert = true;
            if (!!this.alerts[0].inputState) {
                inputState = this.alerts[0].inputState;
                issueId = this.alerts[0].issueId;
                this.EditIssueId = issueId;
            }
        }

        if ($stateParams.disableButtonStepTwo !== null) {
            this.disableButtonStepTwo = $stateParams.disableButtonStepTwo;
            this.stepTwo = true;
            this.stepOne = false;
            this.classElemetStepTwo = 'btn btn-primary btn-circle';
        }

        this.form_title = "Edit Fixing Incident";
        this.form_subTitle = "Incident Number";

        function getIssueData() {

        }

        $scope.today = function () {
            $scope.dt = new Date();
        };

        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        // $scope.setDate = function (year, month, day) {
        //   $scope.dt = new Date(year, month, day);
        // };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };


        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }



        // Priority
        $scope.options = [
            {
                name: 'Critical',
                value: 'Critical'
            },
            {
                name: 'High',
                value: 'High'
            },
            {
                name: 'Medium',
                value: 'Medium'
            },
            {
                name: 'Low',
                value: 'Low'
            }
        ];
        $scope.selectedOption = $scope.options[0].value;

        var uploader = $scope.uploader = new FileUploader({
            url: 'upload'
          });
      
          $scope.deleteImage = function (id) {
            console.info('removeId', id);
            $http.post('/destroy-image', { id: id })
              .then(function (success) {
                //console.info('remove', success);
                c//onsole.info('remove', success.data.message);
              }, function (error) {
      
              });
          }
      
          $scope.removeFile = function (attachment) {
            var path = 'delete';
            $http({
              url: path,
              data: attachment,
              method: 'POST',
              headers: {
                'Content-Type': undefined
              }
            })
              .success(function (result) {
                //alert(result);
                //console.info('remove', result);
              });
          }
      
          // FILTERS
      
          uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
              var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
          });
    }

    eventStepOne() {
        this.stepOne = true;
        this.stepTwo = false;
        this.stepThree = false;
        this.classElemetStepTwo = 'btn btn-default btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
        this.classElemetStepFour = 'btn btn-default btn-circle';
    }

    eventStepTwo() {
        this.stepOne = false;
        this.stepTwo = true;
        this.stepThree = false;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
        this.classElemetStepFour = 'btn btn-default btn-circle';
    }

    eventStepThree() {
        this.stepOne = false;
        this.stepTwo = false;
        this.stepThree = true;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-primary btn-circle';
        this.classElemetStepFour = 'btn btn-default btn-circle';
    }

    eventStepFour() {
        this.stepOne = false;
        this.stepTwo = false;
        this.stepThree = false;
        this.stepFour = true;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-primary btn-circle';
        this.classElemetStepFour = 'btn btn-primary btn-circle';
    }

    $onInit(){
    }
}

export const FixingIncidentFormComponent = {
    templateUrl: './views/app/components/fixing-incident-form/fixing-incident-form.component.html',
    controller: FixingIncidentFormController,
    controllerAs: 'vm',
    bindings: {}
};
