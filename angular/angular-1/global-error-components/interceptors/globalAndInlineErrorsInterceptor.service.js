/**
 *  @name globalAndInlineErrorsInterceptor
 *  @file: globalAndInlineErrorsInterceptorService.js
 *  @description: Intercepts all http requests for the existence of global and inline errors
 *  @dependencies: errorHandlingModule, abstractErrorsInterceptor
 */
define([
  'errorHandlingModule',
  'support/abstractErrorsInterceptor'
], function (errorHandlingModuleDefinition, abstractErrorsInterceptor) {
  'use strict';

  errorHandlingModuleDefinitionService('globalAndInlineErrorsInterceptor', abstractErrorsInterceptor);
});
