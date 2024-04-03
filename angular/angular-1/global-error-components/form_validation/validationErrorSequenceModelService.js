/**
 *  @name validationErrorSequenceModel
 *  @file: validationErrorSequenceModelService.js
 *  @description: Acts as a view model exposing one errors at a time in order the order they are raised or for active form element
 *  @dependencies: errorHandlingModule
 */
define([
  'errorHandlingModule',
  'underscore'
], function (errorHandlingModuleDefinition, _) {
  'use strict';

  errorHandlingModuleDefinition.factory('validationErrorSequenceModel', validationErrorSequenceModel);

  validationErrorSequenceModel.$inject = ['validationErrorsModel'];

  function validationErrorSequenceModel(validationErrorsModel) {

    var formName;
    var controlName;
    var validationErrors = validationErrorsModel.getErrorCollection();

    return {
      getError                        : getError,
      prioritiseErrorsByFormAndControl: prioritiseErrorsByFormAndControl
    };

    function getError() {

      var activeControlError = getActiveControlError();
      return activeControlError ? activeControlError : validationErrors[validationErrors.length - 1];
    }

    function getActiveControlError() {
      return _.findWhere(validationErrors, createQueryObject());
    }

    function createQueryObject() {

      return {
        formName   : formName,
        controlName: controlName
      };
    }

    function prioritiseErrorsByFormAndControl(_formName, _controlName) {

      formName    = _formName;
      controlName = _controlName;
    }
  }
});