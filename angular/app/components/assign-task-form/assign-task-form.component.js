class AssignTaskFormController {
  constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, $uibModal) {
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
    this.stepOne = true;
    this.stepTwo = false;
    this.classElemetStepTwo = 'btn btn-default btn-circle';
    this.disableButtonStepTwo = true;
    this.showAlert = false;
    //this.issueDataEdit = {};

    let issueId = $stateParams.issueId
    this.EditIssueId = issueId;
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
      this.disableButtonStepTwo = $stateParams.disableButtonStepTwo;
      this.stepTwo = true;
      this.stepOne = false;
      this.classElemetStepTwo = 'btn btn-primary btn-circle';
    }

    switch (inputState) {
      case 'edit':
        this.form_title = "Edit Assign Task";
        this.form_subTitle = "Incident Number";
        this.isEdit = false;
        break;
      case 'edits':
        this.form_title = "Edit Assign Task";
        this.form_subTitle = "Incident Number : " + issueId;
        this.isEdit = true;
        //getIssueData();
        let IssueEdit = API.service('issue-show', API.all('issues'))
        IssueEdit.one(issueId).get()
          .then((response) => {
            this.issueDataEdit = API.copy(response);
            var issueEdit = this.issueDataEdit;
            this.raise_date = issueEdit.data.raise_date;
            $scope.dt = new Date(this.raise_date);

            this.priority = issueEdit.data.priority;
            this.module = issueEdit.data.module;
            this.sub_module = issueEdit.data.sub_module;
            this.issue_description = issueEdit.data.issue_description;
            this.pic_analyzing = issueEdit.data.pic_analyzing;
            this.pic_fixing = issueEdit.data.pic_fixing;
            this.pic_testing = issueEdit.data.pic_testing;
          })
        break;
      case 'editAfterSave':
        this.form_subTitle = "Incident Number : " + issueId;
        this.isEdit = true;
        //getIssueData();
        let IssueEditSave = API.service('issue-show', API.all('issues'))
        IssueEditSave.one(issueId).get()
          .then((response) => {
            this.issueDataEdit = API.copy(response);
            var issueEdit = this.issueDataEdit;
            this.raise_date = issueEdit.data.raise_date;
            $scope.dt = new Date(this.raise_date);

            this.priority = issueEdit.data.priority;
            this.module = issueEdit.data.module;
            this.sub_module = issueEdit.data.sub_module;
            this.issue_description = issueEdit.data.issue_description;
            this.pic_analyzing = issueEdit.data.pic_analyzing;
            this.pic_fixing = issueEdit.data.pic_fixing;
            this.pic_testing = issueEdit.data.pic_testing;
          })
        break;
      default:
        break;
    }

    function getIssueData() {

    }

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

    $scope.assignTaskPIC = [
      {
        taskName: 'Analyzing',
        picName: 'Candra Yudha',
        targetDate: '12 Jan 2018'
      },
      {
        taskName: 'Programming',
        picName: 'Nurochim',
        targetDate: '14 Jan 2018'
      },
      {
        taskName: 'Testing',
        picName: 'Julda Y',
        targetDate: '15 Jan 2018'
      }
    ];
  }

  toggle(modalstate, id) {
    let $uibModal = this.$uibModal
    let $scope = this.$scope
    
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: this.modalcontroller,
      controllerAs: 'mvm'
    })


  }

  modalcontroller($scope, $uibModalInstance) {
    'ngInject'

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

export const AssignTaskFormComponent = {
  templateUrl: './views/app/components/assign-task-form/assign-task-form.component.html',
  controller: AssignTaskFormController,
  controllerAs: 'vm',
  bindings: {}
};
