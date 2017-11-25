class OpenIssueInputController {
  constructor($stateParams, $state, API, $log, $scope, FileUploader, $http) {
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
    
    let issueId = $stateParams.issueId
    this.EditIssueId = issueId;
    let inputState = $stateParams.inputState
    //$log.info(issueId+' '+inputState);

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts);
      this.showAlert = true;
      if(!!this.alerts[0].inputState){
        inputState = this.alerts[0].inputState;
        issueId = this.alerts[0].issueId;
        this.EditIssueId = issueId;
      }
    }

    if ($stateParams.disableButtonStepTwo!==null){
      this.disableButtonStepTwo = $stateParams.disableButtonStepTwo;
      this.stepTwo = true;
      this.stepOne = false;
      this.classElemetStepTwo = 'btn btn-primary btn-circle';
    }

    switch (inputState) {
      case 'add':
        this.form_title = "Add New Issue";
        this.form_subTitle = "Create New Issue";
        this.isEdit = false;
        break;
      case 'edit':
        this.form_title = "Edit Issue";
        this.form_subTitle = "Edit Issue Number : " + issueId;
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
        this.form_subTitle = "Issue Number : " + issueId; 
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

    function getIssueData(){
      
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
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

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

    // PIC
    $scope.optionsPIC = [
      { name: 'Faisal Amir', value: 'Faisal Amir' },
      { name: 'Nurochim', value: 'Nurochim' },
      { name: 'Asvian', value: 'Asvian' },
      { name: 'Jumadi', value: 'Jumadi' },
      { name: 'Julda', value: 'Julda' },
      { name: 'Deny Ginanjar', value: 'Deny' },
      { name: 'Fatma Lifaraidlika', value: 'Fatma' },
      { name: 'Candra Yudhatama', value: 'Candra' },
      { name: 'Aulia Siahaan', value: 'Aulia' },
      { name: 'Iskandar', value: 'Iskandar' }

    ];
    $scope.selectedOptionPIC = $scope.optionsPIC[0].value;


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

    // CALLBACKS

    // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    //     console.info('onWhenAddingFileFailed', item, filter, options);
    // };
    // uploader.onAfterAddingFile = function(fileItem) {
    //     console.info('onAfterAddingFile', fileItem);
    // };
    // uploader.onAfterAddingAll = function(addedFileItems) {
    //     console.info('onAfterAddingAll', addedFileItems);
    // };
    // uploader.onBeforeUploadItem = function(item) {
    //     console.info('onBeforeUploadItem', item);
    // };
    // uploader.onProgressItem = function(fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    // uploader.onProgressAll = function(progress) {
    //     console.info('onProgressAll', progress);
    // };
    // uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //     console.info('onSuccessItem', fileItem, response, status, headers);
    // };
    // uploader.onErrorItem = function(fileItem, response, status, headers) {
    //     console.info('onErrorItem', fileItem, response, status, headers);
    // };
    // uploader.onCancelItem = function(fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteItem = function(fileItem, response, status, headers) {
    //     console.info('onCompleteItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteAll = function() {
    //     console.info('onCompleteAll');
    // };

    console.info('uploader', uploader);

  }

  eventStepOne(){
    this.stepOne = true;
    this.stepTwo = false;
    this.classElemetStepTwo = 'btn btn-default btn-circle';
  }

  eventStepTwo(){
    this.stepOne = false;
    this.stepTwo = true;
    this.classElemetStepTwo = 'btn btn-primary btn-circle'; 
  }

  save(isValid) {
    if (isValid) {
      let CreateIssue = this.API.service('issue', this.API.all('issues'))
      let $state = this.$state
      //console.log('is Save');
      CreateIssue.post({
        'raise_date': this.$scope.dt, 
        'priority': this.priority,
        'module': this.module,
        'sub_module': this.sub_module,
        'issue_description': this.issue_description,
        'pic_analyzing': this.pic_analyzing,
        'pic_fixing': this.pic_fixing,
        'pic_testing': this.pic_testing
      }).then(function (success) {
        let disableButtonStepTwo_ = false;
        let alert = { type: 'success', 'title': 'Success!', msg: 'Issue No: '+success.data.id+' Issue has been added.'
                      ,  inputState : 'editAfterSave', issueId :success.data.id }
        $state.go($state.current, { alerts: alert, disableButtonStepTwo : disableButtonStepTwo_ });
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
      this.issueDataEdit.data.raise_date = this.$scope.dt;
      this.issueDataEdit.data.priority = this.priority;
      this.issueDataEdit.data.module = this.module;
      this.issueDataEdit.data.sub_module = this.sub_module;
      this.issueDataEdit.data.issue_description = this.issue_description;
      this.issueDataEdit.data.pic_analyzing = this.pic_analyzing;
      this.issueDataEdit.data.pic_fixing = this.pic_fixing;
      this.issueDataEdit.data.pic_testing = this.pic_testing;

      this.issueDataEdit.put()
        .then(() => {
          let disableButtonStepTwo_ = false;
          let alert = { type: 'success', 'title': 'Success!', msg: 'Data has been updated.' 
                        ,  inputState : 'edit', issueId : this.EditIssueId } 
          $state.go($state.current, { alerts: alert, disableButtonStepTwo : disableButtonStepTwo_ });
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

export const OpenIssueInputComponent = {
  templateUrl: './views/app/components/open-issue-input/open-issue-input.component.html',
  controller: OpenIssueInputController,
  controllerAs: 'vm',
  bindings: {}
}; 
