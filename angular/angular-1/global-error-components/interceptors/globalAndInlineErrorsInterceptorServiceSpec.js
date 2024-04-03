define(['globalAndInlineErrorsInterceptorService'], function () {

  'use strict';

  describe('globalAndInlineErrorsInterceptor', function () {

    it('should extend the abstractErrorsInterceptor for its core functionality', inject(function (abstractErrorsInterceptor, globalAndInlineErrorsInterceptor) {

      expect(globalAndInlineErrorsInterceptor.constructor.name).to.equal('AbstractErrorsInterceptor');
      expect(globalAndInlineErrorsInterceptor).to.have.property('response');
    }));

    beforeEach(function () {
      module('errorHandling');
    });
  });
});