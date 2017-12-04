class ConfirmClosingListController {
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API, AclService, ContextService, $uibModal) {
        'ngInject';
        this.API = API
        this.$state = $state
        this.$uibModal = $uibModal

        let IncidentList = this.API.service('incident-assignment', this.API.all('incidents'))
        IncidentList.one().get()
            .then((response) => {
                console.info('test', response);
                let dataIncident = response.data.issue;
                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataIncident)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('idIncident').withTitle('ID').withOption('width', '5%'),
                    DTColumnBuilder.newColumn(null).withTitle('Raise Date').notSortable().renderWith(raisedInfo).withOption('width', '10%'),
                    DTColumnBuilder.newColumn(null).withTitle('Priority & Module').notSortable().renderWith(priorityModul),
                    DTColumnBuilder.newColumn(null).withTitle('Issue Description').notSortable().renderWith(issueDescHtml).withOption('width', '40%'),
                    DTColumnBuilder.newColumn(null).withTitle('PIC').notSortable().renderWith(picHtml),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '10%').renderWith(actionsHtml)
                ]

                this.displayTable = true
            }, function (error) {

                console.error('save-pic-error', error);
            })


        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }

        let raisedInfo = (data) => {
            return `
                    <text style="font-size: 12px;font-weight: bold;">Raised Date : </text> ${data.raisedDate}
                    </br><text style="font-size: 12px;font-weight: bold;">Raised By : </text> ${data.raisedBy}
                    `
        }

        let priorityModul = (data) => {
            return `
                    <text style="font-size: 12px;font-weight: bold;">Priority : </text> ${data.priority}
                    </br><text style="font-size: 12px;font-weight: bold;">Module : </text> ${data.module}
                    </br><text style="font-size: 12px;font-weight: bold;">Sub Module : </text> ${data.subModule}
                    `
        }

        let issueDescHtml = (data) => {
            // return `<div class="col-sm-4"><pre style="height: max-content; background-color: unset;">${data.issue_description}</pre></div>`
            return `<text style="white-space:pre-line">${data.issueDescription}</text>`
        }

        let picHtml = (data) => {
            return `
                    <text style="font-size: 12px;font-weight: bold;">Analyzing : </text> ${data.pic_analyzing}
                    </br><text style="font-size: 12px;font-weight: bold;">Fixing : </text> ${data.pic_fixing}
                    </br><text style="font-size: 12px;font-weight: bold;">Testing : </text> ${data.pic_testing}
                    `
        }

        let actionsHtml = (data) => {
            return `
                        <div style="text-align: center">
                        <a class="btn btn-xs btn-info" ui-sref="app.confirmForm({issueId: ${data.idIncident}})" uib-tooltip="Add Confirm History">
                            <i class="fa fa-edit"></i>
                        </a>
                        <a class="btn btn-xs btn-warning" ui-sref="" ng-click="vm.reAssignTask(data.idIncident)" uib-tooltip="Re-Assign Task">
                            <i class="fa fa-undo"></i>
                        </a>
                        <a class="btn btn-xs btn-danger" ui-sref="" ng-click="vm.toggle('add', 0)" uib-tooltip="Closing">
                            <i class="fa fa-times"></i>
                        </a>
                        </div>
                    `
        }

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
            // $state.go('app.confirm'); 
            //   swal({
            //     title: 'Deleted!',
            //     text: 'User Permission has been deleted.',
            //     type: 'success',
            //     confirmButtonText: 'OK',
            //     closeOnConfirm: true
            //   }, function () {
            $state.reload()
            //   })
            // })
        })
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
                    id: 0
                }];
                break;
            case 'edit':
                items = [{
                    modalState: modalstate,
                    id: 0
                }];
                break;
            default:
                break;
        }

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: this.modalcontroller,
            controllerAs: 'mvc',
            resolve: {
                items: () => {
                    return items
                }
            }
        })

        modalInstance.result.then((selectedItem) => {
            this.refreshTableConfirmHistory();
        }, () => {
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
                this.title = 'Close Incident'
                break;
            case 'edit':
                this.title = 'Close Incident'
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
            // switch (modalstate) {
            //     case 'add':
            //         let CreatePic = API.service('incident-pic', API.all('incidentpics'))
            //         //let $state = this.$state
            //         CreatePic.post({
            //             'fidIncident': idState,
            //             'fidUser': this.pic.id,
            //             'picName': this.pic.name,
            //             'targetDate': $scope.dtPic,
            //             'task': this.task,
            //         }).then(function (success) {
            //             // let disableButtonStepTwo_ = false;
            //             // let alert = {
            //             //   type: 'success', 'title': 'Success!', msg: 'Incident No: ' + success.data.idIncident + ' Incident has been added.'
            //             //   , inputState: 'editAfterSave', issueId: success.data.idIncident
            //             // }
            //             // $state.go($state.current, { alerts: alert, disableButtonStepTwo: disableButtonStepTwo_ });

            //             $uibModalInstance.close()
            //             console.info('save-pic-succes', success);
            //         }, function (error) {
            //             // let alert = { type: 'error', 'title': 'Error!', msg: error.data.message }
            //             // $state.go($state.current, { alerts: alert })
            //             console.error('save-pic-error', error);
            //         })
            //         break;
            //     case 'edit':

            //         break;
            //     default:
            //         break;
            // }
            $uibModalInstance.close()
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

export const ConfirmClosingListComponent = {
    templateUrl: './views/app/components/confirm-closing-list/confirm-closing-list.component.html',
    controller: ConfirmClosingListController,
    controllerAs: 'vm',
    bindings: {}
};
