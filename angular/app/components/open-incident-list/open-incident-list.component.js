class OpenIncidentListController {
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject';
        this.API = API
        this.$state = $state

        let IncidentList = this.API.service('incidents')

        IncidentList.getList()
            .then((response) => {
                let dataSet = response.plain()

                this.dtOptions = DTOptionsBuilder.newOptions()
                    .withOption('data', dataSet)
                    .withOption('createdRow', createdRow)
                    .withOption('responsive', true)
                    .withBootstrap()

                this.dtColumns = [
                    DTColumnBuilder.newColumn('idIncident').withTitle('ID').withOption('width', '10%'),
                    DTColumnBuilder.newColumn('raisedDate').withTitle('Raise Date').withOption('width', '10%'),
                    DTColumnBuilder.newColumn('raisedBy').withTitle('Raise By').withOption('width', '10%'),
                    DTColumnBuilder.newColumn(null).withTitle('Issue Description').notSortable().renderWith(issueDescHtml).withOption('width', '50%'),
                    DTColumnBuilder.newColumn(null).withTitle('Status').notSortable().renderWith(statusHtml).withOption('width', '15%'),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '5%').renderWith(actionsHtml)
                ]

                this.displayTable = true
            })

        let createdRow = (row) => {
            $compile(angular.element(row).contents())($scope)
        }


        let issueDescHtml = (data) => {
            // return `<div class="col-sm-4"><pre style="height: max-content; background-color: unset;">${data.issue_description}</pre></div>`
            return `<text style="white-space:pre-line">${data.issueDescription}</text>`
        }
        let statusHtml = (data) => {
            // return `<div class="col-sm-4"><pre style="height: max-content; background-color: unset;">${data.issue_description}</pre></div>`
            if (data.statusTask) {
                if (data.statusTask === "Open") {
                    return `<div class="progress-group">
                                <span class="progress-text">${data.statusTask}</span>
                                <span class="progress-number" uib-tooltip="1 from 4 Step"><b>1</b>/4</span>
                                <div class="progress sm">
                                <div class="progress-bar progress-bar-red" style="width: 10%"></div>
                                </div>
                            </div>`
                }
                if (data.statusTask === "Assign") {
                    // return `<a class="btn btn-block btn-primary btn-xs"> ${data.statusTask}</a>`
                    return `<div class="progress-group">
                                <span class="progress-text">${data.statusTask}</span>
                                <span class="progress-number" uib-tooltip="2 from 4 Step"><b>2</b>/4</span>
                                <div class="progress sm">
                                <div class="progress-bar progress-bar-yellow" style="width: 20%"></div>
                                </div>
                            </div>`
                }
                if (data.statusTask === "On Progress") {
                    // analyzing 40, fixing 60, testing 80
                    if (data.statusAssignment === "Analyzing") {
                        return `<div class="progress-group">
                                <span class="progress-text">${data.statusTask}</span>
                                <span class="progress-number" uib-tooltip="3 from 4 Step"><b>3</b>/4</span>
                                <div class="progress sm">
                                <div class="progress-bar progress-bar-green" style="width: 40%" uib-tooltip="${data.statusAssignment}"></div>
                                </div>
                            </div>`
                    } else if (data.statusAssignment === "Fixing") {
                        return `<div class="progress-group">
                            <span class="progress-text">${data.statusTask}</span>
                            <span class="progress-number" uib-tooltip="3 from 4 Step"><b>3</b>/4</span>
                            <div class="progress sm">
                            <div class="progress-bar progress-bar-green" style="width: 60%" uib-tooltip="${data.statusAssignment}"></div>
                            </div>
                            </div>`
                    } else {
                        return `<div class="progress-group">
                                <span class="progress-text">${data.statusTask}</span>
                                <span class="progress-number" uib-tooltip="3 from 4 Step"><b>3</b>/4</span>
                                <div class="progress sm">
                                <div class="progress-bar progress-bar-green" style="width: 80%" uib-tooltip="${data.statusAssignment}"></div>
                                </div>
                                </div>`
                    }
                }
                if (data.statusTask === "Closing") {
                    return `<div class="progress-group">
                                <span class="progress-text">${data.statusTask}</span>
                                <span class="progress-number" uib-tooltip="4 from 4 Step"><b>4</b>/4</span>
                                <div class="progress sm">
                                <div class="progress-bar progress-bar-aqua" style="width: 90%"></div>
                                </div>
                            </div>`
                }
                if (data.statusTask === "Confirm") {
                    return `<div class="progress-group">
                                <span class="progress-text">Confirmation</span>
                                <span class="progress-number" uib-tooltip="3 from 4 Step"><b>3</b>/4</span>
                                <div class="progress sm">
                                <div class="progress-bar progress-bar-aqua" style="width: 85%" uib-tooltip="Waiting Confrimation from MBF"></div>
                                </div>
                            </div>`
                }
            } else {
                return `<div/>`;
            }

        }
        let actionsHtml = (data) => {
            if (data.statusTask) {
                return `<div/>`;
            } else {
                return `<div style="text-align: center">
                <a class="btn btn-xs btn-warning" ui-sref="app.inputIncident({inputState: 'edit',issueId: '${data.idIncident}'})" uib-tooltip="Edit">
                    <i class="fa fa-edit"></i>
                </a></div>`
            }
        }
    }

    $onInit() {
    }
}

export const OpenIncidentListComponent = {
    templateUrl: './views/app/components/open-incident-list/open-incident-list.component.html',
    controller: OpenIncidentListController,
    controllerAs: 'vm',
    bindings: {}
};
