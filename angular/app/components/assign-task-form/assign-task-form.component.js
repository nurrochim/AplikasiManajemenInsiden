class AssignTaskFormController {
  constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, $uibModal, AclService, ContextService) {
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
    this.showAlert = false;
    this.detailIncidentDisable = true;
    //this.issueDataEdit = {};

    let issueId = $stateParams.issueId;
    this.EditIssueId = issueId;
    let inputState = $stateParams.inputState;
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

    switch (inputState) {
      case 'edit':
        this.form_title = "Edit Assign Task";
        this.form_subTitle = "Incident Number : " + issueId;
        this.isEdit = true;
        //getIssueData();
        let IssueEdit = API.service('incident-show', API.all('incidents'))
        IssueEdit.one(issueId).get()
          .then((response) => {
            this.issueDataEdit = API.copy(response);
            var issueEdit = this.issueDataEdit;
            this.raise_date = issueEdit.data.raisedDate;
            $scope.dt = new Date(this.raise_date);

            this.raiseBy = issueEdit.data.raisedBy;
            this.fidUserRaised = issueEdit.data.fidUserRaised;
            this.division = issueEdit.data.division;
            this.groupDivision = issueEdit.data.groupDivision;
            this.issueDescription = issueEdit.data.issueDescription;
            this.module = issueEdit.data.module;
            this.subModule = issueEdit.data.subModule;
            this.priority = issueEdit.data.priority;

            this.selectedReporter = { id: this.fidUserRaised, name: this.raiseBy, division: this.division, groupDivision: this.groupDivision };
          })
        break;
      default:
        break;
    }

    function getIssueData() {

    }

    // get Data Reporte
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

    let openIcident = this;
    openIcident.can = AclService.can

    ContextService.me(function (data) {
      openIcident.userData = data;
      if (data) {
        switch (inputState) {
          case 'add':
            openIcident.selectedReporter = { id: openIcident.userData.id, name: openIcident.userData.name, division: openIcident.userData.division, groupDivision: openIcident.userData.group_division };
            openIcident.division = openIcident.userData.division;
            openIcident.groupDivision = openIcident.userData.group_division;
            break
        }
      }
    })

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

    $scope.assignTaskPIC = [];
    this.refreshTablePic();
  }

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
      this.refreshTablePic();
    }, () => {
      $log.info('Modal dismissed at: ' + new Date())
    })
  }

  modalcontroller($scope, $uibModalInstance, API, $http, items) {
    'ngInject'

    // items
    let modalstate = items[0].modalState;
    let idState = items[0].id;


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
      switch (modalstate) {
        case 'add':
          let CreatePic = API.service('incident-pic', API.all('incidentpics'))
          //let $state = this.$state
          CreatePic.post({
            'fidIncident': idState,
            'fidUser': this.pic.id,
            'picName': this.pic.name,
            'targetDate': $scope.dtPic,
            'task': this.task,
          }).then(function (success) {
            // let disableButtonStepTwo_ = false;
            // let alert = {
            //   type: 'success', 'title': 'Success!', msg: 'Incident No: ' + success.data.idIncident + ' Incident has been added.'
            //   , inputState: 'editAfterSave', issueId: success.data.idIncident
            // }
            // $state.go($state.current, { alerts: alert, disableButtonStepTwo: disableButtonStepTwo_ });

            $uibModalInstance.close()
            console.info('save-pic-succes', success);
          }, function (error) {
            // let alert = { type: 'error', 'title': 'Error!', msg: error.data.message }
            // $state.go($state.current, { alerts: alert })
            console.error('save-pic-error', error);
          })
          break;
        case 'edit':

          break;
        default:
          break;
      }
      //$uibModalInstance.close($scope.selected.item)
    }

    this.cancel = () => {
      $uibModalInstance.dismiss('cancel')
    }
  }

  toggleModalAnimation() {
    this.animationsEnabled = true;
  }

  update(isValid) {
    if (isValid) {
      let $state = this.$state
      //console.log('Is Update');
      this.issueDataEdit.data.raisedDate = this.$scope.dt;
      this.issueDataEdit.data.raisedBy = this.selectedReporter.name,
        this.issueDataEdit.data.fidUserRaised = this.selectedReporter.id,
        this.issueDataEdit.data.division = this.division;
      this.issueDataEdit.data.groupDivision = this.groupDivision;
      this.issueDataEdit.data.issueDescription = this.issueDescription;
      this.issueDataEdit.data.module = this.module;
      this.issueDataEdit.data.subModule = this.subModule;
      this.issueDataEdit.data.priority = this.priority;

      this.issueDataEdit.put()
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

  delete(idPic) {
    let API = this.API
    let $state = this.$state
    let parent = this;
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
      API.one('incidentpics').one('incident-pic', idPic).remove()
        .then(() => {
          //$state.reload()
          parent.refreshTablePic();
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
            targetDate: value.targetDate,
          });
        })
      })
  }
  $onInit() {
  }
}

export const AssignTaskFormComponent = {
  templateUrl: './views/app/components/assign-task-form/assign-task-form.component.html',
  controller: AssignTaskFormController,
  controllerAs: 'vm',
  bindings: {}
};
