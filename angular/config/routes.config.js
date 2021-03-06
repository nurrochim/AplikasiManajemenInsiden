export function RoutesConfig ($stateProvider, $urlRouterProvider) {
  'ngInject'

  var getView = (viewName) => {
    return `./views/app/pages/${viewName}/${viewName}.page.html`
  }

  var getLayout = (layout) => {
    return `./views/app/pages/layout/${layout}.page.html`
  }

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getLayout('layout')
        },
        'header@app': {
          templateUrl: getView('header')
        },
        'footer@app': {
          templateUrl: getView('footer')
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    .state('app.landing', {
      url: '/',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          templateUrl: getView('landing')
        }
      }
    })
    .state('app.tablessimple', {
      url: '/tables-simple',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<tables-simple></tables-simple>'
        }
      }
    })
    .state('app.uiicons', {
      url: '/ui-icons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-icons></ui-icons>'
        }
      }
    })
    .state('app.uimodal', {
      url: '/ui-modal',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-modal></ui-modal>'
        }
      }
    })
    .state('app.uitimeline', {
      url: '/ui-timeline',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-timeline></ui-timeline>'
        }
      }
    })
    .state('app.uibuttons', {
      url: '/ui-buttons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-buttons></ui-buttons>'
        }
      }
    })
    .state('app.uigeneral', {
      url: '/ui-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-general></ui-general>'
        }
      }
    })
    .state('app.formsgeneral', {
      url: '/forms-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<forms-general></forms-general>'
        }
      }
    })
    .state('app.chartjs', {
      url: '/charts-chartjs',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<charts-chartjs></charts-chartjs>'
        }
      }
    })
    .state('app.comingsoon', {
      url: '/comingsoon',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<coming-soon></coming-soon>'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-profile></user-profile>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userlist', {
      url: '/user-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-lists></user-lists>'
        }
      }
    })
    .state('app.useredit', {
      url: '/user-edit/:userId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-edit></user-edit>'
        }
      },
      params: {
        alerts: null,
        userId: null
      }
    })
    .state('app.userroles', {
      url: '/user-roles',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles></user-roles>'
        }
      }
    })
    .state('app.userpermissions', {
      url: '/user-permissions',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions></user-permissions>'
        }
      }
    })
    .state('app.userpermissionsadd', {
      url: '/user-permissions-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-add></user-permissions-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userpermissionsedit', {
      url: '/user-permissions-edit/:permissionId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-edit></user-permissions-edit>'
        }
      },
      params: {
        alerts: null,
        permissionId: null
      }
    })
    .state('app.userrolesadd', {
      url: '/user-roles-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-add></user-roles-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userrolesedit', {
      url: '/user-roles-edit/:roleId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-edit></user-roles-edit>'
        }
      },
      params: {
        alerts: null,
        roleId: null
      }
    })
    .state('app.widgets', {
      url: '/widgets',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<widgets></widgets>'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'layout': {
          templateUrl: getView('login')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })
    .state('loginloader', {
      url: '/login-loader',
      views: {
        'layout': {
          templateUrl: getView('login-loader')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('register', {
      url: '/register',
      views: {
        'layout': {
          templateUrl: getView('register')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition register-page'
      }
    })
    .state('userverification', {
      url: '/userverification/:status',
      views: {
        'layout': {
          templateUrl: getView('user-verification')
        }
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        status: null
      }
    })
    .state('forgot_password', {
      url: '/forgot-password',
      views: {
        'layout': {
          templateUrl: getView('forgot-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('reset_password', {
      url: '/reset-password/:email/:token',
      views: {
        'layout': {
          templateUrl: getView('reset-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('app.logout', {
      url: '/logout',
      views: {
        'main@app': {
          controller: function ($rootScope, $scope, $auth, $state, AclService) {
            $auth.logout().then(function () {
              delete $rootScope.me
              AclService.flushRoles()
              AclService.setAbilities({})
              $state.go('login')
            })
          }
        }
      }
    })
    .state('app.openissue', {
      url: '/open-issue',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<open-issue></open-issue>'
        }
      }
    })
    .state('app.inputopenissue', {
      url: '/input-open-issue/:inputState/:issueId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<open-issue-input></open-issue-input>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.openincident', {
      url: '/open-incident', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<open-incident-list></open-incident-list>'
        }
      }
    })
    .state('app.inputIncident', {
      url: '/input-incident/:inputState/:issueId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<open-incident-form></open-incident-form>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.assignTask', {
      url: '/assign-task', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<assign-task-list></assign-task-list>'
        }
      }
    })
    .state('app.assignTaskForm', {
      url: '/assign-task/:inputState/:issueId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<assign-task-form></assign-task-form>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.analyzing', {
      url: '/analyzing', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<analyzing-incident-list></analyzing-incident-list>'
        }
      }
    })
    .state('app.analyzingForm', {
      url: '/analyzing/:issueId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<analyzing-incident-form></analyzing-incident-form>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.fixing', {
      url: '/fixing', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<fixing-incident-list></fixing-incident-list>'
        }
      }
    })
    .state('app.fixingForm', {
      url: '/fixing/:issueId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<fixing-incident-form></fixing-incident-form>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.testing', { 
      url: '/testing', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<testing-incident-list></testing-incident-list>'
        }
      }
    })
    .state('app.testingForm', {
      url: '/testing/:issueId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<testing-incident-form></testing-incident-form>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.confirm', {
      url: '/confirm', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<confirm-closing-list></confirm-closing-list>'
        }
      }
    })
    .state('app.confirmForm', {
      url: '/confirm/:issueId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<confirm-form></confirm-form>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.confirmApproval', {
      url: '/confirmApproval', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<confirm-approval-list></confirm-approval-list>'
        }
      }
    })
    .state('app.confirmApprovalForm', {
      url: '/confirmApproval/:issueId',
      data: {
        auth: true
      },
      views: { 
        'main@app': {
          template: '<confirm-approval-form></confirm-approval-form>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.history', {
      url: '/history', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<history-incident-list></history-incident-list>'
        }
      }
    })
    .state('app.historyView', {
      url: '/historyView/:issueId',
      data: {
        auth: true
      },
      views: { 
        'main@app': {
          template: '<history-incident-form></history-incident-form>'
        }
      },
      params: {
        alerts: null,
        disableButtonStepTwo: null,
        inputState: null,
        issueId: null
      }
    })
    .state('app.report', {
      url: '/report', 
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<report-incident></report-incident>'
        }
      }
    })
}
