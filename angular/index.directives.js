import { RouteBodyClassComponent } from './directives/route-bodyclass/route-bodyclass.component'
import { PasswordVerifyClassComponent } from './directives/password-verify/password-verify.component'
//import { DatePickerClassComponent } from './directives/date-picker/date-picker.component'
//import { DatePickerInputClassComponent } from './directives/date-picker/date-picker-input.component'
//import { MyDatepickerClassComponent } from './directives/date-picker/myDatepicker.component'



angular.module('app.components')
  .directive('routeBodyclass', RouteBodyClassComponent)
  .directive('passwordVerify', PasswordVerifyClassComponent)
  // .directive('datePicker', DatePickerClassComponent)
  // .directive('datePickerInput', DatePickerInputClassComponent)
  //.directive('myDatepicker', MyDatepickerClassComponent)
