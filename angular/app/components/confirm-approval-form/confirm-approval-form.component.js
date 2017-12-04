class ConfirmApprovalFormController {
    constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, AclService, ContextService) {
        'ngInject'

        this.$state = $state;
        this.formSubmitted = false;
        this.alerts = [];
        this.form_title = '';
        this.API = API;
        this.$scope = $scope;
        this.raise_date = "2017-09-21T18:25:43-05:00";
        this.EditIssueId = '';
        this.stepOne = true;
        this.stepTwo = false;
        this.classElemetStepTwo = 'btn btn-default btn-circle';
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

        this.form_title = "Edit Confirmation";
        this.form_subTitle = "Incident Number : " + issueId;



        $scope.reporters = [];
        let UserOptions = API.service('user-by-job', API.all('users'))
        UserOptions.one('ED').get()
            .then((response) => {
                let users = response.data.users;
                angular.forEach(response.data.users, function (value, key) {
                    $scope.reporters.push({
                        id: value.id,
                        name: value.name,
                        division: value.division,
                        groupDivision: value.group_division,
                    });
                })
            })

        let openIcident = this;
        openIcident.can = AclService.can

        ContextService.me(function (data) {
            openIcident.userData = data;
            if (data) {
                switch (inputState) {
                    case 'add':
                        openIcident.selectedReporter = { id: openIcident.userData.id, name: openIcident.userData.name, division: openIcident.userData.division, groupDivision: openIcident.userData.group_division };
                        openIcident.division = openIcident.userData.division;
                        openIcident.groupDivision = openIcident.userData.group_division;
                        break
                }
            }
        })

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

        // var tomorrow = new Date();
        // tomorrow.setDate(tomorrow.getDate() + 1);
        // var afterTomorrow = new Date();
        // afterTomorrow.setDate(tomorrow.getDate() + 1);
        // $scope.events = [
        //   {
        //     date: tomorrow,
        //     status: 'full'
        //   },
        //   {
        //     date: afterTomorrow,
        //     status: 'partially'
        //   }
        // ];

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

        $scope.options = [
            {
                name: 'Issue Not Clear',
                value: 'Reject'
            },
            {
                name: 'Approve For Closing',
                value: 'Approve'
            }
        ];
        $scope.selectedOption = $scope.options[0].value;
    }

    $onInit() {
    }
}

export const ConfirmApprovalFormComponent = {
    templateUrl: './views/app/components/confirm-approval-form/confirm-approval-form.component.html',
    controller: ConfirmApprovalFormController,
    controllerAs: 'vm',
    bindings: {}
};
