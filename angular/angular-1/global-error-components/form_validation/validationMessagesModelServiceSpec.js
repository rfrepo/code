define(['validationMessagesModelService'], function () {

  'use strict';

  describe('validationMessagesModel', function () {

    var service;
    var injector;

    it('should be an injectable instance of the validationErrorsModel', function () {

      expect(service).to.be.an('object');
      expect(service).to.have.property('getMessageByFormAndControlName');
    });

    it('should retrieve the validation error messages from the template cache', function () {

      service.getMessageByFormAndControlName();
      injector.get('$templateCache').get.should.have.been.calledWith('/validation-error-messages.html');
    });

    it('should return the corresponding validation message for a given input control', function () {

      var message = service.getMessageByFormAndControlName('form', 'firstName', 'required');
      expect(message).to.equal('First name is required');
    });

    it('should return the validation rule\'s default message if the given key yields an undefined value', function () {

      var message = service.getMessageByFormAndControlName('form', 'nonKey', 'required');
      expect(message).to.equal('Default message require!');
    });

    it('should initialise only when the getMessageByFormAndControlName method is called', function () {

      injector.get('$templateCache').get.should.not.have.been.called;

      service.getMessageByFormAndControlName();
      service.getMessageByFormAndControlName();
      service.getMessageByFormAndControlName();

      injector.get('$templateCache').get.should.have.been.calledOnce;
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

      var templateCache = sinon.stub({
        get: angular.noop
      });

      templateCache.get.returns(createSampleMarkUp());

      provide.value('$templateCache', templateCache);
    }

    function createSampleMarkUp() {

      return '<div> \
                        <div validation-rule-id="required"> \
                            <span message-key="defaultMessage">Default message require!</span> \
                            <span message-key="form.firstName">First name is required</span> \
                        </div>\
                        \
                        <div validation-rule="maxlength">\
                            <span message-key="defaultMessage">Default message require message</span>\
                            <span message-key="form.lastName">Last name is does not meet the required length</span>\
                        </div>\
                    </div>';
    }

    function createService() {
      service = injector.get('validationMessagesModel');
    }
  });
})
;