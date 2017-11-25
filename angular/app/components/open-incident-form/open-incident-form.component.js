class OpenIncidentFormController {
  constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, AclService, ContextService) {
    'ngInject'

    this.$state = $state;
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

    let openIcident = this
    openIcident.can = AclService.can

    ContextService.me(function (data) {
      openIcident.userData = data
    })

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
      case 'add':
        this.form_title = "Add New Incident";
        this.form_subTitle = "Create New Incident";
        this.isEdit = false;
        break;
      case 'edit':
        this.form_title = "Edit Incident";
        this.form_subTitle = "Edit Incident Number : " + issueId;
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

          })
        break;
      case 'editAfterSave':
        this.form_subTitle = "Incident Number : " + issueId;
        this.isEdit = true;
        //getIssueData();
        let IssueEditSave = API.service('incident-show', API.all('incidents'))
        IssueEditSave.one(issueId).get()
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
            
          })
        break;
      default:
        break;
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
            groupDivision: value.groupDivision
          });
        })

        switch (inputState) {
          case 'add':

          $scope.selectedReporter = { id: this.userData.fidUserRaised, name: this.userData.raiseBy, division:this.userData.division, groupDivision:this.userData.groupDivision }; 
          break;
          case 'edit':
          $scope.selectedReporter = { id: this.fidUserRaised, name: this.raiseBy, division:this.division, groupDivision:this.groupDivision };
          break;
          case 'editAfterSave':
          $scope.selectedReporter = { id: this.fidUserRaised, name: this.raiseBy, division:this.division, groupDivision:this.groupDivision };
          break;
          default:
          break;
        }
      })

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

    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // var afterTomorrow = new Date();
    // afterTomorrow.setDate(tomorrow.getDate() + 1);
    // $scope.events = [
    //   {
    //     date: tomorrow,
    //     status: 'full'
    //   },
    //   {
    //     date: afterTomorrow,
    //     status: 'partially'
    //   }
    // ];

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

    var uploader = $scope.uploader = new FileUploader({
      url: 'upload'
    });

    $scope.deleteImage = function (id) {
      console.info('removeId', id);
      $http.post('/destroy-image', { id: id })
        .then(function (success) {
          //console.info('remove', success);
          c//onsole.info('remove', success.data.message);
        }, function (error) {

        });
    }

    $scope.removeFile = function (attachment) {
      var path = 'delete';
      $http({
        url: path,
        data: attachment,
        method: 'POST',
        headers: {
          'Content-Type': undefined
        }
      })
        .success(function (result) {
          //alert(result);
          //console.info('remove', result);
        });
    }

    // FILTERS

    uploader.filters.push({
      name: 'imageFilter',
      fn: function (item /*{File|FileLikeObject}*/, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    console.info('uploader', uploader);

  }

  eventStepOne() {
    this.stepOne = true;
    this.stepTwo = false;
    this.classElemetStepTwo = 'btn btn-default btn-circle';
  }

  eventStepTwo() {
    this.stepOne = false;
    this.stepTwo = true;
    this.classElemetStepTwo = 'btn btn-primary btn-circle';
  }

  save(isValid) {
    if (isValid) {
      let CreateIssue = this.API.service('incident', this.API.all('incidents'))
      let $state = this.$state
      //console.log('is Save');
      CreateIssue.post({
        'raisedDate': this.$scope.dt,
        'raisedBy': this.$scope.selectedReporter.name,
        'fidUserRaised': this.$scope.selectedReporter.value,
        'division': this.division,
        'groupDivision': this.groupDivision,
        'issueDescription': this.issueDescription,

      }).then(function (success) {
        let disableButtonStepTwo_ = false;
        let alert = {
          type: 'success', 'title': 'Success!', msg: 'Incident No: ' + success.data.idIncident + ' Incident has been added.'
          , inputState: 'editAfterSave', issueId: success.data.idIncident
        }
        $state.go($state.current, { alerts: alert, disableButtonStepTwo: disableButtonStepTwo_ });
      }, function (error) {
        let alert = { type: 'error', 'title': 'Error!', msg: error.data.message }
        $state.go($state.current, { alerts: alert })
      })
    } else {
      this.formSubmitted = true
    }
  }

  update(isValid) {
    if (isValid) {
      let $state = this.$state
      //console.log('Is Update');
      this.issueDataEdit.data.raisedDate = this.$scope.dt;
      this.issueDataEdit.data.raisedBy = this.$scope.selectedReporter.name,
        this.issueDataEdit.data.fidUserRaised = this.$scope.selectedReporter.value,
        this.issueDataEdit.data.division = this.division;
      this.issueDataEdit.data.groupDivision = this.groupDivision;
      this.issueDataEdit.data.issueDescription = this.issueDescription;

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

  $onInit() {
  }
}

export const OpenIncidentFormComponent = {
  templateUrl: './views/app/components/open-incident-form/open-incident-form.component.html',
  controller: OpenIncidentFormController,
  controllerAs: 'vm',
  bindings: {}
};
