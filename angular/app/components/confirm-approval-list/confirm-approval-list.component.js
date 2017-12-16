class ConfirmApprovalListController {
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API, AclService, ContextService) {
        'ngInject';
        this.API = API
        this.$state = $state
        let params = {};

        let controller = this;
        controller.can = AclService.can

        ContextService.me(function (data) {
            controller.userData = data;
            if (data) {
                controller.params = { idUser: controller.userData.id };
                generateDataTable();
            }
        })

        let generateDataTable = () => {
            let IncidentList = this.API.service('approval-closing', this.API.all('incidents'))
            IncidentList.one().get(this.params)
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
                        DTColumnBuilder.newColumn(null).withTitle('Status').notSortable().renderWith(statusHtml).withOption('width', '15%'),
                        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '10%').renderWith(actionsHtml)
                    ]

                    this.displayTable = true
                }, function (error) {

                    console.error('get-approval-confirm-error', error);
                })
        }

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
        let issueDescHtml = (data) => {
            counter = counter + 1;
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

            if (data.expectedResult) {
                issueDesc = issueDesc.concat(texpectedResult)

            }
            if (data.suspectedReason) { issueDesc = issueDesc.concat(suspectedReason) }
            if (data.responTaken) { issueDesc = issueDesc.concat(responTaken) }
            if (data.decidedSolution) { issueDesc = issueDesc.concat(decidedSolution) }
            issueDesc.concat(`</div></div>`);

            return issueDesc;
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
                    if (data.statusAssignment === "Confirmed") {
                        return `<div class="progress-group">
                        <span class="progress-text">Confirmed</span>
                        <span class="progress-number" uib-tooltip="3 from 4 Step"><b>3</b>/4</span>
                        <div class="progress sm">
                        <div class="progress-bar progress-bar-aqua" style="width: 98%"></div>
                        </div>
                        </div>`
                    }else if (data.statusAssignment === "Waiting Confirmation") {
                        return `<div class="progress-group">
                        <span class="progress-text">Confirmation</span>
                        <span class="progress-number" uib-tooltip="3 from 4 Step"><b>3</b>/4</span>
                        <div class="progress sm">
                        <div class="progress-bar progress-bar-aqua" style="width: 95%" uib-tooltip="Waiting Confrimation from Reporter"></div>
                        </div>
                        </div>`
                    }else{
                        return `<div class="progress-group">
                        <span class="progress-text">${data.statusTask}</span>
                        <span class="progress-number" uib-tooltip="4 from 4 Step"><b>4</b>/4</span>
                        <div class="progress sm">
                        <div class="progress-bar progress-bar-aqua" style="width: 90%"></div>
                        </div>
                    </div>`
                    }
                    
                }
            } else {
                return `<div/>`;
            }

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
                        <a class="btn btn-xs btn-primary" ui-sref="app.confirmApprovalForm({issueId: '${data.idIncident}'})" uib-tooltip="Edit Confirmation">
                        <i class="fa fa-check-square-o"></i>
                        </a>
                        </div>
                    `
        }

    }

    $onInit() {
    }
}

export const ConfirmApprovalListComponent = {
    templateUrl: './views/app/components/confirm-approval-list/confirm-approval-list.component.html',
    controller: ConfirmApprovalListController,
    controllerAs: 'vm',
    bindings: {}
};
