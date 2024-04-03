define(['validationErrorSequenceModelService'], function () {

  'use strict';

  describe('validationErrorsSequenceModel', function () {

    var errors;
    var service;
    var injector;

    it('should be an injectable instance of the validationErrorsSequenceModel', function () {
      expect(service).to.have.property('getError');
    });

    it('should expose the last error from the validationErrorModel', function () {
      expect(service.getError()).eql(errors[1]);
    });

    it('should expose the error for a specified control', function () {

      service.prioritiseErrorsByFormAndControl('form1', 'control1');
      expect(service.getError()).eql(errors[0]);
    });

    it('should expose the last error from the validationErrorModel if there are no errors for a specified control', function () {

      service.prioritiseErrorsByFormAndControl(undefined, undefined);
      expect(service.getError()).eql(errors[1]);
    });

    beforeEach(function () {

      createMockModulesAndInjector();
      createErrors();
      createService();
    });

    function createMockModulesAndInjector() {

      module('errorHandling', function ($provide) {
        stubDependencies($provide);
      });

      inject(function ($injector) {
        injector = $injector;
      });
    }

    function createErrors() {

      errors = [
        {
          formName   : 'form1',
          type       : 'require',
          controlName: 'control1'
        },
        {
          type       : 'require',
          formName   : 'form2',
          controlName: 'control2'
        }
      ];
    }

    function stubDependencies(provide) {

      var validationErrorsModel = sinon.stub({
        getErrorCollection: angular.noop
      });

      validationErrorsModel.getErrorCollection.returns(errors);

      provide.value('validationErrorsModel', validationErrorsModel);
    }

    function createService() {
      service = injector.get('validationErrorSequenceModel');
    }
  });
});