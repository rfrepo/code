/**
 *  @name abstractErrorsInterceptor
 *  @file: support/abstractErrorsInterceptor.js
 *  @description: Base implementation for all Intercepts
 *  @dependencies: pageErrorsModel, dataParser
 */
define([], function () {
  'use strict';

  var dataParser;

  AbstractErrorsInterceptor.$inject = ['dataParser', 'pageErrorsModel'];

  function AbstractErrorsInterceptor(_dataParser, pageErrorsModel) {

    dataParser = _dataParser;

    var self            = this;
    this.isIntercepting = true;
    this.errorsModel    = pageErrorsModel;
    this.response       = function (response) {
      return parseResponseForErrors.call(self, response);
    };
  }

  AbstractErrorsInterceptor.prototype.setErrorsModel            = setErrorsModel;
  AbstractErrorsInterceptor.prototype.getErrorsModel            = getErrorsModel;
  AbstractErrorsInterceptor.prototype.stopIntercepting          = stopIntercepting;
  AbstractErrorsInterceptor.prototype.resumeIntercepting        = resumeIntercepting;
  AbstractErrorsInterceptor.prototype.hasStoppedIntercepting    = hasStoppedIntercepting;
  AbstractErrorsInterceptor.prototype.searchAndStoreErrorObject = searchAndStoreErrorObject;

  return AbstractErrorsInterceptor;

  /* jshint validthis: true */
  function parseResponseForErrors(response) {

    if (shouldIntercept.call(this, response)) {
      searchAndStoreErrorObject.call(this, response);
    }

    return response;
  }

  function searchAndStoreErrorObject(response) {

    var searchResult = dataParser.searchDataForErrors(response.data);

    if (searchResult.errors) {
      this.errorsModel.storeErrors(searchResult.errors);
    } else {
      this.errorsModel.clearErrors();
    }
  }

  function shouldIntercept(response) {

    var pattern = /<[a-z][\s\S]*>/i;
    return this.isIntercepting && !(pattern.test(response.data));
  }

  /* jshint validthis: true */
  function stopIntercepting() {
    this.isIntercepting = false;
  }

  /* jshint validthis: true */
  function resumeIntercepting() {
    this.isIntercepting = true;
  }

  /* jshint validthis: true */
  function setErrorsModel(model) {

    if (model.clearErrors && model.storeErrors) {
      this.errorsModel = model;
    } else {
      throw new Error('model should have clearErrors and storeErrors functions');
    }
  }

  /* jshint validthis: true */
  function hasStoppedIntercepting() {
    return !this.isIntercepting;
  }

  /* jshint validthis: true */
  function getErrorsModel() {
    return this.errorsModel;
  }
});
