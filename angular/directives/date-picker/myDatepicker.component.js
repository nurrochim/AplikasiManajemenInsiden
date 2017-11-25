function myDatepickerClass ($parse) {
    return {
        require: 'ngModel',
        restrict: "E",
        replace: true,
        transclude: false,
        compile: function (element, attrs) {
           var modelAccessor = $parse(attrs.ngModel);
  
           var html = "<input type='text' id='" + attrs.id + "' >" +
              "</input>";
  
           var newElem = $(html);
           element.replaceWith(newElem);
  
           return function (scope, element, attrs, controller) {
  
              var processChange = function () {
                 var date = new Date(element.datepicker("getDate"));
  
                 scope.$apply(function (scope) {
                    // Change bound variable
                    modelAccessor.assign(scope, date);
                 });
              };
  
              element.datepicker({
                 inline: true,
                 onClose: processChange,
                 onSelect: processChange
              });
  
              scope.$watch(modelAccessor, function (val) {
                 var date = new Date(val);
                 element.datepicker("setDate", date);
              });
  
           };
  
        }
    }
  }
  
  export const MyDatepickerClassComponent = myDatepickerClass
  