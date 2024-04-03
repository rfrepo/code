/**
 *  @name validationErrorReporterController
 *  @file: errorHandling/controller/validationErrorReporter.controller.js
 *  @description: controller for the validationErrorReporter directive
 *  @dependencies: errorHandlingModule
 */
define([
  'errorHandlingModule',
  'underscore'
], function (errorHandlingModuleDefinition, _) {
  'use strict';

  errorHandlingModuleDefinition.controller('validationErrorReporterController', ValidationErrorReporterController);

  ValidationErrorReporterController.$inject = ['$scope', 'validationErrorsModel'];

  function ValidationErrorReporterController($scope, validationErrorsModel) {

    var formController;
    var ngModelController;

    var vm = this;

    vm.initialise    = initialise;
    vm.onElementBlur = onElementBlur;

    function initialise(_ngModelController, _formController) {

      formController    = _formController;
      ngModelController = _ngModelController;

      ngModelController.$parsers.push(function (viewValue) {
        updateValidationErrors();
        return viewValue;
      });

      updateValidationErrors();
    }

    function onElementBlur() {

      $scope.$apply(function () {

        updateValidationErrors();

        if (!ngModelController.$dirty) {
          ngModelController.$setViewValue(ngModelController.$modelValue);
        }
      });
    }

    function updateValidationErrors() {

      _.each(ngModelController.$error, function (isfailed, nameOfValidation) {

        if (isfailed) {
          validationErrorsModel.registerError(formController.$name, ngModelController.$name, nameOfValidation);

        } else {
          validationErrorsModel.removeError(formController.$name, ngModelController.$name, nameOfValidation);
        }
      });
      //}
    }

  }
});