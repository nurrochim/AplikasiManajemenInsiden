class ConfirmFormController {
    constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, $uibModal, AclService, ContextService, $window) {
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
        this.stepFive = false;
        this.classElemetStepTwo = 'btn btn-default btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
        this.classElemetStepFour = 'btn btn-default btn-circle';
        this.classElemetStepFive = 'btn btn-default btn-circle';
        this.disableButtonStepTwo = true;
        this.showAlert = false;
        this.detailIncidentDisable = true;
        this.params = [];
        //this.issueDataEdit = {};
        this.$window = $window;
        $scope.userName = '';

        // get data user
        let controller = this;
        controller.can = AclService.can

        ContextService.me(function (data) {
            controller.userData = data;
            if (data) {
                controller.params = { idIncident: issueId, idUser: controller.userData.id, task: "Testing" };
            }
        })

        let issueId = $stateParams.issueId
        this.EditIssueId = issueId;
        this.$scope.idIncident = issueId;
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
            this.eventStepFour();
        }

        this.form_title = "Edit Confirm History";
        this.form_subTitle = "Incident Number : " + issueId;



        // getDataIncident
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

        this.refreshTablePic();

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

        // settingDate
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

        $scope.open3 = function () {
            $scope.popup3.opened = true;
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

        $scope.popup3 = {
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



        // Modul
        $scope.optionsModul = [
            { name: 'All Modules', value: 'All Modules' },
            { name: 'BackEnd Tools', value: 'BackEnd Tools' },
            { name: 'Batch Process', value: 'Batch Process' },
            { name: 'CDB', value: 'CDB' },
            { name: 'Collection', value: 'Collection' },
            { name: 'Facility', value: 'Facility' },
            { name: 'Fixed Asset', value: 'Fixed Asset' },
            { name: 'Funding', value: 'Funding' },
            { name: 'General Setting', value: 'General Setting' },
            { name: 'General Ledger', value: 'General Ledger' },
            { name: 'Insurance', value: 'Insurance' },
            { name: 'Life Insurance Receive', value: 'Life Insurance Receive' },
            { name: 'Internal Payment', value: 'Internal Payment' },
            { name: 'Payment', value: 'Payment' },
            { name: 'CBCS', value: 'CBCS' },
            { name: 'Procurement', value: 'Procurement' },
            { name: 'Report', value: 'Report' },
            { name: 'General Issue', value: 'General Issue' },
            { name: 'Other', value: 'Other' },
            { name: 'Data', value: 'Data' }
        ];
        $scope.selectedOptionModule = $scope.optionsModul[0].value;

        // Sub Modul
        $scope.optionsSubModul = [
            { name: 'Update Additional Info', value: 'Update Additional Info' },
            { name: 'Insurance Payment', value: 'Insurance Payment' },
            { name: 'New Report', value: 'New Report' },
            { name: 'Cash Overbook', value: 'Cash Overbook' },
            { name: 'Insurance Payment', value: 'Insurance Payment' },
            { name: 'Payment', value: 'Payment' },
            { name: 'Facility Register', value: 'Facility Register' },
            { name: 'Inquiry', value: 'Inquiry' },
            { name: 'Cash / Transfer', value: 'Cash / Transfer' },
            { name: 'Facility Register', value: 'Facility Register' },
            { name: 'Request Disbursement', value: 'Request Disbursement' },
            { name: 'Virtual Payment', value: 'Virtual Payment' },
            { name: 'Request Disbursement', value: 'Request Disbursement' },
            { name: 'Finance Report', value: 'Finance Report' },
            { name: 'Payment', value: 'Payment' },
            { name: 'CDB', value: 'CDB' },
            { name: 'Cash / Transfer', value: 'Cash / Transfer' },
            { name: 'Other', value: 'Other' }
        ];
        $scope.selectedOptionSubModule = $scope.optionsSubModul[0].value;

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

        // upload method
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

    refreshTablePic() {

        let scope = this.$scope;
        scope.assignTaskPIC = [];
        let pics = this.API.service('pic-incident', this.API.all('incidentpics'))
        pics.one(this.EditIssueId).get()
            .then((response) => {
                let pics = response.data.pics;
                angular.forEach(response.data.pics, function (value, key) {
                    scope.assignTaskPIC.push({
                        id: value.idPic,
                        fidIncident: value.fidIncident,
                        picName: value.picName,
                        taskName: value.task,
                        startDate: value.startDate,
                        finishDate: value.finishDate,
                        targetDate: value.targetDate,
                    });
                })
            })
    }

    reAssignTask(idIncident) {
        let API = this.API
        let $state = this.$state

        swal({
            title: 'Re-Assign Task',
            text: 'Re-assign this incident will be return back task-flow to analyzing incident',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            closeOnConfirm: true,
            showLoaderOnConfirm: true,
            html: false
        }, function () {
            //   API.one('users').one('user', userId).remove()
            //     .then(() => {
            $state.go('app.confirm');
            //   swal({
            //     title: 'Deleted!',
            //     text: 'User Permission has been deleted.',
            //     type: 'success',
            //     confirmButtonText: 'OK',
            //     closeOnConfirm: true
            //   }, function () {
            //     $state.reload()
            //   })
            // })
        })
    }

    delete(userId) {

    }

    update(isValid) {
        if (isValid) {
            let $state = this.$state
            //console.log('Is Update');
            this.issueDataEdit.data.testNotes = this.testingNotes;
            this.issueDataEdit.data.testScenario = this.testScenario;
            let $picIncident = { picTask: 'Testing', picUser: this.userData.id, startDate: this.startDate, finishDate: this.finishDate };

            this.issueDataEdit.put($picIncident)
                .then(() => {
                    let disableButtonStepTwo_ = false;
                    let alert = {
                        type: 'success', 'title': 'Success!', msg: 'Data has been updated.'
                        , inputState: 'edit', issueId: this.EditIssueId
                    }
                    $state.go($state.current, { alerts: alert, disableButtonStepTwo: disableButtonStepTwo_ });
                }, (response) => {
                    let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
                    $state.go($state.current, { alerts: alert })
                })
        } else {
            this.formSubmitted = true
        }
    }

    eventStepOne() {
        this.stepOne = true;
        this.stepTwo = false;
        this.stepThree = false;
        this.stepFour = false;
        this.stepFive = false;
        this.classElemetStepTwo = 'btn btn-default btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
        this.classElemetStepFour = 'btn btn-default btn-circle';
        this.classElemetStepFive = 'btn btn-default btn-circle';
    }

    eventStepTwo() {
        this.stepOne = false;
        this.stepTwo = true;
        this.stepThree = false;
        this.stepFour = false;
        this.stepFive = false;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
        this.classElemetStepFour = 'btn btn-default btn-circle';
        this.classElemetStepFive = 'btn btn-default btn-circle';
    }

    eventStepThree() {
        this.stepOne = false;
        this.stepTwo = false;
        this.stepThree = true;
        this.stepFour = false;
        this.stepFive = false;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-primary btn-circle';
        this.classElemetStepFour = 'btn btn-default btn-circle';
        this.classElemetStepFive = 'btn btn-default btn-circle';
    }

    eventStepFour() {
        this.stepOne = false;
        this.stepTwo = false;
        this.stepThree = false;
        this.stepFour = true;
        this.stepFive = false;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-primary btn-circle';
        this.classElemetStepFour = 'btn btn-primary btn-circle';
        this.classElemetStepFive = 'btn btn-default btn-circle';
    }
    eventStepFive() {
        this.stepOne = false;
        this.stepTwo = false;
        this.stepThree = false;
        this.stepFour = false;
        this.stepFour = false;
        this.stepFive = true;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-primary btn-circle';
        this.classElemetStepFour = 'btn btn-primary btn-circle';
        this.classElemetStepFive = 'btn btn-primary btn-circle';
    }


    // init modal for add confirm history
    toggle(modalstate, id) {
        let $uibModal = this.$uibModal;
        let $scope = this.$scope;
        let items = [];
        switch (modalstate) {
            case 'add':
                items = [{
                    modalState: modalstate,
                    id: this.EditIssueId
                }];
                break;
            case 'edit':
                items = [{
                    modalState: modalstate,
                    id: id
                }];
                break;
            default:
                break;
        }

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: this.modalcontroller,
            controllerAs: 'mvm',
            resolve: {
                items: () => {
                    return items
                }
            }
        })

        modalInstance.result.then((selectedItem) => {
            this.refreshTableConfirmHistory();
        },
            () => {
                $log.info('Modal dismissed at: ' + new Date())
            })
    }

    modalcontroller($scope, $uibModalInstance, API, $http, items) {
        'ngInject'

        // items
        let modalstate = items[0].modalState;
        let idState = items[0].id;
        switch (modalstate) {
            case 'add':
                this.title = 'Add Confirm History'
                break;
            case 'edit':
                this.title = 'Edit Confirm History'
                break;
            default:
                break;
        }




        $scope.today = function () {
            $scope.dtPic = new Date();
        };

        $scope.today();

        $scope.clear = function () {
            $scope.dtPic = null;
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

        $scope.optionsTask = [
            {
                name: 'Analyzing',
                value: 'Analyzing'
            },
            {
                name: 'Fixing',
                value: 'Fixing'
            },
            {
                name: 'Testing',
                value: 'Testing'
            }
        ];

        $scope.teamMember = [];
        let UserOptions = API.service('maintenance-team', API.all('users'))
        UserOptions.one('0').get()
            .then((response) => {
                let users = response.data.users;
                angular.forEach(response.data.users, function (value, key) {
                    $scope.teamMember.push({
                        id: value.id,
                        name: value.name
                    });
                })
            })
        this.pic = $scope.teamMember[0];

        this.ok = () => {
            //   switch (modalstate) {
            //     case 'add':
            //       let CreatePic = API.service('incident-pic', API.all('incidentpics'))
            //       //let $state = this.$state
            //       CreatePic.post({
            //         'fidIncident': idState,
            //         'fidUser': this.pic.id,
            //         'picName': this.pic.name,
            //         'targetDate': $scope.dtPic,
            //         'task': this.task,
            //   }).then(function (success) {
            // let disableButtonStepTwo_ = false;
            // let alert = {
            //   type: 'success', 'title': 'Success!', msg: 'Incident No: ' + success.data.idIncident + ' Incident has been added.'
            //   , inputState: 'editAfterSave', issueId: success.data.idIncident
            // }
            // $state.go($state.current, { alerts: alert, disableButtonStepTwo: disableButtonStepTwo_ });

            $uibModalInstance.close()
            //     console.info('save-pic-succes', success);
            //   }, function (error) {
            //     // let alert = { type: 'error', 'title': 'Error!', msg: error.data.message }
            //     // $state.go($state.current, { alerts: alert })
            //     console.error('save-pic-error', error);
            //   })
            //   break;
            // case 'edit':

            //   break;
            // default:
            //   break;
            //   }
            //$uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {
            $uibModalInstance.dismiss('cancel')
        }
    }

    toggleModalAnimation() {
        this.animationsEnabled = true;
    }

    $onInit() {
    }
}

export const ConfirmFormComponent = {
    templateUrl: './views/app/components/confirm-form/confirm-form.component.html',
    controller: ConfirmFormController,
    controllerAs: 'vm',
    bindings: {}
};
