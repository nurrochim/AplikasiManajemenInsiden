class AnalyzingIncidentFormController {
    constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, $uibModal, AclService, ContextService, $window, $filter) {
        'ngInject'

        this.$state = $state;
        this.$uibModal = $uibModal
        this.formSubmitted = false;
        this.alerts = [];
        this.form_title = '';
        this.API = API;
        this.$scope = $scope;
        this.$window = $window;
        this.raise_date = "2017-09-21T18:25:43-05:00";
        this.EditIssueId = '';
        this.stepOne = true;
        this.stepTwo = false;
        this.stepThree = false;
        this.classElemetStepTwo = 'btn btn-default btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
        this.disableButtonStepTwo = true;
        this.showAlert = false;
        this.detailIncidentDisable = true;
        this.params = [];
        //this.issueDataEdit = {};
        $scope.userName = '';
        this.$filter = $filter;

        // get data user
        let controller = this;
        controller.can = AclService.can

        ContextService.me(function (data) {
            controller.userData = data;
            controller.$scope.userName = controller.userData.name;
            if (data) {
                controller.params = { idIncident: issueId, idUser: controller.userData.id, task: "Analyzing" };
                getDataPicIncidentTask();
            }
        })

        let IncidentList = this.API.service('pic-incident-task', this.API.all('incidentpics'))
        let getDataPicIncidentTask = () => {
            IncidentList.one().get(this.params)
                .then((response) => {
                    angular.forEach(response.data.pics, function (value, key) {
                        if (value.startDate != null) {
                            controller.startDate = new Date(value.startDate);
                        }
                        if (value.finishDate != null) {
                            controller.finishDate = new Date(value.finishDate);
                        }
                        controller.targetDate = new Date(value.targetDate);
                    })

                }, function (error) {
                    console.error('pic-incident-task', error);
                })
        }

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
            this.eventStepThree();
        }

        this.form_title = "Analyzing Incident";
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
                if(issueEdit.data.needCr==1){
                    this.needCr = true;
                }else{
                    this.needCr = false;
                }
                
                this.estimationDurationCr = issueEdit.data.estimationDurationCr;
            })

        // get file incident
        $scope.filesOpenIcident = [];
        $scope.filesAnalyzing = [];
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
                    }else if (value.fileGroup === "Analyzing") {
                        $scope.filesAnalyzing.push({
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

        // Category analysis
        $scope.optionsAnalysis = [
            { name: 'Confirmation', value: 'Confirmation'},
            { name: 'Data Input Issue', value: 'Data Input Issue'},
            { name: 'Data Issue', value: 'Data Issue'},
            { name: 'Data Setting Issue', value: 'Data Setting Issue'},
            { name: 'Design Issue', value: 'Design Issue'},
            { name: 'Migration Issue', value: 'Migration Issue'},
            { name: 'New/Change Request', value: 'New/Change Request'},
            { name: 'Operational Procedure', value: 'Operational Procedure'},
            { name: 'Program Bugs', value: 'Program Bugs'},
            { name: 'Report Issue', value: 'Report Issue'},
            { name: 'Workflow Issue', value: 'Workflow Issue'},
            { name: 'Uncategorized', value: 'Uncategorized'},
            { name: 'Deployment Issue', value: 'Deployment Issue'},
            { name: 'Server Performance', value: 'Server Performance'},
            { name: 'Network Performance', value: 'Network Performance'},
            { name: 'Program Performance', value: 'Program Performance'},
            { name: 'Other', value: 'Other'}            
        ];
        //this.categoryAnalysis = $scope.optionsAnalysis[0].value;

        // Category group
        $scope.optionsGroup = [
            { name: 'System Issue', value: 'System Issue'},
            { name: 'Operation Issue', value: 'Operation Issue'},
            { name: 'Data Issue', value: 'Data Issue'},
            { name: 'Others Issue', value: 'Others Issue'},
            { name: 'Operation Support', value: 'Operation Support'}
        ];
        //this.categoryGroup = $scope.optionsGroup[0].value;

        // Category root cause
        $scope.optionsRootcause = [
            { name: 'Confirmation', value: 'Confirmation'},
            { name: 'Business Case', value: 'Business Case'},
            { name: 'Data Input Issue', value: 'Data Input Issue'},
            { name: 'Data Migration Issue', value: 'Data Migration Issue'},
            { name: 'Data Setting Issue', value: 'Data Setting Issue'},
            { name: 'Deadlock Issue', value: 'Deadlock Issue'},
            { name: 'Deployment Issue', value: 'Deployment Issue'},
            { name: 'Design Issue', value: 'Design Issue'},
            { name: 'Infrastructure', value: 'Infrastructure'},
            { name: 'Lack of Testing', value: 'Lack of Testing'},
            { name: 'Miss-operate', value: 'Miss-operate'},
            { name: 'Network Performance', value: 'Network Performance'},
            { name: 'Never Test', value: 'Never Test'},
            { name: 'Newly Used Function', value: 'Newly Used Function'},
            { name: 'New/Change Request', value: 'New/Change Request'},
            { name: 'Operational Procedure', value: 'Operational Procedure'},
            { name: 'Program Bugs', value: 'Program Bugs'},
            { name: 'CR Side Impact', value: 'CR Side Impact'},
            { name: 'Uncategorized', value: 'Uncategorized'},
            { name: 'Uncomplete support', value: 'Uncomplete support'},
            { name: 'Other', value: 'Other'}
        ];
        //this.categoryRootCause = $scope.optionsRootcause[0].value;

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
            url: 'file-upload',
            method: 'POST'
        });

        uploader.onBeforeUploadItem = function (item) {
            item.formData = [{ idIncident: $scope.idIncident, fileGorup: 'Analyzing', userName: $scope.userName }];
        };

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

        // uploader.filters.push({
        //     name: 'imageFilter',
        //     fn: function (item /*{File|FileLikeObject}*/, options) {
        //         var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        //         return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        //     }
        // });

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 10;
            }
        });

        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });


        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };
    }

    filterImage(item) {
        var type = item.slice((item.lastIndexOf(".") - 1 >>> 0) + 2);
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }

    eventStepOne() {
        this.stepOne = true;
        this.stepTwo = false;
        this.stepThree = false;
        this.classElemetStepTwo = 'btn btn-default btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
    }

    eventStepTwo() {
        this.stepOne = false;
        this.stepTwo = true;
        this.stepThree = false;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-default btn-circle';
    }

    eventStepThree() {
        this.stepOne = false;
        this.stepTwo = false;
        this.stepThree = true;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
        this.classElemetStepThree = 'btn btn-primary btn-circle';
    }

    update(isValid) {
        if (isValid) {
            let $state = this.$state
            //console.log('Is Update');
            this.issueDataEdit.data.module = this.module;
            this.issueDataEdit.data.subModule = this.subModule;
            this.issueDataEdit.data.categoryAnalysis = this.categoryAnalysis;
            this.issueDataEdit.data.categoryGroup = this.categoryGroup;
            this.issueDataEdit.data.categoryRootCause = this.categoryRootCause;
            this.issueDataEdit.data.rootCauseModule = this.rootCauseModule;
            this.issueDataEdit.data.rootCauseSubModule = this.rootCauseSubModule;
            this.issueDataEdit.data.function = this.function;
            this.issueDataEdit.data.suspectedReason = this.suspectedReason;
            this.issueDataEdit.data.recreateStep = this.recreateStep;
            this.issueDataEdit.data.responTaken = this.responTaken;
            this.issueDataEdit.data.decidedSolution = this.decidedSolution;
            this.issueDataEdit.data.updateBy = this.userData.id;
            this.issueDataEdit.data.needCr = this.needCr;
            this.issueDataEdit.data.estimationDurationCr = this.estimationDurationCr;
            if(this.startDate){
                this.issueDataEdit.data.statusTask = 'On Progress';
                this.issueDataEdit.data.statusAssignment = 'Analyzing';
            }

            // date convert to string

            let $picIncident = { picTask: 'Analyzing', picUser: this.userData.id, startDate: this.startDate, finishDate: this.finishDate };
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

    sendAction() {
        let $state = this.$state; 
        let params = {idIncident: this.EditIssueId, statusTask:'Fixing', updateBy: this.userData.id}; 
        let IssueUpdateStatus = this.API.service('incident-status-update', this.API.all('incidents'))
        swal({
            title: 'Send For Fixing',
            text: 'Send task to programmer for fixing incident',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            closeOnConfirm: true,
            showLoaderOnConfirm: true,
            html: false
        }, function () {
            IssueUpdateStatus.one().put(params) 
            .then(() => { 
              $state.go("app.analyzing");
            }, (response) => {
              let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
              $state.go($state.current, { alerts: alert })
            })
        })
        
      }

      finishTask() {
        let API = this.API
        let $state = this.$state;
        let params = {idIncident: this.EditIssueId, statusTask:'Closing', updateBy: this.userData.id}; 
        swal({
            title: 'Finish For Confirm',
            text: 'Finish task assignment',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            closeOnConfirm: true,
            showLoaderOnConfirm: true,
            html: false
        }, function () {
            
            let IssueUpdateStatus = API.service('incident-status-update', API.all('incidents'))
            IssueUpdateStatus.one().put(params) 
            .then(() => { 
              $state.go("app.analyzing");
            }, (response) => {
              let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
              $state.go($state.current, { alerts: alert })
            })
        })
    }  

    $onInit() {
    }
}

export const AnalyzingIncidentFormComponent = {
    templateUrl: './views/app/components/analyzing-incident-form/analyzing-incident-form.component.html',
    controller: AnalyzingIncidentFormController,
    controllerAs: 'vm',
    bindings: {}
};
