/**
 *  @name validationErrorReporter
 *  @file: errorHandling/directive/validationErrorReporter.directive.js
 *  @description: Registers/removes an element's validation errors on the validationErrorsModel.
 */
define([
  'errorHandlingModule',
  'controller/validationErrorReporter.controller'
], function (errorHandlingModuleDefinition) {
  'use strict';

  errorHandlingModuleDefinition.directive('rfValidationErrorReporter', validationErrorReporter);

  function validationErrorReporter() {

    return {
      restrict  : 'A',
      link      : link,
      priority  : 1000,
      controller: 'validationErrorReporterController',
      require   : ['rfValidationErrorReporter', 'ngModel', '^?form']
    };

    function link() {

      var element                           = arguments[1];
      var formController                    = arguments[3][2];
      var ngModelController                 = arguments[3][1];
      var validationErrorReporterController = arguments[3][0];

      validationErrorReporterController.initialise(ngModelController, formController);

      element[0].addEventListener('blur', validationErrorReporterController.onElementBlur);
    }
  }
});
