function datePickerClass () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            $(element).datetimepicker({
                
                format: 'YYYY-MM-DD',
                parseInputDate: function (data) {
                    if (data instanceof Date) {
                        return moment(data);
                    } else {
                        return moment(new Date(data));
                    }
                }
            });

            $(element).on("dp.change", function (e) {
                ngModel.$viewValue = e.date.toISOString().slice(0,10);;
                ngModel.$commitViewValue();
            });
        }
    }
  }
  
  export const DatePickerClassComponent = datePickerClass
  