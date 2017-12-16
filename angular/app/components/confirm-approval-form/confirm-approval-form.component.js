class ConfirmApprovalFormController {
    constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, AclService, ContextService, $window) {
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
        this.detailIncidentDisable = true;
        //this.issueDataEdit = {};
        this.$window = $window;
        $scope.userName = '';



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

        let IssueEdit = API.service('incident-show', API.all('incidents'))
        IssueEdit.one(issueId).get()
            .then((response) => {
                this.issueDataEdit = API.copy(response);
                var issueEdit = this.issueDataEdit;
                this.raise_date = issueEdit.data.raisedDate;
                //$scope.dt = new Date(this.raise_date);

                this.raisedBy = issueEdit.data.raisedBy;
                this.raisedDate = issueEdit.data.raisedDate;
                this.fidUserRaised = issueEdit.data.fidUserRaised;
                this.division = issueEdit.data.division;
                this.groupDivision = issueEdit.data.groupDivision;
                this.issueDescription = issueEdit.data.issueDescription;
                this.module = issueEdit.data.module;
                this.subModule = issueEdit.data.subModule;
                this.priority = issueEdit.data.priority;
                this.categoryAnalysis = issueEdit.data.categoryAnalysis;
                this.categoryGroup = issueEdit.data.categoryGroup;
                this.categoryRootCause = issueEdit.data.categoryRootCause;
                this.rootCauseModule = issueEdit.data.rootCauseModule;
                this.rootCauseSubModule = issueEdit.data.rootCauseSubmodule;
                this.function = issueEdit.data.function;
                this.suspectedReason = issueEdit.data.suspectedReason;
                this.recreateStep = issueEdit.data.recreateStep;
                this.responTaken = issueEdit.data.responTaken;
                this.decidedSolution = issueEdit.data.decidedSolution;
                this.fixingNotes = issueEdit.data.fixingNotes;
                this.testingNotes = issueEdit.data.fixingNotes;
                this.testScenario = issueEdit.data.testScenario;
            })

            // get file incident
        $scope.filesOpenIcident = [];
        $scope.filesAnalyzing = [];
        $scope.filesFixing = [];
        $scope.filesTesting = [];
        let fileOpen = API.service('file-by-group', API.all('files'))
        fileOpen.one().get({ idIncident: this.EditIssueId, fileGroup: 'All' })
            .then((response) => {
                angular.forEach(response.data.files, function (value, key) {
                    if (value.fileGroup === "Open") {
                        $scope.filesOpenIcident.push({
                            id: value.id,
                            fidIncident: value.fidIncident,
                            fileName: value.fileName,
                            fileUrl: "http://" + $window.location.host + "/download/" + value.fidIncident + "/" + value.fileName
                        });
                    } else if (value.fileGroup === "Analyzing") {
                        $scope.filesAnalyzing.push({
                            id: value.id,
                            fidIncident: value.fidIncident,
                            fileName: value.fileName,
                            fileUrl: "http://" + $window.location.host + "/download/" + value.fidIncident + "/" + value.fileName
                        });
                    } else if (value.fileGroup === "Fixing") {
                        $scope.filesFixing.push({
                            id: value.id,
                            fidIncident: value.fidIncident,
                            fileName: value.fileName,
                            fileUrl: "http://" + $window.location.host + "/download/" + value.fidIncident + "/" + value.fileName
                        });
                    } else if (value.fileGroup === "Testing") {
                        $scope.filesTesting.push({
                            id: value.id,
                            fidIncident: value.fidIncident,
                            fileName: value.fileName,
                            fileUrl: "http://" + $window.location.host + "/download/" + value.fidIncident + "/" + value.fileName
                        });
                    }
                })
            })




        // $scope.reporters = [];
        // let UserOptions = API.service('user-by-job', API.all('users'))
        // UserOptions.one('ED').get()
        //     .then((response) => {
        //         let users = response.data.users;
        //         angular.forEach(response.data.users, function (value, key) {
        //             $scope.reporters.push({
        //                 id: value.id,
        //                 name: value.name,
        //                 division: value.division,
        //                 groupDivision: value.group_division,
        //             });
        //         })
        //     })

        let confirmApproval = this;
        confirmApproval.can = AclService.can

        ContextService.me(function (data) {
            confirmApproval.userData = data;
            if (data) {
                switch (inputState) {
                    case 'add':
                        confirmApproval.selectedReporter = { id: confirmApproval.userData.id, name: confirmApproval.userData.name, division: confirmApproval.userData.division, groupDivision: confirmApproval.userData.group_division };
                        confirmApproval.division = confirmApproval.userData.division;
                        confirmApproval.groupDivision = confirmApproval.userData.group_division;
                        break
                }
            }
        })

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

    postAction() {
        let $state = this.$state; 
        let params = {idIncident: this.EditIssueId, statusTask:'Confirmed', updateBy: this.userData.id, responApproval:this.responApproval, responDescription:this.responDescription}; 
        let IssueUpdateStatus = this.API.service('incident-confirmed', this.API.all('incidents'))
        IssueUpdateStatus.one().put(params) 
        .then(() => { 
          $state.go("app.confirmApproval");
        }, (response) => {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          $state.go($state.current, { alerts: alert })
        })
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
