class UserEditController {
  constructor ($stateParams, $state, API, $scope) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.userRolesSelected = []
    this.$scope = $scope;

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let userId = $stateParams.userId

    let Roles = API.service('roles', API.all('users'))
    Roles.getList()
      .then((response) => {
        let systemRoles = []
        let roleResponse = response.plain()

        angular.forEach(roleResponse, function (value) {
          systemRoles.push({id: value.id, name: value.name})
        })

        this.systemRoles = systemRoles
      })

    let UserData = API.service('show', API.all('users'))
    UserData.one(userId).get()
      .then((response) => {
        let userRole = []
        let userResponse = response.plain()

        angular.forEach(userResponse.data.role, function (value) {
          userRole.push(value.id)
        })

        response.data.role = userRole
        this.usereditdata = API.copy(response)
      })

      $scope.optionsJobTitle = [
        { name: 'End User', value: 'ED' },
        { name: 'Project Manager', value: 'PM' },
        { name: 'Service Desk Admin', value: 'SD' },
        { name: 'System Analyse', value: 'SA' },
        { name: 'Programmer', value: 'PG' },
        { name: 'Quality Assurance', value: 'QA' }
      ];
      $scope.selectedOptionJobTitle = $scope.optionsJobTitle[0].value;
  }

  save (isValid) {
    if (isValid) {
      let $state = this.$state
      this.usereditdata.put()
        .then(() => {
          let alert = { type: 'success', 'title': 'Success!', msg: 'User has been updated.' }
          $state.go($state.current, { alerts: alert})
        }, (response) => {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          $state.go($state.current, { alerts: alert})
        })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit () {}
}

export const UserEditComponent = {
  templateUrl: './views/app/components/user-edit/user-edit.component.html',
  controller: UserEditController,
  controllerAs: 'vm',
  bindings: {}
}
