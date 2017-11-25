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
                    DTColumnBuilder.newColumn('idIncident').withTitle('ID').withOption('width', '5%'),
                    DTColumnBuilder.newColumn('raisedDate').withTitle('Raise Date').withOption('width', '10%'),
                    DTColumnBuilder.newColumn('raisedBy').withTitle('Raise By').withOption('width', '10%'),
                    DTColumnBuilder.newColumn(null).withTitle('Issue Description').notSortable().renderWith(issueDescHtml).withOption('width', '60%'),
                    DTColumnBuilder.newColumn('statusTask').withTitle('Status').withOption('width', '10%'),
                    DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '10%').renderWith(actionsHtml)
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
        let actionsHtml = (data) => {
            return `
                        <a class="btn btn-xs btn-warning" ui-sref="app.inputIncident({inputState: 'edit',issueId: ${data.idIncident}})" uib-tooltip="Edit">
                            <i class="fa fa-edit"></i>
                        </a>`
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
