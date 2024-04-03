/**
 *  @name prioritiseErrorsOnFocus
 *  @file: validationErrorReporterDirective.js
 *  @description: Registers/removes an element's validation errors on the validationErrorsModel.
 */
define(['errorHandlingModule'], function (errorHandlingModuleDefinition) {
  'use strict';

  errorHandlingModuleDefinition.directive('rfPrioritiseErrorsOnFocus', prioritiseErrorsOnFocus);

  prioritiseErrorsOnFocus.$inject = ['validationErrorSequenceModel'];

  function prioritiseErrorsOnFocus(validationErrorSequenceModel) {

    return {
      restrict: 'A',
      link    : link,
      priority: 1000,
      require : ['^?form', 'ngModel']
    };

    function link() {

      var scope             = arguments[0];
      var element           = arguments[1];
      var formController    = arguments[3][0];
      var ngModelController = arguments[3][1];

      element[0].addEventListener('focus', handleOnFocus);

      function handleOnFocus() {

        scope.$apply(function () {
          validationErrorSequenceModel.prioritiseErrorsByFormAndControl(formController.$name, ngModelController.$name);
        });
      }
    }
  }
});
