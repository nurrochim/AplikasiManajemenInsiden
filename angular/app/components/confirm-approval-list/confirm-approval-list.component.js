class ConfirmApprovalListController{
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API, AclService, ContextService) {
        'ngInject';
        this.API = API
        this.$state = $state

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
                        <a class="btn btn-xs btn-primary" ui-sref="app.confirmApprovalForm({issueId: ${data.idIncident}})" uib-tooltip="Edit Confirmation">
                        <i class="fa fa-check-square-o"></i>
                        </a>
                        </div>
                    ` 
        }

    }

    $onInit(){
    }
}

export const ConfirmApprovalListComponent = {
    templateUrl: './views/app/components/confirm-approval-list/confirm-approval-list.component.html',
    controller: ConfirmApprovalListController,
    controllerAs: 'vm',
    bindings: {}
};
