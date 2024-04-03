define(['validationErrorsModelService'], function () {

  'use strict';

  describe('validationErrorsModel', function () {

    var service;
    var injector;

    var FORM_NAME      = 'sampleForm';
    var ERROR_NAME     = 'required';
    var CONTROL_NAME   = 'firstName';
    var SAMPLE_MESSAGE = 'Error message';

    it('should be an injectable instance of the validationErrorsModel', function () {
      expect(service).to.be.an('object');
    });

    describe('public api', function () {

      it('should create an error notification object', function () {

        service.registerError(FORM_NAME, CONTROL_NAME, ERROR_NAME);

        var validationMessagesModel = injector.get('validationMessagesModel');
        var error                   = service.getErrorByFormAndControlName(FORM_NAME, CONTROL_NAME, ERROR_NAME);

        validationMessagesModel.getMessageByFormAndControlName.should.have.been.calledWith(FORM_NAME, CONTROL_NAME, ERROR_NAME);

        expect(error).to.have.property('type').and.to.equal(ERROR_NAME);
        expect(error).to.have.property('message').and.to.equal(SAMPLE_MESSAGE);
      });

      it('should remove the error notification object', function () {

        service.registerError(FORM_NAME, CONTROL_NAME, ERROR_NAME);

        service.removeError(FORM_NAME, CONTROL_NAME);

        var error = service.getErrorByFormAndControlName(FORM_NAME, CONTROL_NAME);

        expect(error).not.to.be.defined;
      });

      it('should remove all errors', function () {

        service.registerError(FORM_NAME, CONTROL_NAME, ERROR_NAME);

        service.clearErrors();

        var error = service.getErrorCollection();

        expect(error.length).to.equal(0);
      });
    });

    beforeEach(function () {

      createMockModulesAndInjector();
      createService();
    });

    function createMockModulesAndInjector() {

      module('common', function ($provide) {
        stubDependencies($provide);
      });

      inject(function ($injector) {
        injector = $injector;
      });
    }

    function stubDependencies(provide) {

      var validationMessagesModel = sinon.stub({
        getMessageByFormAndControlName: function () {
        }
      });

      validationMessagesModel.getMessageByFormAndControlName.returns(SAMPLE_MESSAGE);

      provide.value('validationMessagesModel', validationMessagesModel);
    }

    function createService() {
      service = injector.get('validationErrorsModel');
    }
  });
})
;