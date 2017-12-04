class HistoryIncidentListController {
    constructor($stateParams, $state, API, $log, $scope, $compile, FileUploader, $http, $uibModal, AclService, ContextService, DTOptionsBuilder, DTColumnBuilder) {
        'ngInject'

        this.$state = $state;
        this.$uibModal = $uibModal
        this.formSubmitted = false;
        this.API = API;
        this.$scope = $scope;
        this.DTOptionsBuilder = DTOptionsBuilder;
        this.DTColumnBuilder = DTColumnBuilder;
        this.$compile = $compile;

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
    }

    eventSearch() { 
        let DTOptionsBuilder = this.DTOptionsBuilder;
        let DTColumnBuilder = this.DTColumnBuilder;
        let $compile = this.$compile; 
        let $scope = this.$scope;
        let params = { idIncident: this.idIncident, task:'task coba' };
        let IncidentList = this.API.service('incident-filter', this.API.all('incidents'))
        IncidentList.one().get(params).then((response) => {
            //         console.info('test', response);
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
                            <a class="btn btn-xs btn-warning" ui-sref="app.historyView({issueId: ${data.idIncident}})" uib-tooltip="View Incident">
                                <i class="fa fa-search"></i>
                            </a></div>`
        }
    }

    $onInit() {
    }
}

export const HistoryIncidentListComponent = {
    templateUrl: './views/app/components/history-incident-list/history-incident-list.component.html',
    controller: HistoryIncidentListController,
    controllerAs: 'vm',
    bindings: {}
};
