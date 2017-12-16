class ConfirmClosingListController {
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API, AclService, ContextService, $uibModal) {
        'ngInject';
        this.API = API
        this.$state = $state
        this.$uibModal = $uibModal

        // get User Info
        let controller = this;
        controller.can = AclService.can

        ContextService.me(function (data) {
            controller.userData = data;
        })

        let params = {task:'ConfirmClosing'};
        let IncidentList = this.API.service('incident-closing', this.API.all('incidents'))
        IncidentList.one().get(params)
            .then((response) => {
                console.info('test', response);
                let dataIncident = response.data.issue;
                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataIncident)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withOption('order', [])
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('idIncident').withTitle('ID').withOption('width', '8%'),
                    DTColumnBuilder.newColumn(null).withTitle('Raise Date').notSortable().renderWith(raisedInfo).withOption('width', '10%'),
                    DTColumnBuilder.newColumn(null).withTitle('Priority & Module').notSortable().renderWith(priorityModul),
                    DTColumnBuilder.newColumn(null).withTitle('Issue Description').notSortable().renderWith(issueDescHtml).withOption('width', '40%'),
                    DTColumnBuilder.newColumn('pic_confirm').withTitle('PIC').notSortable(),
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

        let counter = 0;
        // <a ng-model="vm.isCollapse${counter}" ng-show="!vm.isCollapse${counter} 
        // ng-click="vm.isCollapsed${counter} = false">Show Less</a>
        let issueDescHtml = (data) => { 
            counter = counter+1;
            let issueDesc = `<text style="font-size: 14px;font-weight: bold;text-decoration: underline;">Issue Descriptions : </text></br><text style="white-space:pre-line">${data.issueDescription}</text> 
            </br>
            <a class="pull-right"  href="" ng-model="vm.isCollapse${counter}" ng-init="vm.isCollapsed${counter} = true" ng-show="!vm.isCollapse${counter}"
            ng-click="vm.isCollapsed${counter} = !vm.isCollapsed${counter}">
            Show More</a>
            
            <div uib-collapse="vm.isCollapsed${counter}">
            <hr>
            <div>` 
            ;
            let texpectedResult = `<text style="font-size: 14px;font-weight: bold;text-decoration: underline;">Expected Result : </text></br><text style="white-space:pre-line">${data.expectedResult}</text></br></br>`;
            let suspectedReason = `<text style="font-size: 14px;font-weight: bold;text-decoration: underline;">Suspected Reason : </text></br><text style="white-space:pre-line">${data.suspectedReason}</text></br></br>`;
            let responTaken = `<text style="font-size: 14px;font-weight: bold;text-decoration: underline;">Respon Taken : </text></br><text style="white-space:pre-line">${data.responTaken}</text></br></br>`;
            let decidedSolution = `<text style="font-size: 14px;font-weight: bold;text-decoration: underline;">Decided Solution : </text></br><text style="white-space:pre-line">${data.decidedSolution}</text>`;
            
            if(data.expectedResult){
                issueDesc = issueDesc.concat(texpectedResult)

            }
            if(data.suspectedReason){issueDesc = issueDesc.concat(suspectedReason)}
            if(data.responTaken){issueDesc = issueDesc.concat(responTaken)}
            if(data.decidedSolution){issueDesc = issueDesc.concat(decidedSolution)}
            issueDesc.concat(`</div></div>`); 

            return issueDesc;
        }

        let picHtml = (data) => {
            // return `
            //         <text style="font-size: 12px;font-weight: bold;">Analyzing : </text> ${data.pic_analyzing}
            //         </br><text style="font-size: 12px;font-weight: bold;">Fixing : </text> ${data.pic_fixing}
            //         </br><text style="font-size: 12px;font-weight: bold;">Testing : </text> ${data.pic_testing}
            //         `
            //return 
        }

        let actionsHtml = (data) => {
            return `
                        <div style="text-align: center">
                        <a class="btn btn-xs btn-info" ui-sref="app.confirmForm({issueId: '${data.idIncident}'})" uib-tooltip="Add Confirm History">
                            <i class="fa fa-edit"></i>
                        </a>
                        <a class="btn btn-xs btn-warning"ng-click="vm.reAssignTask('${data.idIncident}')" uib-tooltip="Re-Assign Task">
                            <i class="fa fa-undo"></i>
                        </a>
                        <a class="btn btn-xs btn-danger" ng-click="vm.toggle('edit', '${data.idIncident}', vm.userData.id)" uib-tooltip="Closing">
                            <i class="fa fa-times"></i>
                        </a>
                        </div>
                    `
        }
        
        
    }

    reAssignTask($idIncident) {
        let API = this.API
        let $state = this.$state;
        let params = {idIncident: $idIncident, statusTask:'Re-Open', updateBy: this.userData.id}; 
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
            
            let IssueUpdateStatus = API.service('incident-status-update', API.all('incidents'))
            IssueUpdateStatus.one().put(params) 
            .then(() => { 
              $state.reload();
            }, (response) => {
              let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
              $state.go($state.current, { alerts: alert })
            })
        })
    }

    // init modal for add confirm history
    toggle(modalstate, $id, $user, $state) {
        let $uibModal = this.$uibModal;
        let $scope = this.$scope;
        let items = [{
                        modalState: modalstate,
                        id: $id,
                        user: $user
                    }];
        // switch (modalstate) {
        //     case 'add':
                
        //         break;
        //     case 'edit':
        //         items = [{
        //             modalState: modalstate,
        //             id: $id
        //         }];
        //         break;
        //     default:
        //         break;
        // }

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
            this.$state.reload();
        }, () => {
            $log.info('Modal dismissed at: ' + new Date())
        })
    }

    modalcontroller($scope, $uibModalInstance, API, $http, items) {
        'ngInject'

        // items
        let modalstate = items[0].modalState;
        this.idIncident = items[0].id;
        this.idUser = items[0].user;
        this.title = 'Close Incident'
      
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

        $scope.teamMember = [];
        let UserOptions = API.service('maintenance-team', API.all('users'))
        UserOptions.one('1').get()
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
            let CreatePic = API.service('incident-closing', API.all('incidents'))
            CreatePic.post({
                'idIncident': this.idIncident,
                'closedDate': this.dtClosing,
                'closedBy': this.pic.name,
                'updateBy': this.idUser
                
            }).then(function (success) {
                $uibModalInstance.close()
                console.info('save-history-succes', success);
            }, function (error) {
                console.error('save-history-error', error);
            })
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
