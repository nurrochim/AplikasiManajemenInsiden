class OpenIncidentFormController {
  constructor($stateParams, $state, API, $log, $scope, FileUploader, $http, AclService, ContextService, $window, $filter) {
    'ngInject'

    this.$state = $state;
    this.formSubmitted = false;
    this.alerts = [];
    this.form_title = '';
    this.API = API;
    this.$scope = $scope;
    this.$window = $window; 
    this.raise_date = "2017-09-21T18:25:43-05:00";
    this.EditIssueId = '';
    this.stepOne = true;
    this.stepTwo = false;
    this.classElemetStepTwo = 'btn btn-default btn-circle';
    this.disableButtonStepTwo = true;
    this.showAlert = false;
    this.$http = $http;
    this.$filter = $filter;
    //this.issueDataEdit = {};



    let issueId = $stateParams.issueId
    this.EditIssueId = issueId;
    this.$scope.idIncident = issueId;
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
        this.disableButtonStepTwo = false;
        this.classElemetStepTwo = 'btn btn-primary btn-circle';
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

            this.selectedReporter = { id: this.fidUserRaised, name: this.raiseBy, division: this.division, groupDivision: this.groupDivision };
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
            this.selectedReporter = { id: this.fidUserRaised, name: this.raiseBy, division: this.division, groupDivision: this.groupDivision };
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
            groupDivision: value.group_division,
          });
        })
      })

    let openIcident = this;
    $scope.userName = '';
    openIcident.can = AclService.can

    ContextService.me(function (data) {
      openIcident.userData = data;
      openIcident.$scope.userName = openIcident.userData.name;
      if (openIcident.userData) {
        switch (inputState) {
          case 'add':
            openIcident.selectedReporter = { id: openIcident.userData.id, name: openIcident.userData.name, division: openIcident.userData.division, groupDivision: openIcident.userData.group_division };
            openIcident.division = openIcident.userData.division;
            openIcident.groupDivision = openIcident.userData.group_division;
            break
        }
      }
    })


    // get file incident
    $scope.files = [];
    let fileOpen = API.service('file-by-group', API.all('files'))
    fileOpen.one().get({idIncident:this.EditIssueId, fileGroup:'Open'})
      .then((response) => {
        let filesOpen = response.data.files;
        angular.forEach(response.data.files, function (value, key) {
          $scope.files.push({
            id: value.id,
            fidIncident: value.fidIncident,
            fileName: value.fileName,
            fileUrl: "http://" + $window.location.host +"/download/"+value.fidIncident+"/"+value.fileName
          });
        })
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

    var uploader = $scope.uploader = new FileUploader({
      url: 'file-upload',
      method: 'POST'
    });

    uploader.onBeforeUploadItem = function (item) {
      item.formData = [{ idIncident: $scope.idIncident, fileGorup: 'Open', userName: $scope.userName }];
    };

    $scope.deleteImage = function (id) {
      console.info('removeId', id);
      $http.post('/destroy-image', { id: id })
        .then(function (success) {
          //console.info('remove', success);
          //onsole.info('remove', success.data.message);
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
    // image filter
    // uploader.filters.push({
    //   name: 'imageFilter',
    //   fn: function (item /*{File|FileLikeObject}*/, options) {
    //     var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
    //     return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    //   }
    // });

    // a sync filter
    uploader.filters.push({
      name: 'syncFilter',
      fn: function (item /*{File|FileLikeObject}*/, options) {
        console.log('syncFilter');
        return this.queue.length < 10;
      }
    });

    // an async filter
    uploader.filters.push({
      name: 'asyncFilter',
      fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
        console.log('asyncFilter');
        setTimeout(deferred.resolve, 1e3);
      }
    });


    uploader.onCompleteItem = function (fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function () {
      console.info('onCompleteAll');
    };

    //console.info('uploader', uploader);

  }

  filterImage(item) {
    var type = item.slice((item.lastIndexOf(".") - 1 >>> 0) + 2);
    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
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

  reloadDivision() {
    this.division = this.selectedReporter.division;
    this.groupDivision = this.selectedReporter.groupDivision;
  }

  downloadAttachment($idIncident, $fileName) {
    let $http = this.$http;
    var path = 'download/'.concat($idIncident,"/",$fileName);
    $http({
      url: path,
      method: 'GET',
      headers: {
        'Content-Type': undefined
      }
    }) 
      // .success(function (respon) {
        //alert(result);
        //console.info('remove', result);
      // });
    // let CreateIssue = this.API.service('download', this.API.all('files'))
    // CreateIssue.one().get()
    .then((respon) => { 
      //console.info('download respon', respon);
        // var url = (window.URL || window.webkitURL).createObjectURL(response);
        // window.open(url); 

        //create sample hidden link in document, to accept Blob returned in the response from back end
    
	    	var downloadLink = document.createElement("a");
    
        document.body.appendChild(downloadLink);
        downloadLink.style = "display: none";
    
    //This service is written Below how does it work, by aceepting necessary params
        
     
          var fName = 'Kartu Ujian.pdf'; 
          var file = new Blob([respon]);
          var fileURL = (window.URL || window.webkitURL).createObjectURL(file);
    
              
    //Blob, client side object created to with holding browser specific download popup, on the URL created with the help of window obj.
              
          downloadLink.href = fileURL;
          downloadLink.download = fName;
          downloadLink.click();
      })
    }
  

  save(isValid) {
    if (isValid) {
      let CreateIssue = this.API.service('incident', this.API.all('incidents'))
      let $state = this.$state
      let $filter = this.$filter;
      let $raisedDate = $filter('date')(this.$scope.dt, "yyyy-MM-dd");
      //console.log('is Save');
      CreateIssue.post({
        'raisedDate': $raisedDate,
        'raisedBy': this.selectedReporter.name,
        'fidUserRaised': this.selectedReporter.id,
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
      let $filter = this.$filter;
      let $raisedDate = $filter('date')(this.$scope.dt, "yyyy-MM-dd");
      //console.log('Is Update');
      this.issueDataEdit.data.raisedDate = $raisedDate;
      this.issueDataEdit.data.raisedBy = this.selectedReporter.name,
        this.issueDataEdit.data.fidUserRaised = this.selectedReporter.id,
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
