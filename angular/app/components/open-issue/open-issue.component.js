class OpenIssueController{
    constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
        'ngInject';
        this.API = API
        this.$state = $state

        let IssueList = this.API.service('issues')
        
        IssueList.getList()
            .then((response) => {
            let dataSet = response.plain()
    
            this.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('data', dataSet)
                .withOption('createdRow', createdRow)
                .withOption('responsive', true)
                .withBootstrap()
    
            this.dtColumns = [
                DTColumnBuilder.newColumn('id').withTitle('ID'),
                DTColumnBuilder.newColumn('raise_date').withTitle('Raise Date').withOption('width', '10%'),
                DTColumnBuilder.newColumn(null).withTitle('Priority & Module').notSortable().renderWith(priorityModul),
                DTColumnBuilder.newColumn(null).withTitle('Issue Description').notSortable().renderWith(issueDescHtml).withOption('width', '40%'),
                // DTColumnBuilder.newColumn('issue_description').withTitle('Issue Description').withOption('width', '50%').withOption('word-break', 'break-all').withOption('word-wrap', 'break-word'),
                DTColumnBuilder.newColumn(null).withTitle('PIC').notSortable().renderWith(picHtml),
                DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width', '10%').renderWith(actionsHtml)
            ]
    
            this.displayTable = true 
            })
    
            let createdRow = (row) => {
                $compile(angular.element(row).contents())($scope)
            }
        
            
            let issueDescHtml = (data) => {
               // return `<div class="col-sm-4"><pre style="height: max-content; background-color: unset;">${data.issue_description}</pre></div>`
               return `<text style="white-space:pre-line">${data.issue_description}</text>`
            }            
            let priorityModul = (data) => {
                return `
                        <text style="font-size: 12px;font-weight: bold;">Priority : </text> ${data.priority}
                        </br><text style="font-size: 12px;font-weight: bold;">Module : </text> ${data.module}
                        </br><text style="font-size: 12px;font-weight: bold;">Sub Module : </text> ${data.sub_module}
                        `
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
                        <a class="btn btn-xs btn-warning" ui-sref="app.inputopenissue({inputState: 'edit',issueId: ${data.id}})" uib-tooltip="Edit">
                            <i class="fa fa-edit"></i>
                        </a>
                        &nbsp
                        <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})" uib-tooltip="Delete">
                            <i class="fa fa-trash-o"></i>
                        </button>`
        }
        
    }

    delete (issueId) {
        let API = this.API
        let $state = this.$state
    
        swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this data!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete it!',
          closeOnConfirm: true,
          showLoaderOnConfirm: true,
          html: false
        }, function () {
          API.one('issues').one('issue', issueId).remove()
            .then(() => {
                $state.reload()
            //   swal({
            //     title: 'Deleted!',
            //     text: 'One Issue has been deleted.',
            //     type: 'success',
            //     confirmButtonText: 'OK',
            //     closeOnConfirm: true
            //   }, function () {
            //     $state.reload()
            //   })
            })
        })
      }

    $onInit(){
    }
}

export const OpenIssueComponent = {
    templateUrl: './views/app/components/open-issue/open-issue.component.html',
    controller: OpenIssueController,
    controllerAs: 'vm',
    bindings: {}
};
