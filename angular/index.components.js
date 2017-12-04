import {ConfirmApprovalListComponent} from './app/components/confirm-approval-list/confirm-approval-list.component';
import {ConfirmApprovalFormComponent} from './app/components/confirm-approval-form/confirm-approval-form.component';
import {AssignPicFormComponent} from './app/components/assign-pic-form/assign-pic-form.component';
import {HistoryIncidentFormComponent} from './app/components/history-incident-form/history-incident-form.component';
import {HistoryIncidentListComponent} from './app/components/history-incident-list/history-incident-list.component';
import {ClosingIncidentFormComponent} from './app/components/closing-incident-form/closing-incident-form.component';
import {ConfirmFormComponent} from './app/components/confirm-form/confirm-form.component';
import {ConfirmClosingListComponent} from './app/components/confirm-closing-list/confirm-closing-list.component';
import {TestingIncidentFormComponent} from './app/components/testing-incident-form/testing-incident-form.component';
import {TestingIncidentListComponent} from './app/components/testing-incident-list/testing-incident-list.component';
import {FixingIncidentListComponent} from './app/components/fixing-incident-list/fixing-incident-list.component';
import {FixingIncidentFormComponent} from './app/components/fixing-incident-form/fixing-incident-form.component';
import {AnalyzingIncidentFormComponent} from './app/components/analyzing-incident-form/analyzing-incident-form.component';
import {AnalyzingIncidentListComponent} from './app/components/analyzing-incident-list/analyzing-incident-list.component';
import {AssignTaskFormComponent} from './app/components/assign-task-form/assign-task-form.component';
import {AssignTaskListComponent} from './app/components/assign-task-list/assign-task-list.component';
import {OpenIncidentFormComponent} from './app/components/open-incident-form/open-incident-form.component';
import {OpenIncidentListComponent} from './app/components/open-incident-list/open-incident-list.component';
import {OpenIssueInputComponent} from './app/components/open-issue-input/open-issue-input.component';
import {OpenIssueComponent} from './app/components/open-issue/open-issue.component';
import { TablesSimpleComponent } from './app/components/tables-simple/tables-simple.component'
import { UiModalComponent } from './app/components/ui-modal/ui-modal.component'
import { UiTimelineComponent } from './app/components/ui-timeline/ui-timeline.component'
import { UiButtonsComponent } from './app/components/ui-buttons/ui-buttons.component'
import { UiIconsComponent } from './app/components/ui-icons/ui-icons.component'
import { UiGeneralComponent } from './app/components/ui-general/ui-general.component'
import { FormsGeneralComponent } from './app/components/forms-general/forms-general.component'
import { ChartsChartjsComponent } from './app/components/charts-chartjs/charts-chartjs.component'
import { WidgetsComponent } from './app/components/widgets/widgets.component'
import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
import { UserVerificationComponent } from './app/components/user-verification/user-verification.component'
import { ComingSoonComponent } from './app/components/coming-soon/coming-soon.component'
import { UserEditComponent } from './app/components/user-edit/user-edit.component'
import { UserPermissionsEditComponent } from './app/components/user-permissions-edit/user-permissions-edit.component'
import { UserPermissionsAddComponent } from './app/components/user-permissions-add/user-permissions-add.component'
import { UserPermissionsComponent } from './app/components/user-permissions/user-permissions.component'
import { UserRolesEditComponent } from './app/components/user-roles-edit/user-roles-edit.component'
import { UserRolesAddComponent } from './app/components/user-roles-add/user-roles-add.component'
import { UserRolesComponent } from './app/components/user-roles/user-roles.component'
import { UserListsComponent } from './app/components/user-lists/user-lists.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { NavSidebarComponent } from './app/components/nav-sidebar/nav-sidebar.component'
import { NavHeaderComponent } from './app/components/nav-header/nav-header.component'
import { LoginLoaderComponent } from './app/components/login-loader/login-loader.component'
import { ResetPasswordComponent } from './app/components/reset-password/reset-password.component'
import { ForgotPasswordComponent } from './app/components/forgot-password/forgot-password.component'
import { LoginFormComponent } from './app/components/login-form/login-form.component'
import { RegisterFormComponent } from './app/components/register-form/register-form.component'

angular.module('app.components')
	.component('confirmApprovalList', ConfirmApprovalListComponent)
	.component('confirmApprovalForm', ConfirmApprovalFormComponent)
	.component('assignPicForm', AssignPicFormComponent)
	.component('historyIncidentForm', HistoryIncidentFormComponent)
	.component('historyIncidentList', HistoryIncidentListComponent)
	.component('closingIncidentForm', ClosingIncidentFormComponent)
	.component('confirmForm', ConfirmFormComponent)
	.component('confirmClosingList', ConfirmClosingListComponent)
	.component('testingIncidentForm', TestingIncidentFormComponent)
	.component('testingIncidentList', TestingIncidentListComponent)
	.component('fixingIncidentList', FixingIncidentListComponent)
	.component('fixingIncidentForm', FixingIncidentFormComponent)
	.component('analyzingIncidentForm', AnalyzingIncidentFormComponent)
	.component('analyzingIncidentList', AnalyzingIncidentListComponent)
	.component('assignTaskForm', AssignTaskFormComponent)
	.component('assignTaskList', AssignTaskListComponent)
	.component('openIncidentForm', OpenIncidentFormComponent)
	.component('openIncidentList', OpenIncidentListComponent)
	.component('openIssueInput', OpenIssueInputComponent)
	.component('openIssue', OpenIssueComponent)
	.component('tablesSimple', TablesSimpleComponent)
  .component('uiModal', UiModalComponent)
  .component('uiTimeline', UiTimelineComponent)
  .component('uiButtons', UiButtonsComponent)
  .component('uiIcons', UiIconsComponent)
  .component('uiGeneral', UiGeneralComponent)
  .component('formsGeneral', FormsGeneralComponent)
  .component('chartsChartjs', ChartsChartjsComponent)
  .component('widgets', WidgetsComponent)
  .component('userProfile', UserProfileComponent)
  .component('userVerification', UserVerificationComponent)
  .component('comingSoon', ComingSoonComponent)
  .component('userEdit', UserEditComponent)
  .component('userPermissionsEdit', UserPermissionsEditComponent)
  .component('userPermissionsAdd', UserPermissionsAddComponent)
  .component('userPermissions', UserPermissionsComponent)
  .component('userRolesEdit', UserRolesEditComponent)
  .component('userRolesAdd', UserRolesAddComponent)
  .component('userRoles', UserRolesComponent)
  .component('userLists', UserListsComponent)
  .component('dashboard', DashboardComponent)
  .component('navSidebar', NavSidebarComponent)
  .component('navHeader', NavHeaderComponent)
  .component('loginLoader', LoginLoaderComponent)
  .component('resetPassword', ResetPasswordComponent)
  .component('forgotPassword', ForgotPasswordComponent)
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
